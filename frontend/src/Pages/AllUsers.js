import React, { useEffect, useState } from 'react'
import summaryApi from '../common';
import {toast} from 'react-toastify';
import moment from 'moment';
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../Components/ChangeUserRole';

const AllUsers = () => {
  const [allUsers,setAllUsers] = useState([]);

  const [openUpdateRole,setOpenUpdateRole] = useState(false);

  const [updateUserDetails,setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  });

  const fetchAllUsers = async () => {
    const dataResponse = await fetch(summaryApi.allUsers.url,{
      method: summaryApi.allUsers.method,
      credentials: 'include'
    })
    const data = await dataResponse.json();
    if(data){
      setAllUsers(data.data);
    }
    if(data.error){
      toast.error(data.message)
    }
    //console.log(data);
  }

  useEffect(()=>{
    fetchAllUsers();
  },[])
  return (
    <div className='bg-white pb-4'>
      <table className='w-full user_table'>
        <thead>
          <tr className='bg-black text-white'>
          <th>Sno.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created Date</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((user,idx)=>{
              return (
                <tr>
                  <td className='text-center'>
                    {idx+1}
                  </td>
                  <td className='text-center'>{user?.name}</td>
                  <td className='text-center'>{user?.email}</td>
                  <td className='text-center'>{user?.role}</td>
                  <td className='text-center'>{moment(user?.createdAt).format('ll')}</td>
                  <td className='text-center'>
                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                    onClick={()=>{
                      setUpdateUserDetails(user)
                      setOpenUpdateRole(true)
                      }}>
                      {<MdEdit/>}
                      </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openUpdateRole && (
          <ChangeUserRole onClose={()=>setOpenUpdateRole(false)} name={updateUserDetails.name} email={updateUserDetails.email} role={updateUserDetails.role} userId={updateUserDetails._id} callFunc={fetchAllUsers}/>
        )
      }
      
    </div>
  )
}

export default AllUsers
