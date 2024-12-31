import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import summaryApi from '../common';
import VerticalCard from '../Components/VerticalCard';

const SearchProduct = () => {
    const queryParameter = useLocation();
    console.log("query",queryParameter.search);
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchProduct = async () => {
        setLoading(true);
        const response = await fetch(summaryApi.search.url+queryParameter.search);
        const dataResponse = await response.json();
        setLoading(false);
        setData(dataResponse.data);
        console.log("dataResponse",dataResponse);
    }

    useEffect(()=>{
        fetchProduct();
    },[queryParameter])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading...</p>
        )
      }
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>
      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center p-4'>No data found....</p>
        )
      }
      {
        data.length !== 0 && !loading && (
              <VerticalCard loading={loading} data={data}/>
        )
      }
    </div>
  )
}

export default SearchProduct
