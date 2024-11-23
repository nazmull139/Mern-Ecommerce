import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, updateTaxRate } from '../../redux/features/cart/cartSlice';
import { useUseCouponMutation } from "../../redux/features/coupon/couponApi";
import { getBaseUrl } from "../../utils/baseURL";



const OrderSummary = () => {
    const dispatch = useDispatch();

    const products = useSelector((store)=>store.cart.products);
    const {selectedItems , totalPrice, discoun , discountRate , grandTotal} = useSelector((state)=> state.cart)
    const{user} = useSelector((state)=> state.auth);

    const handleClearCart = () =>{

        dispatch(clearCart())
    }


      {/*   chatgpt theke neya grandtotal change korar jonne
        
    const makePayment = async (e) => {
        // e.preventDefault(); // Ensure you prevent form submission if this is a form handler
        const cart = useSelector(state => state.cart);  
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
        const body = {
            products: products,
            userId: user?._id,
            grandTotal: cart.grandTotal // Send the discounted total (grandTotal) here
        };
    
        try {
            // Send the data to the backend to create the checkout session
            const response = await axios.post(`${getBaseUrl()}/api/orders/create-checkout-session`, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log(response.data); // Check response to confirm successful session creation
    
            // Redirect to Stripe checkout
            const result = stripe.redirectToCheckout({
                sessionId: response.data.id,
            });
    
            if (result.error) {
                console.error("Error redirecting to checkout", result.error);
            }
    
        } catch (error) {
            console.error("Error creating checkout", error);
        }
    };
    
*/}
//console.log(products)
  
    const makePayment = async (e)=>{
        //e.preventDefault();
       // const result = await useCoupon({ code }).unwrap();
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
       // console.log(stripe)
        const body = {
            products:  products,
            productDetails:  products,
            userId: user?._id,
            grandTotal: grandTotal,
            selectedItems:selectedItems,
            couponCode: code || undefined
        }
       
        try {
           // console.log(body);
            const response = await axios.post(`${getBaseUrl()}/api/orders/create-checkout-session`,
           body,{
            headers: {
                'Content-Type' : 'application/json'
            },
           

        })
     ///  console.log(response.data)

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


    ///////////////////// USE COUPON
    

    const [useCoupon] = useUseCouponMutation();
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const[disc , setDisc] = useState(null)

;

const handleUseCoupon = async () => {
    try {
        const result = await useCoupon({ code }).unwrap();
        console.log(result)
        setMessage(`Coupon applied: ${result.code}`);
        setDisc(`You got ${result.discount}% discount`);


        const newDiscountRate = result.discount / 100; // Convert percentage to decimal
        dispatch(updateTaxRate(newDiscountRate)); // Dispatch the discount percentage
        
        
    } catch (err) {
        setMessage(err.data?.error || "Failed to apply coupon");
    }
};
{/*  
    const handleUseCoupon = async () => {
        try {
            const result = await useCoupon({ code }).unwrap();
            console.log(result)
            setMessage(`Coupon used: ${result.code}`);
            setDisc(`You got ${result.discount}% discount`);

            const newTaxRate = result.discount / 100; // Convert percentage to decimal
            dispatch(updateTaxRate(newTaxRate));
            
        
        } catch (err) {
            setMessage(err.data?.error || 'Failed to use coupon');
            setDisc(null)
        }
    };
*/}
  /////////////// use coupon FINISHED

  return (
    <div className='bg-primary-light mt-5 rounded text-base'>

        <div className='px-6 py-4 space-y-5'>

            <h2 className='text-xl text-text-dark'>Order Summary</h2>
            <p className='text-text-dark mt-2'>Selected Items : {selectedItems}</p>
            <p>Total Price : ${totalPrice}</p>
            <p>Discount ({discountRate*100})% : (${discoun.toFixed(2)})</p>

{/* use coupon */}

        <div>
            <input className="border border-red-500 rounded-md p-3 "
                placeholder="Enter coupon code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button className="bg-green-400 m-3 p-2 rounded-md hover:text-yellow-400" onClick={handleUseCoupon}>Use Coupon</button>
            {message && <p>{message}</p>}
            <p>{disc}</p>
        </div>
{/* use coupon finished*/}

            
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