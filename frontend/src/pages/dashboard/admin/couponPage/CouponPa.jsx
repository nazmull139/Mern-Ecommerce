
import React from 'react'

const CouponPa = () => {
  return (
    <div>CouponPa</div>
  )
}

export default CouponPa
{
    /*  
import React, { useState } from "react";
import { useCreateCouponMutation } from "../../../../redux/features/coupon/couponApi";
import UseCoupon from "./UseCoupon";


const CreateCoupon = () => {
    const [createCoupon, { isLoading, isSuccess, error }] = useCreateCouponMutation();
    const [couponData, setCouponData] = useState({
        code: "",
        discount: 0,
        expiryDate: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCoupon(couponData).unwrap();
            alert("Coupon created successfully!");
            setCouponData({ code: "", discount: 0, expiryDate: "" });
        } catch (err) {
            console.error("Failed to create coupon:", err);
        }
    };

    return (
        <>
        <div>
            <h1>Create Coupon</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponData.code}
                    onChange={(e) => setCouponData({ ...couponData, code: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Discount"
                    value={couponData.discount}
                    onChange={(e) =>
                        setCouponData({ ...couponData, discount: parseFloat(e.target.value) })
                    }
                />
                <input
                    type="date"
                    placeholder="Expiry Date"
                    value={couponData.expiryDate}
                    onChange={(e) =>
                        setCouponData({ ...couponData, expiryDate: e.target.value })
                    }
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Coupon"}
                </button>
            </form>
            {isSuccess && <p>Coupon created successfully!</p>}
            {error && <p style={{ color: "red" }}>{error.data?.error || "Error occurred!"}</p>}
        </div>
        <div>
            <UseCoupon/>
        </div>
        </>
    );
};

export default CreateCoupon;
*/}

{/**  
import React, { useState } from 'react';
import CreateCoupon from './CreateCoupon';
import UseCoupon from './UseCoupon';
import ValidateCoupon from './ValidateCoupon';

    
    const CouponPa = () => {
        const [view, setView] = useState('create'); // Options: 'create', 'validate', 'use'
    
        return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1>Coupon Management</h1>
                <nav style={{ marginBottom: '20px' }}>
                    <button onClick={() => setView('create')} className='bg-red-500'>Create Coupon</button>
                    <button onClick={() => setView('validate')} className='bg-red-500'>Validate Coupon</button>
                    <button onClick={() => setView('use')} className='bg-red-500'>Use Coupon</button>
                
                </nav>
                <hr />
                {view === 'create' && <CreateCoupon />}
                {view === 'validate' && <ValidateCoupon />}
                {view === 'use' && <UseCoupon />}
             
            </div>
        );
    };
    

    export default CouponPa*/}