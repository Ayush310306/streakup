import express from 'express';
import { register } from '../controllers/authcontroller.js';
import { login } from '../controllers/authcontroller.js';
import { logout } from '../controllers/authcontroller.js';
import { sendVerifyOtp } from '../controllers/authcontroller.js';
import { verifyEmail } from '../controllers/authcontroller.js';
import { isAuthenticated } from '../controllers/authcontroller.js';
import { sendResestOtp } from '../controllers/authcontroller.js';
import { resetPassword } from '../controllers/authcontroller.js';
import { verifyResetOtp } from '../controllers/authcontroller.js';

import userAuth from '../middleware/userAuth.js';


const authRouter = express.Router();

authRouter.post('/register', register); //route for registering a user
authRouter.post('/login', login); //route for logging in a user
authRouter.get('/logout', logout);
authRouter.post('/sent-verify-otp', userAuth, sendVerifyOtp); //route for sending verify otp
authRouter.post('/verify-account', userAuth, verifyEmail);
 //route for verifying account
authRouter.get('/is-authenticated', userAuth, isAuthenticated); //route for checking if user is authenticated
authRouter.post('/send-reset-otp', sendResestOtp);//route for sending reset otp
authRouter.post('/reset-password', resetPassword);//route for reseting password
authRouter.post('/verify-reset-otp', verifyResetOtp);


export default authRouter;