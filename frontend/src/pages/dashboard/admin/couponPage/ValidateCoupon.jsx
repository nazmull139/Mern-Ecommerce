import React, { useState } from 'react';
import { useValidateCouponQuery } from '../../../../redux/features/coupon/couponApi';


const ValidateCoupon = () => {
    const [code, setCode] = useState('');
    const { data, error, refetch } = useValidateCouponQuery(code, {
        skip: !code, // Only fetch if code is provided
    });

    const handleValidate = () => {
        refetch();
    };

    return (
        <div>
            <input
                placeholder="Enter coupon code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleValidate}>Validate Coupon</button>
            {data && <p>Coupon is valid! Discount: {data.discount}</p>}
            {error && <p>Error: {error.data?.error}</p>}
        </div>
    );
};

export default ValidateCoupon;

