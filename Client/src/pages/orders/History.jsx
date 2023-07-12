import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/AuthProvider';
import { Pagination } from '@mui/material';
const History = () => {
    const [orderData, setOrderData] = useState([]);
    const [paginatedData, setPaginatedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 1;
    
    const totalPage = Math.ceil(orderData.length / itemPerPage); 
    
    const { user } = useContext(AuthContext); 

    useEffect(() => {
        fetch(`http://localhost:5000/orders/${user.email}`)
            .then((res) => res.json())
            .then((data) => setOrderData(data))
    }, [user])
    const handlePageChange = (e , value) => setCurrentPage(value); 


    useEffect(()=>{
        const lastIdx = currentPage * itemPerPage; 
        const firstIdx =  lastIdx - itemPerPage ; 
        const result = orderData.slice(firstIdx , lastIdx)
        setPaginatedData(result)
    },[currentPage , orderData])
    return (
        <>
            <div className="">
                <h1 className="text-2xl font-bold mt-16 text-center mb-3">Order History</h1>
            </div>
            {
                paginatedData.map(order => <div key={order._id} className="flex justify-center">
                    <div className="order-summary bg-white border border-gray-300 rounded p-4 mt-8 w-full max-w-md">
                        <h1 className="text-2xl font-bold text-center mb-4">Order Summary</h1>

                        <div className="order-details h-[240px] overflow-y-auto">
                            {order.orderItems.map((item) => (
                                <div key={item._id} className="order-item flex items-center mb-2">
                                    <img className="item-image w-16 h-16 object-cover mr-2" src={item.food.image} alt={item.food.name} />
                                    <div>
                                        <h2 className="item-name font-bold">{item.food.name}</h2>
                                        <p className="text-gray-600 text-sm">{item.food.description}</p>
                                    </div>
                                    <p className="item-price font-bold ml-auto">${item.totalPrice.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between my-4">
                            <div className="order-total text-right mt-4">
                                <h3 className="font-bold">Total Price:</h3>
                                <p className="text-2xl">${order.totalPrice.toFixed(2)}</p>
                            </div>

                            <div className="delivery-time text-right mt-4">
                                <h3 className="font-bold">Estimated Delivery Time:</h3>
                                <p>30 minutes</p>
                                <p>Total {order.orderItems.length} Items</p>
                            </div>
                        </div>
                    </div>
                </div>)
            }
            <div className="flex justify-center">
                <Pagination onChange={handlePageChange} count={totalPage} color="primary" />
            </div>
        </>
    );
};

export default History;
