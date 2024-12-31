import React from 'react'
import loginIcon from '../asset/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { image2Base64 } from '../helpers/imageToBase64';
import summaryApi from '../common';
import {toast} from 'react-toastify';

const Signup = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword]  = useState(false);
    const [data,setData] = useState({
        name: "",
        email : "",
        password : "",
        confirmPassword: "",
        ProfilePic : ""
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

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        const imagePic = await image2Base64(file);


        setData((prev)=>{
            return{
                ...prev,
                ProfilePic: imagePic
            }

        })
    }

    console.log(data);

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        if(data.password===data.confirmPassword){
            const dataResponse = await fetch(summaryApi.signUp.url,{
                method: summaryApi.signUp.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
    
            const response = await dataResponse.json();

            if(response.success){
                toast.success(response.message);
                navigate('/login');
            }
            if(response.error){
                toast.error(response.message);
            }

        }
        else{
            toast.error("Please check password and confirm password");
        }

    }

  return (
    <section id='signup'>
        <div className='mx-auto container p-12'>
            <div className='bg-white p-6 w-full max-w-md mx-auto rounded'>
                <div className='w-[96px] h-[93px] mx-auto pb-2 relative overflow-hidden rounded-full rounded-b-full'>
                    <div>
                    <img src={data.ProfilePic || loginIcon} alt='loginicon' className='w-[96px] h-[93px] mx-auto'/>
                    </div>
                    <form>
                        <label>
                            <div className='text-sm bg-slate-200 text-center py-5 absolute cursor-pointer top-9 w-full rounded-b-full bg-opacity-45'>
                            Upload Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic}/>
                        </label>
                    </form>
                </div>
                <form className='pt-6 flex flex-col gap-8' onSubmit={onHandleSubmit}>
                <div className='grid'>
                        <label>Enter your Username</label>
                        <div className='bg-slate-100 p-2'>
                        <input type='text' placeholder='Enter your Name' value={data.name} name='name' className='w-full h-full outline-none bg-transparent' onChange={onChangeHandler} required/>
                        </div>
                    </div>
                    <div className='grid'>
                        <label>Enter your Email</label>
                        <div className='bg-slate-100 p-2'>
                        <input type='email' placeholder='Email' value={data.email} name='email' className='w-full h-full outline-none bg-transparent' onChange={onChangeHandler} required/>
                        </div>
                    </div>
                    <div className=''>
                        <label>Enter your Password</label>
                        <div className='bg-slate-100 p-2 flex'>
                        <input type={showPassword? "text" : "password" } placeholder='Password' value={data.password} name='password' className='w-full h-full outline-none bg-transparent' onChange={onChangeHandler} required/>
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
                        
                    </div>

                    <div className=''>
                        <label>Confirm Password: </label>
                        <div className='bg-slate-100 p-2 flex'>
                        <input type={showPassword? "text" : "password" } placeholder='Enter the Confirm Password' value={data.confirmPassword} name='confirmPassword' className='w-full h-full outline-none bg-transparent' onChange={onChangeHandler} required/>
                        <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                            <span>
                                {
                                    showConfirmPassword? (
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
                        
                    </div>
                    <button className='bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>SignUp</button>
                </form>
                <p className='my-5'>Already have an Account? <Link className='text-red-600 hover:text-red-700 hover:underline' to={'/login'}>Login</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Signup
