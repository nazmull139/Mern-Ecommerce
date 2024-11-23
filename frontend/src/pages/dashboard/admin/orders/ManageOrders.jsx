import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { useDeleteOrderByIdMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/orderApi';
import UpdateOrderModal from './UpdateOrderModal';

const ManageOrders = () => {
   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const {data , isLoading , error , refetch} = useGetAllOrdersQuery();
    const [deleteOrderById] = useDeleteOrderByIdMutation();
    

    if (isLoading) return <Loading />;
    if (error) return <div>Failed to fetch orders!</div>

    const orders = data.data || [];
//console.log(orders)
    const handleDeleteClick = async (orderId) => {
        try {
            await deleteOrderById(orderId).unwrap();
            alert(`Delete order ${orderId}`);
            refetch();

        } catch (error) {
            console.error("Failed to delete order:", err);
        }
    }

    const handleEdit = (order) => {
       // console.log(order)
        setSelectedOrder(order)
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    }

    return (
        <section className="section__container p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>

            {/* Orders Table */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 border-b">Order ID</th>
                        <th className="py-3 px-4 border-b">Customer</th>
                        <th className="py-3 px-4 border-b">Status</th>
                        <th className="py-3 px-4 border-b">Date</th>
                        <th className="py-3 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td className="py-3 px-4 border-b">{order.orderId}</td>
                            <td className="py-3 px-4 border-b">{order?.email}</td>
                            <td className="py-3 px-4 border-b">
                                <span className={`inline-block px-3 text-xs py-1 text-white rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="py-3 px-4 border-b">{new Date(order?.updatedAt).toLocaleDateString()}</td>
                            <td className="py-3 px-4   border-b flex items-center space-x-4">
                                <Link
                                    to={`orders/${order._id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    View
                                </Link>
                                <button
                                    onClick={() => handleEdit(order)}
                                    className="text-green-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(order?._id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Order Modal */}
            {selectedOrder && (
                <UpdateOrderModal   order={selectedOrder} isOpen={isModalOpen} onClose={handleCloseModal}/>
            )}
        </section>
    )
}

export default ManageOrders

const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500';
        case 'processing':
            return 'bg-blue-500';
        case 'shipped':
            return 'bg-green-500';
        case 'completed':
            return 'bg-gray-500';
        default:
            return 'bg-gray-300';
    }
};