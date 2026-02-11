import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../../config/config.service.js'
import { ConflictException, decrypt } from '../../common/utils/index.js';
import { userModel, findById } from '../../DB/index.js';

export const profile = async (authorization) => {
    try {
        const verfiyData = jwt.verify(authorization, JWT_KEY);
        const user = await findById({ model: userModel, fillter: verfiyData.sub , select:'-password' });
        user.phone = await decrypt(user.phone);
        return user;

    } catch (error) {

        return ConflictException({ message: 'Invaild token' });

    }
}