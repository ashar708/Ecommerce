import React, { useContext, useState } from 'react'
import bag from '../asset/bag.png';
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common';
import {toast} from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import role from '../common/role';
import context from '../context';

//<FaUser />
//<FaShoppingCart />

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay,setMenuDisplay] = useState(false);
  const cont = useContext(context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  console.log("searchInput",searchInput?.search.split("=")[1]);
  const [search,setSearch] = useState(searchQuery);



  const handleLogout = async () => {
    
    const fetchData = await fetch(summaryApi.logged_out_user.url, {
      method: summaryApi.logged_out_user.method,
      credentials: "include"
    });

    const data = await fetchData.json();

    if(data.success){
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if(data.error){
      toast.error(data.message);
    }
  }

  console.log("context-api", cont);

  const handleSearch = (e) => {
    const {value} = e.target;
    setSearch(value);
    if(value){
      navigate(`/search/?q=${value}`);
    }else{
      navigate("/search")
    }
  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
         <Link to={'/'}><img src={bag} className='w-[110px] h-[60px]'/></Link>
        </div>
        <div className='hidden lg:flex w-[400px] focus-within:shadow rounded-full'>
          <input type='text' placeholder='Search product here...' className='w-full outline-none pl-2 border rounded-l-full' onChange={handleSearch} value={search}/>
          <div className='bg-red-500 rounded-r-full px-3 py-2 cursor-pointer'>
            <CiSearch size={20}/>
          </div>
        </div>

        <div className='flex items-center gap-7'>
         <div className='text-2xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(prev=>!prev)}>
          {
            user?._id && (
                user?.ProfilePic ? (
                  <img src={user?.ProfilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                ) : (
                  <FaUser />
                )
            )
          }
          

          {
            menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded text-sm'>
                <nav>
                  {
                    user?.role === role.ADMIN && (
                      <Link to={"/admin-panel/products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(prev=>!prev)}>Admin Panel</Link>
                    )
                  }
                  <Link to={"/order"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(prev=>!prev)}>Order</Link>
                  
                </nav>
             </div>
            )
          }

         </div>

         {
          user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
         <span><FaShoppingCart /></span>
         
            <div className='bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-2'>
            <p className='text-sm'>{cont.cartProductCount}</p>
            </div>
          
         
         </Link>
          )
         }
         
         <div>
         {
          user?._id ? (
            <button onClick={handleLogout} className='px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-700 '>Logout</button>
          ) : (
            <Link to={'/login'}><button className='px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-700 '>Login</button></Link>
          )
         }
         </div>
        </div>
      </div>
    </header>
  )
}

export default Header
