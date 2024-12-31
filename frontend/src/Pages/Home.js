import React from 'react'
import Header from '../Components/Header'
import ProductCategory from '../Components/ProductCategory';
import BannerProduct from '../Components/BannerProduct';
import HorizontalCartProduct from '../Components/HorizontalCartProduct';
import VerticalCartProduct from '../Components/VerticalCartProduct';

const Home = () => {
  return (
    <div>
      <ProductCategory/>
      <BannerProduct/>
      <HorizontalCartProduct category={"airpods"} heading={"Top Airpod's"}/>
      <VerticalCartProduct category={"camera"} heading={"Top Camera's"}/>
      <HorizontalCartProduct category={"earphones"} heading={"Top Earphone's"}/>
      <VerticalCartProduct category={"mobiles"} heading={"Top Mobile's"}/>
      <VerticalCartProduct category={"mouse"} heading={"Top Mouse's"}/>
    </div>
  )
}

export default Home
