import express from 'express'
import {
    UserRegister,
    userLogin,
    userLogout,
    isAuthenticated,
    getUserData
} from '../controller/authController.js'
import userAuthCheck from '../middleware/userAuth.js'

const rout = express.Router()

rout.post('/register', UserRegister)
rout.post('/login', userLogin)
rout.post('/logout', userLogout)
rout.get('/profile',userAuthCheck,getUserData)

export default rout

// 