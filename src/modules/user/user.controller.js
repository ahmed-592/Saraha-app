import { Router } from "express";
import { profile } from "./user.service.js";
import { successResponse } from "../../common/utils/index.js";
const router = Router()

router.get("/", async (req, res, next) => {
    const result = await profile(req.headers.authorization);
    return successResponse({ res, message: 'Profile', data: result });
})
export default router