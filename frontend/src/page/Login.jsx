import React, { useState } from 'react'
import Button from '../component/Bottom'
import { NavLink, useNavigate } from 'react-router-dom'
import { useMyContext } from '../config/Context'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Login() {
    const [loginForm, setLoginform] = useState({
        email: '',
        password: ''
    })
    const handleForm = (e) => {
        const { name, value } = e.target
        setLoginform({ ...loginForm, [name]: value })
    }

    /// Login Request ******

    const navigate = useNavigate()
    const { api,setIsUser,setIsAuth} = useMyContext()
    const [loading,setloading]=useState(false)
    

    const handleLogin = async () => {

        try {
            //Login Request
            const { email, password } = loginForm;
            if (!email || !password) {
                return toast("Please fill all fields");
            }
            setloading(true)
            const res = await api.post('/api/login',loginForm)
            toast(res.data.message)
            
            /// Profile Request
            const profileRes = await api.get('/api/profile')
            if(profileRes.data.success){
                setIsUser(profileRes.data)
                setIsAuth(true)
                navigate('/')
            }
            setLoginform({
                email: '',
                password: ''
            })
        } catch (error) {
            toast(error.response?.data?.message)
            setIsUser(null)
            setIsAuth(false)
            setLoginform({
                email: '',
                password: ''
            })
        }finally{
            setloading(false)
        }
    }
    if(loading){
        return(
            <Loading/>
        )
    }
    return (
        <div className='w-full bg-gradient-to-r from-blue-500 to-purple-600 h-screen flex justify-center items-center  '>
            <div className=' bg-white rounded-2xl  w-sm h-[26rem] flex justify-center items-center flex-col'>
                <h1 className='text-3xl font-bold'>Login</h1>
                <div className=' flex flex-col   ' >
                    <label htmlFor="email" className='flex flex-col text-xl' > Email
                        <input type="email"
                            id='email'
                            placeholder='Email'
                            value={loginForm.email}
                            name='email'
                            onChange={handleForm}
                            className=' border w-[18rem] h-[2rem] my-2 outline-none py-4 px-3 text-lg rounded-[99px] ' />
                    </label>
                    <label htmlFor="pass" className='flex flex-col text-xl ' > Password
                        <input type="password"
                            id='pass'
                            placeholder='Password'
                            value={loginForm.password}
                            name='password'
                            onChange={handleForm}
                            className='border w-[18rem] h-[2rem] my-2 outline-none py-4 px-3 text-lg rounded-[99px]  ' />
                    </label>
                    <div className=' flex justify-between'>
                        <NavLink to={'/forget'} className='m-2 text-blue-800 ' >Forget Password</NavLink>
                        <NavLink to={'/register'} className='m-2 text-blue-800 ' >Register</NavLink>
                    </div>
                    <div className='m-5 flex flex-col  '   >
                        <Button name="Login " onClick={handleLogin} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login