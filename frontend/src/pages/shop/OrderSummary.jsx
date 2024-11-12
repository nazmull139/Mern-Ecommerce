import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/features/cart/cartSlice';
import { getBaseUrl } from "../../utils/baseURL";



const OrderSummary = () => {
    const dispatch = useDispatch();

    const products = useSelector((store)=>store.cart.products);
    const {selectedItems , totalPrice, tax,taxRate, grandTotal,} = useSelector((state)=> state.cart)
    const{user} = useSelector((state)=> state.auth);

    const handleClearCart = () =>{

        dispatch(clearCart())
    }

    const makePayment = async (e)=>{
        //e.preventDefault();
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
       // console.log(stripe)
        const body = {
            products:  products,
            userId: user?._id

        }
       
        try {
           // console.log(body);
            const response = await axios.post(`${getBaseUrl()}/api/orders/create-checkout-session`,
           body,{
            headers: {
                'Content-Type' : 'application/json'
            },
           

        })
       console.log(response.data)

       const result = stripe.redirectToCheckout({
        sessionId: response.data.id
       })

       if(result.error){
        console.error("Error redirecting to checkout",result.error)
       }


        } catch (error) {
                console.error("error creating checkout", error)
        }
    }

  return (
    <div className='bg-primary-light mt-5 rounded text-base'>

        <div className='px-6 py-4 space-y-5'>

            <h2 className='text-xl text-text-dark'>Order Summary</h2>
            <p className='text-text-dark mt-2'>Selected Items : {selectedItems}</p>
            <p>Total Price : ${totalPrice.toFixed(2)}</p>
            <p>Tax ({taxRate*100})% : (${tax.toFixed(2)})</p>
            <h3 className='font-bold'>Grand Total : {grandTotal.toFixed(2)}</h3>

            <div className='px-4 mb-6'>

                <button 
                    onClick={(e)=>{
                        e.stopPropagation();
                        handleClearCart();
                    }}
                
                className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'>
                    <span className='mr-2'> Clear Cart</span><i className="ri-delete-bin-7-line"></i></button>

                <button onClick={(e)=>{
                        e.stopPropagation();
                        makePayment();
                            }}
                className='bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'>
                    <span className='mr-2'>Procced Checkout</span> <i className="ri-bank-card-line"></i></button>
                    
            </div>

        </div>

    </div>
  )
}

export default OrderSummary