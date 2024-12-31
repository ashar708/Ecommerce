import React, { useEffect, useState } from 'react'
import { useParams,useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/productCategory';
import VerticalCard from '../Components/VerticalCard';
import summaryApi from '../common';

const Category = () => {
    
    const location = useLocation();


    const urlSearch = new URLSearchParams(location.search);

    const urlCategoryListInArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};

    urlCategoryListInArray.forEach((el)=>{
      urlCategoryListObject[el] = true;
    })

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy,setSortBy] = useState("");

    const fetchData = async () => {
      const response = await fetch(summaryApi.filterProd.url,{
        method: summaryApi.filterProd.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category: filterCategoryList
        })
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    }

    const handleSelectCategory = (e) => {
      const {name,value,checked} = e.target;
      setSelectCategory((prev)=>{
        return {
          ...prev,
          [value] : checked
        }
      })
    }

    useEffect(()=>{
      fetchData();
    },[filterCategoryList])

    useEffect(()=>{
      const arrayCategory = Object.keys(selectCategory).map(categoryKeyName=>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName;
        }
        return null;
      }).filter(el=>el)

      setFilterCategoryList(arrayCategory);

      const urlFormat = arrayCategory.map((el,idx)=>{
        if(arrayCategory.length-1 === idx){
          return `category=${el}`;
        }
        return `category=${el}&&`;
      })
      navigate("/product-category?" + urlFormat.join(""));
    },[selectCategory])

    const handleOnChangeSortBy = (e) => {
      const {value} = e.target;
      setSortBy(value);
      if(value==="asc"){
        setData(preve=> preve.sort((a,b)=>a.sellingPrice-b.sellingPrice));
      }
      if(value==="desc"){
        setData(preve=> preve.sort((a,b)=>b.sellingPrice-a.sellingPrice));
      }
    }

    useEffect(()=>{
      
    },[sortBy]);


  return (
    <div className='container mx-auto p-4'>
      {/* desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* sort by */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>Sort by</h3>
            <form className='text-sm flex-col gap-2 py-2'>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' value={"asc"} checked={sortBy==="asc"} onChange={handleOnChangeSortBy}/>
                <label>Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' value={"desc"} checked={sortBy==="desc"} onChange={handleOnChangeSortBy}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          
          {/* filter by */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>Category</h3>
            <form className='text-sm flex-col gap-2 py-2'>
              {
                productCategory.map((item,idx)=>{
                  return (
                    <div className='flex items-center gap-3'>
                      <input type='checkbox' name={"category"} checked={selectCategory[item?.value]} value={item?.value} id={item?.value} onChange={handleSelectCategory}/>
                      <label htmlFor={item?.value}>{item?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>

        </div>
        {/* right side */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg m-2'>Search Results: {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
          {
            data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading}/>
            )
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
