import { json, text } from 'express'
import User from '../models/userAuth.js'
import UserModel from '../models/userAuth.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/// Register logic  Controll 
const UserRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Something Missing Details '
            })
        }
        const Exists = await UserModel.findOne({ email })
        if (Exists) {
            return res.status(400).json({
                success: false,
                message: 'User Already Register'
            })
        }

        const hashpassword = await bcrypt.hash(password, 10)
        const user = await UserModel.create({
            name,
            email,
            password: hashpassword
        })
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            // token,
            message: 'Register Successfull',
            // user,

        })

    } catch (error) {
        console.log('error', error.message)
        return res.status(500).json({
            success: false,
            message: 'Register Faild'
        })
    }


}

/// Login Login controll

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Something Missing Details '
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            })
        }
        const isMatchUser = await bcrypt.compare(password, user.password)
        if (!isMatchUser) {
            return res.status(400).json({
                success: false,
                message: 'User password wrong'
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        )
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000

        })
        return res.status(200).json({
            success: true,
            message: 'Login Successfull',
        })



    } catch (error) {
        console.log('login', error)
        return res.status(500).json({
            error,
            success: false,
            message: 'Login Faild'
        })
    }
}

/// Logout Login controll

const userLogout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            success: true,
            message: 'Logout successfull'
        })

    } catch (error) {
        return res.status(500).json({
            error,
            success: false,
            message: 'Login Faild'
        })
    }
}

// Profile check isAuthenticated or Not 

const isAuthenticated = async (req, res) => {
    try {
        res.status(201).json({
            success: true,
            message: 'Welcome Arman Kaise ho '
        })

    } catch (error) {
        return res.status(500).json({
            error,
            success: false,
            message: `Not Authenticated ${error.message}`
        })
    }
}

// getData user 
const getUserData = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User Not Found'
            })
        }
        return res.status(200).json({
            name: user.name,
            success: true,
            message: 'User find successfull'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User Faild'
        })
    }
}

export {
    UserRegister,
    userLogin,
    userLogout,
    isAuthenticated,
    getUserData
}

