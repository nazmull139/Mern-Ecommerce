





import React, { useState } from "react";
import { useCreateCouponMutation } from "../../../../redux/features/coupon/couponApi";

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
            const formattedExpiryDate = `${couponData.expiryDate}T23:59:59.999Z`;
            const preparedCouponData = {
                ...couponData,
                expiryDate: formattedExpiryDate,
            };
            await createCoupon(preparedCouponData).unwrap();
            alert("Coupon created successfully!");
            setCouponData({ code: "", discount: 0, expiryDate: "" });
        } catch (err) {
            console.error("Failed to create coupon:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCouponData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.header}>Create a New Coupon</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="code" style={styles.label}>Coupon Code</label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            placeholder="Enter coupon code"
                            value={couponData.code}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="discount" style={styles.label}>Discount (%)</label>
                        <input
                            type="number"
                            id="discount"
                            name="discount"
                            placeholder="Enter discount"
                            value={couponData.discount}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="expiryDate" style={styles.label}>Expiry Date</label>
                        <input
                            type="date"
                            id="expiryDate"
                            name="expiryDate"
                            value={couponData.expiryDate}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={isLoading ? styles.buttonLoading : styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating..." : "Create Coupon"}
                    </button>
                </form>
                {isSuccess && <p style={styles.successMessage}>Coupon created successfully!</p>}
                {error && (
                    <p style={styles.errorMessage}>
                        {error.data?.error || "An error occurred. Please try again."}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CreateCoupon;

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
    },
    card: {
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
    },
    header: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    formGroup: {
        marginBottom: "15px",
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold",
        color: "#555",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "5px",
        border: "1px solid #ddd",
        outline: "none",
        transition: "border-color 0.3s ease",
    },
    button: {
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        fontWeight: "bold",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    buttonLoading: {
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        fontWeight: "bold",
        backgroundColor: "#6c757d",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "not-allowed",
    },
    successMessage: {
        color: "#28a745",
        textAlign: "center",
        marginTop: "15px",
    },
    errorMessage: {
        color: "#dc3545",
        textAlign: "center",
        marginTop: "15px",
    },
};




{/**  
import React, { useState } from 'react';
import { useCreateCouponMutation } from '../../../../redux/features/coupon/couponApi';


const CreateCoupon = () => {
    const [createCoupon] = useCreateCouponMutation();
    const [formData, setFormData] = useState({ code: '', discount: '', expiryDate: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createCoupon(formData).unwrap();
            setMessage(`Coupon created successfully! Code: ${response.code}`);
            setFormData({ code: '', discount: '', expiryDate: '' });
        } catch (error) {
            setMessage(error.data?.error || 'Failed to create coupon.');
        }
    };

    return (
        <div>
            <h2>Create Coupon</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="code"
                    placeholder="Coupon Code"
                    value={formData.code}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="discount"
                    placeholder="Discount"
                    value={formData.discount}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                />
                <button type="submit">Create Coupon</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
*/}


