import React, { useState } from 'react';
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi';

const UpdateOrderModal = ({order, isOpen, onClose}) => {
    const [status, setStatus] = useState(order?.status);


    const [updateOrderStatus, {isLoading, error}] = useUpdateOrderStatusMutation();

    const handleUpdate =  async () => {
        try {
            const response =  await updateOrderStatus({id: order?._id, status}).unwrap();
            console.log(response)
            alert("Updated order status");
            onClose();
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    }



    
  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
        
        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
            <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
            >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
            </select>
        </div>
        
        <div className="flex justify-end space-x-2">
            <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
                Cancel
            </button>
            <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
        </div>
    </div>
</div>
  )
}

export default UpdateOrderModal