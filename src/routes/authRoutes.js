import { celebrate } from 'celebrate';
import { Router } from 'express';
import { loginUserSchema, registerUserSchema } from '../validations/authValidation.js';
import { loginUser, logoutUser, refreshSession, registerUser } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/register', celebrate(registerUserSchema), registerUser);
authRouter.post('/login', celebrate(loginUserSchema), loginUser);
authRouter.post('/logout', logoutUser)
authRouter.post('/refresh', refreshSession)

export default authRouter;
