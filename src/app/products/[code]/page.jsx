'use client'

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Products/Navbar';
import { apiURL } from '@/lib/api';
import dynamic from 'next/dynamic';
const  ProductDetail = dynamic(()=> import  ('@/components/ProductDetail/ProductDetail'))


const ProductDetailsPage = () => {
  const [code, setCode] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract code from URL
    const url = window.location.href;
    const codeIndex = url.lastIndexOf('/products/') + '/products/'.length;
    const extractedCode = url.substring(codeIndex);
    setCode(extractedCode);

    const fetchProductData = async () => {
      try {
        if (!extractedCode) return; // Return early if code is not available

        const response = await fetch(apiURL+`/api/product/${extractedCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  return (
    <div className=' mt-20 md:mt-24'>
      <ProductDetail productData={productData}/>
    </div>
  );
};

export default ProductDetailsPage;
