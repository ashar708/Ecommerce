import React, { useContext, useState } from 'react'
import loginIcon from '../asset/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import {toast} from 'react-toastify';
import context from '../context';

//<FaEye />

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    const {fetchUserDetails,fetchProductCount} = useContext(context);
    const [data,setData] = useState({
        email : "",
        password : ""
    })

    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const {name,value} = e.target;
        setData((prev)=>{
            return {
                ...prev,
                [name]: value
            }
        })
    }

    console.log(data);

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(summaryApi.signIn.url, {
            method: summaryApi.signIn.method,
            credentials: "include",
            headers: {
                "content-type" : 'application/json'
            },
            body: JSON.stringify(data)
        })

        const dataApi = await response.json();

        if(dataApi.success){
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails();
            fetchProductCount();
        }
        if(dataApi.error){
            toast.error(dataApi.message);
        }
    }

  return (
    <section id='login'>
        <div className='mx-auto container p-12'>
            <div className='bg-white p-6 w-full max-w-md mx-auto rounded'>
                <div className='w-[50px] h-[50px] mx-auto'>
                    <img src={loginIcon} alt='loginicon' className='w-[50px] h-[50px]'/>
                </div>
                <form className='pt-6 flex flex-col gap-8' onSubmit={onHandleSubmit}>
                    <div className='grid'>
                        <label>Enter your Email</label>
                        <div className='bg-slate-100 p-2'>
                        <input type='email' placeholder='Email' value={data.email} name='email' className='w-full h-full outline-none bg-transparent' onChange={onChangeHandler}/>
                        </div>
                    </div>
                    <div className=''>
                        <label>Enter your Password</label>
                        <div className='bg-slate-100 p-2 flex'>
                        <input type={showPassword? "text" : "password" } placeholder='Password' value={data.password} name='password' className='w-full h-full outline-none bg-transparent' onChange={onChangeHandler}/>
                        <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                            <span>
                                {
                                    showPassword? (
                                        <FaEyeSlash />
                                    )
                                    :
                                    (
                                        <FaEye/>
                                    )
                                }
                            </span>
                        </div>
                        </div>
                        <Link to={'/forgotpassword'} className='block ml-auto w-fit hover:underline hover:text-red-600'>Forgot Password ?</Link>
                    </div>
                    <button className='bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                </form>
                <p className='my-5'>Don't have an account? <Link className='text-red-600 hover:text-red-700 hover:underline' to={'/signup'}>Sign Up</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login
