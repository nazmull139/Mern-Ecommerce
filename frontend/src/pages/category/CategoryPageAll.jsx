import React from 'react';
import { Link } from 'react-router-dom';
import Accessory from './categoryWise/accessories';
import Cosmetic from './categoryWise/cosmetic';
import Dress from './categoryWise/dress';
import Jewellary from './categoryWise/jewellary';


const CategoryPageAll = () => {

    

  return (
    <div>
    
    
        <div className=' w-[70vw] m-auto'>
            <div className='flex flex-row   border-b-2 border-black/10 border-w mb-5'>
                  <span className=' p-3 font-semibold w-[50%]'>Cosmetics</span>
                  <Link  to={`/categories/cosmetics`} className=' w-[50%]  text-end p-3 font-semibold'>view all</Link>
            </div>
           
          
            <Cosmetic />
        </div>

        <div className=' w-[70vw] m-auto'>
            <div className='flex flex-row   border-b-2 border-black/10 border-w mb-5'>
                  <span className=' p-3 font-semibold w-[50%]'>Accessories</span>
                  <Link  to={`/categories/accessories`} className=' w-[50%]  text-end p-3 font-semibold'>view all</Link>
            </div>
            <Accessory/>
        </div>

        <div className=' w-[70vw] m-auto'>
            <div className='flex flex-row   border-b-2 border-black/10 border-w mb-5'>
                  <span className=' p-3 font-semibold w-[50%]'>Dress</span>
                  <Link  to={`/categories/dress`} className=' w-[50%] text-end p-3 font-semibold'>view all</Link>
            </div>
            <Dress/>
        </div> 

        <div className=' w-[70vw] m-auto'>
            <div className='flex flex-row   border-b-2 border-black/10 border-w mb-5'>
                  <span className=' p-3 font-semibold w-[50%]'>Jewellery</span>
                  <Link  to={`/categories/jewellery`} className=' w-[50%]  text-end p-3 font-semibold'>view all</Link>
            </div>
            <Jewellary/>
        </div>
       
       
    </div>
  )
}

export default CategoryPageAll