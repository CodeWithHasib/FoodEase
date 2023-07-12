import React, { useContext, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { AuthContext } from '../../utils/AuthProvider';
const Cart = () => {
    // const [data = []] = useAddToCart();
    const { user } = useContext(AuthContext)
    const [data, setData] = useState([])
    const [paginatedData, setPaginatedData] = useState([])
    const itemPerPage = 5;
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(data.length / itemPerPage)
    const handleChange = (event, value) => {
        setPage(value);
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
                console.log(result)
                setData(result)
            })
    }, [user.email])
    const totalPrice = data.reduce((acc, item) => acc + item.food.price, 0)


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
                                                        <button className="border hover:bg-blue-600 hover:text-white duration-300 rounded-md py-2 px-4 mr-2">-</button>
                                                        <span className="text-center w-8">{item.quantity}</span>
                                                        <button onClick={() => handleAddQuantity(item._id)} className="border hover:bg-blue-600 hover:text-white duration-300 rounded-md py-2 px-4 ml-2">+</button>
                                                    </div>
                                                </td>
                                                <td className="py-4">${item.totalPrice}</td>
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
                                    <span>${totalPrice}</span>
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
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Cart;