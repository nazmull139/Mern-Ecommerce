import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import RatingStars from '../../../components/RatingStars';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import ReviewsCard from '../reviews/ReviewsCard';

const SingleProduct = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {data , isLoading , error} = useFetchProductByIdQuery(id);


    const singleProduct = data?.product || {};
    const productReviews = data?.reviews || [];

   const handleAddToCart = (product)=> {

      dispatch(addToCart(product))
   };



if (isLoading) return <Loading/>

if (error) return <p>Error loading product details</p>

  return (
   <>
   
   <section className="section__container bg-primary-light">
            <h2 className="section__header capitalize">Single PRoduct</h2>

            <div className='section__subheader space-x-2'>
                
               <span className='hover:text-primary'> <Link to="/">home</Link></span>
               <i className="ri-arrow-right-s-line"></i>
               <span className='hover:text-primary'> <Link to="/shop">shop</Link></span>
               <i className="ri-arrow-right-s-line"></i>
               <span className='hover:text-primary'>{singleProduct.name}</span>


        </div>
        </section>

        <section className='section__container mt-8'> 
            <div className='flex flex-col items-center md:flex-row gap-8 '>
                {/*PRODUCT IMAGE */}
              <div className='md:w-1/2 w-full'>
                <img className='rounded-md w-full h-auto' src={singleProduct.image}></img>
              </div>

              <div className='md:w-1/2 w-full'>
              
                <h3 className='font-semibold text-2xl mb-4'>{singleProduct?.name}</h3>
                <p className='text-xl text-primary mb-4'>${singleProduct.price } {singleProduct?.oldPrice ? <s>${singleProduct?.oldPrice}</s> : null}</p>
                <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>

                {/* ADDITIONAL PRODUCT INFO */}

                <div className='flex flex-col space-y-2'>
                  <p><strong>Category:</strong> {singleProduct.category}</p>
                  <p><strong>Color:</strong> {singleProduct.color}</p>

                  <div className='flex gap-1 items-center'>
                    <strong>Rating:</strong>
                    <RatingStars rating={singleProduct.rating}/>
                  </div>
                </div>

                  <button onClick={(e)=>{
                    e.stopPropagation();
                    handleAddToCart(singleProduct)
                  }} 

                  className='mt-6 px-6 py-3 bg-primary text-white rounded-md'>Add To Cart</button>
              </div>
            </div>
            



        </section>
   

   {/* DISPLAY REVIEWS */}

   <section className='section__container mt-8'>
    <ReviewsCard productReviews ={productReviews}/>
   </section>
   
   </>
  )
}

export default SingleProduct