import { Router } from 'express';
import { login, signup, verfiyOtp } from './auth.service.js';
import { successResponse } from './../../common/utils/index.js';
const router = Router();

router.post("/signup", async (req, res, next) => {
    const result = await signup(req.body);
    return successResponse({ res, message: 'Sign up successfully', status: 201, data: result });
});

router.post("/signup/verfiy-otp", async (req, res, next) => {
    const result = await verfiyOtp(req.body);
    return successResponse({ res, message: 'Sign up successfully', status: 201, data: result });
});


router.post("/login", async (req, res, next) => {
    const result = await login(req.body);
    return successResponse({ res, message: 'Log in successfully', data: result });
});



export default router