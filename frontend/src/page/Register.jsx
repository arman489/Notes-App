import React, { useState } from 'react'
import Button from '../component/Bottom'
import { NavLink, useNavigate } from 'react-router-dom'
import { useMyContext } from '../config/Context'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'


function Register() {
    const [loading,setLoading]=useState(false)
    const [registerForm, setRegister] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleRegister = (e) => {
        const { name, value } = e.target
        setRegister({ ...registerForm, [name]: value })
    }

    //// Api 

    const navigate = useNavigate()
    const { api, isUser, setIsUser, setIsAuth } = useMyContext()
    const SendRegister = async () => {
        try {
            /// Register Requestx`
            const { name, email, password } = registerForm;
            if (!name || !email || !password) {
                return toast("Please fill all fields");
            }
            setLoading(true)
            const res = await api.post('/api/register', registerForm)
            toast(res.data.message)
            navigate('/')

            /// Profile Request
            const profileRes = await api.get('/api/profile')
            if(profileRes.data.success){
                setIsUser(profileRes.data)
                setIsAuth(true)
                navigate('/')
            }

            setRegister({
                name: '',
                email: '',
                password: ''
            })
        } catch (error) {
            toast(error.response?.data?.message);
            setIsAuth(false)
            setIsUser(null)
            setRegister({
                name: '',
                email: '',
                password: ''
            })

        }finally{
            setLoading(false)
        }
    }

    if(loading){
        return(
            <Loading/>
        )
    }
    return (
        <div className='w-full bg-gradient-to-r from-blue-500 to-purple-600 h-screen flex justify-center items-center  '>
            <div className=' bg-white rounded-2xl  w-sm h-[30rem] flex justify-center items-center flex-col  '>
                <h1 className='text-3xl font-bold m-5'>Register</h1>
                <div className=' flex flex-col   ' >
                    <label htmlFor="name" className='flex flex-col text-xl' > name
                        <input type="text"
                            value={registerForm.name}
                            name='name'
                            id='email' placeholder='name'
                            onChange={handleRegister}
                            required
                            className=' border w-[18rem] h-[2rem] my-2 outline-none py-4 px-3 text-lg rounded-[99px] ' />
                    </label>
                    <label htmlFor="email" className='flex flex-col text-xl' > Email
                        <input type="email"
                            value={registerForm.email}
                            name='email'
                            id='email' placeholder='Email'
                            onChange={handleRegister}
                            required
                            className=' border w-[18rem] h-[2rem] my-2 outline-none py-4 px-3 text-lg rounded-[99px] ' />
                    </label>
                    <label htmlFor="pass" className='flex flex-col text-xl ' > Password
                        <input type="password"
                            value={registerForm.password}
                            name='password'
                            id='pass' placeholder='Password'
                            onChange={handleRegister}
                            required
                            className='border w-[18rem] h-[2rem] my-2 outline-none py-4 px-3 text-lg rounded-[99px]  ' />
                    </label>
                    <div className=' flex justify-between'>
                        <NavLink to={'/login'} className='m-2 text-blue-800 ' >Login</NavLink>
                    </div>
                    <div className='m-5 flex flex-col  '>
                        <Button name="Register" onClick={SendRegister} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register