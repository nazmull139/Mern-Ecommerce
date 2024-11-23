

import React from 'react'

const UseCoupon = () => {
  return (
    <div>UseCoupon</div>
  )
}

export default UseCoupon
{/*  
import React, { useState } from "react";
import { useUseCouponMutation } from "../../../../redux/features/coupon/couponApi";

const UseCoupon = () => {
     
    const [useCoupon, { isLoading, isSuccess, error }] = useUseCouponMutation()
    const [code, setCode] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await useCoupon(code).unwrap();
            alert("Coupon used successfully!");
            setCode("");
        } catch (err) {
            console.error("Failed to use coupon:", err);
        }
    };

    return (
        <div>
            <h1>Use Coupon</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Coupon Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Use Coupon"}
                </button>
            </form>
            {isSuccess && <p>Coupon used successfully!</p>}
            {error && <p style={{ color: "red" }}>{error.data?.error || "Error occurred!"}</p>}
        </div>
    );
};

export default UseCoupon;



/////////////////////////////////

  
import React, { useState } from 'react';
import { useUseCouponMutation } from '../../../../redux/features/coupon/couponApi';


const UseCoupon = () => {
    const [useCoupon] = useUseCouponMutation();
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    const handleUseCoupon = async () => {
        try {
            const result = await useCoupon({ code }).unwrap();
            console.log(result)
            setMessage(`Coupon used: ${result.code}`);
        } catch (err) {
            setMessage(err.data?.error || 'Failed to use coupon');
        }
    };

    return (
        <div>
            <input
                placeholder="Enter coupon code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleUseCoupon}>Use Coupon</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UseCoupon;
 */}