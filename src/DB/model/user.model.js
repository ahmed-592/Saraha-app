import mongoose from "mongoose";
import { GenderEnum, ProviderEnum } from "../../common/enums/index.js";

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 25,
        },
        lastName: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 25,



        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: String,
        gender: {
            type: Number,
            enum: Object.values(GenderEnum),
            default: GenderEnum.Male
        },
        provider: {
            type: Number,
            enum: Object.values(ProviderEnum),
            default: ProviderEnum.System
        },
        otp: String,
        otpExpires: Date,
        isVerfied: {
            type: Boolean,
            default: false
        },
        profilePicture: String,
        coverProfilePictures: [String],
        confirmEmail: Date,
        changeCredentials: Date,

    },
    {
        collection: "Users",
        timestamps: true,
        strict: true,
        strictQuery: true,
        optimisticConcurrency: true,
        autoIndex: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },


    }

)

// userSchema.virtual("username").set(function (value) {
//     const [firstName, lastName] = value.split(' ');
//     this.set({ firstName, lastName });

// }).get(function () {
//     return this.firstName + " " + this.lastName;
// })

export const userModel = mongoose.models.User || mongoose.model("User", userSchema);