import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { useGetOrderByIdQuery } from '../../../../redux/features/orders/orderApi';

const ViewOrder = () => {
  const { orderId } = useParams();
  const { data, isLoading, error } = useGetOrderByIdQuery(orderId);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Failed to fetch order.</div>;

  const order = data?.data;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Receipt</h1>
        <p className="text-sm text-gray-500">
          Order ID: <span className="font-mono text-gray-700">{order.orderId}</span>
        </p>
        <p className="text-sm text-gray-500">
          Placed on: {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
        </p>
      </div>

      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Personal Info */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Customer Details</h2>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Name:</span> {order.buyer}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Email:</span> {order.email}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Phone:</span> {order.phone}
          </p>
        </div>

        {/* Address Info */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Shipping Address</h2>
          <p className="text-gray-700 mb-2">{order.address.line1}</p>
          <p className="text-gray-700 mb-2">{order.address.line2}</p>
          <p className="text-gray-700">
            {order.address.city}, {order.address.country} - {order.address.postalcode}
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Order Summary</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Status:</span> {capitalize(order.status)}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Total Amount:</span> ${order.amount.toFixed(2)}
        </p>
      </div>

      {/* Product Details */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Products</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600">Product Name</th>
              <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-800">{product.name}</span>
                    <span className="text-sm text-gray-500">Product ID: {product.productId}</span>
                  </div>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center text-gray-700">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">Thank you for shopping with us!</p>
        <p className="text-sm text-gray-400">If you have any issues, please contact support.</p>
      </div>
    </div>
  );
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default ViewOrder;
