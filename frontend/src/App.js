import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common';
import context from './context';
import {useDispatch} from 'react-redux';
import { setUserDetails } from './store/userSlice';


const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(summaryApi.current_user.url,{
      method: summaryApi.current_user.method,
      credentials: "include"
    });

    const dataApi = await dataResponse.json();

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data));
    }

    console.log('data-user',dataResponse);

  }

  const fetchProductCount = async () => {
    const dataResponse = await fetch(summaryApi.countProducts.url,{
      method: summaryApi.countProducts.method,
      credentials: "include"
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi.data);

    console.log("dataApi",dataApi);
  }

  useEffect(()=>{
    // user details
    fetchUserDetails();
    //product count
    fetchProductCount();
  },[])
  return (
    <>
    <context.Provider value={{
      fetchUserDetails, //user detail fetch
      cartProductCount, //current users cart count
      fetchProductCount
    }}>
     <ToastContainer position='top-center'/>
      <Header/>
      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet />
      </main>
      <Footer />
      </context.Provider>
    </>
  )
}

export default App
