
import { JWT_KEY } from "../../../config/config.service.js";
import { compareHash, ConflictException, decrypt, encrypt, generateHash, generateOTP, NotFoundException, sendEmail } from "../../common/utils/index.js";
import { createOne, findOne, userModel } from "../../DB/index.js";
import jwt from 'jsonwebtoken';

export const signup = async (inputs) => {
    const { firstName, lastName, email, password, phone } = inputs;
    const userExist = await findOne({
        model: userModel,
        fillter: { email },
        select: '-password',
        options:
            { lean: true }
    });
    if (userExist) {
        return ConflictException({ message: 'User already exists' });
    }

    const otp = generateOTP();
    const user = await createOne({
        model: userModel,
        data: {
            firstName, lastName, email, password: await generateHash({ plainText: password }), phone: await encrypt(phone), otp: await encrypt(otp), otpExpires: Date.now() + 300000, isVerfied: false
        }
    });

    await sendEmail({ to: email, subject: 'Verfiy your account', html: `<h2>Otp: ${otp}</h2>` });


    return user;
}

export const verfiyOtp = async (inputs) => {
    const { email, otp } = inputs;
    const user = await findOne({
        model: userModel,
        fillter: { email }
    });
    if (!user) {
        return NotFoundException({ message: 'User not found' });
    }
    const decryptOtp = await decrypt(user.otp);
    if (decryptOtp !== otp) {
        return ConflictException({ message: 'Invild otp' });
    }
    if (user.otpExpires < Date.now()) {
        return ConflictException({ message: 'OTP expired' });
    }
    user.isVerfied = true;
    user.otp = null;
    await user.save();

    return user;
}

export const login = async (inputs) => {
    const { email, password } = inputs;
    const user = await findOne({
        model: userModel,
        fillter: { email },
        options:
            { lean: true }
    });
    if (!user) {
        return NotFoundException({ message: 'Invaild login credentials' });

    };
    if (!await compareHash({ plainText: password, cipherText: user.password })) {
        return NotFoundException({ message: 'Invaild login credentials' });

    };
    if (!user.isVerfied) {
        return NotFoundException({ message: 'Invaild login credentials' });

    };
    const access_token = jwt.sign({ sub: user._id }, JWT_KEY);
    return access_token;
}
