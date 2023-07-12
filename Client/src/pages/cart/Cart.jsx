/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { AuthContext } from '../../utils/AuthProvider';
import { MdDeleteSweep } from 'react-icons/md';
import { useAddToCart } from '../../hooks/useAddToCart';
const Cart = () => {
    const [, refetch] = useAddToCart();
    const { user } = useContext(AuthContext)
    const [data, setData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paginatedData, setPaginatedData] = useState([])
    const itemPerPage = 5;
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(data.length / itemPerPage)
    const handleChange = (event, value) => {
        setPage(value);
    }
    const totalPriceFn = () => {
        fetch(`http://localhost:5000/total-price/${user.email}`)
            .then(res => res.json())
            .then(result => {
                setTotalPrice(result.totalPrice)
            })
    }
    useEffect(() => {
        const testFn = () => {
            const lastIdx = page * itemPerPage;
            const firstIdx = lastIdx - itemPerPage;
            const newData = data.slice(firstIdx, lastIdx);
            setPaginatedData(newData);
        }
        return testFn();
    }, [page, data]);
    useEffect(() => {
        fetch(`http://localhost:5000/all-cart/${user.email}`)
            .then(res => res.json())
            .then(result => {

                setData(result)
            })
        totalPriceFn()
    }, [user.email])
    // const totalPrice = data.reduce((acc, item) => acc + item.food.price, 0)


    const handleAddQuantity = id => {
        fetch(`http://localhost:5000/upgrade-quantity`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                // Find the old quantity and add 1 to it
                quantity: data.find(item => item._id === id).quantity + 1,
                email: user.email,
                uuid: data.find(item => item._id === id).food.uuid
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.modifiedCount > 0) {
                    const newData = data.map(item => {
                        if (item._id === id) {
                            item.quantity = item.quantity + 1;
                            item.totalPrice = item.quantity * item.food.price;
                        }
                        return item;
                    })
                    setData(newData)
                    totalPriceFn()
                }
            })

    }
    const handleRemoveQuantity = id => {
        const oldQuantity = data.find(item => item._id === id).quantity;
        fetch(`http://localhost:5000/upgrade-quantity`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                // Find the old quantity and add 1 to it
                quantity: oldQuantity > 1 ? oldQuantity - 1 : 1,
                email: user.email,
                uuid: data.find(item => item._id === id).food.uuid
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.modifiedCount > 0) {
                    const newData = data.map(item => {
                        if (item._id === id) {
                            item.quantity = item.quantity - 1;
                            item.totalPrice = item.quantity * item.food.price;
                        }
                        return item;
                    })
                    setData(newData)
                    totalPriceFn()
                }
            })
    }

    const handleDelete = uuid => {
        fetch(`http://localhost:5000/delete-item/${user.email}/${uuid}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                if (res.deletedCount > 0) {
                    const newData = data.filter(item => item.food.uuid !== uuid);
                    setData(newData);
                    totalPriceFn()
                }
            })
    }


    const handleOrder = () => {
        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                totalPrice: totalPrice,
                orderDate: new Date(),
                orderTime: new Date(),
                orderItems: data
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.insertedId) {
                    alert('Order placed successfully');
                    // Now delete all the items from cart
                    fetch(`http://localhost:5000/delete-all/${user.email}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.deletedCount > 0) {
                                setData([]);
                                totalPriceFn();
                                refetch();
                            }
                        }
                        )
                }
            })
    }

    return (
        <div>
            <div className=" py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold">Product</th>
                                            <th className="text-left font-semibold">Price</th>
                                            <th className="text-left font-semibold">Quantity</th>
                                            <th className="text-left font-semibold">Total</th>
                                            <th className="text-left font-semibold">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            paginatedData.map((item, index) => <tr key={index}>
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <img className="h-16 w-16 mr-4" src={item.food.image} alt="Product image" />
                                                        <span className="font-semibold">{item.food.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">${item.food.price}</td>
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <button disabled={item.quantity === 1} onClick={() => handleRemoveQuantity(item._id)} className="border disabled:bg-gray-200 hover:bg-blue-600 hover:text-white duration-300 rounded-md py-2 px-4 mr-2">-</button>
                                                        <span className="text-center w-8">{item.quantity}</span>
                                                        <button onClick={() => handleAddQuantity(item._id)} className="border hover:bg-blue-600 hover:text-white duration-300 rounded-md py-2 px-4 ml-2">+</button>
                                                    </div>
                                                </td>
                                                <td className="py-4">${item.totalPrice}</td>
                                                <td className="py-4"><MdDeleteSweep onClick={() => handleDelete(item.food.uuid)} className='text-3xl text-red-400 hover:text-red-600 cursor-pointer duration-500' /></td>
                                            </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <Pagination onChange={handleChange} count={totalPage} color="primary" />
                        </div>
                        <div className="md:w-1/4 fixed right-4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Taxes</span>
                                    <span>free</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span>free</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                                </div>
                                <button onClick={() => handleOrder()} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Cart;