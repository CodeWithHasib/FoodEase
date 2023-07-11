import React, { useContext, useEffect, useState } from 'react';
import { useAddToCart } from '../../hooks/useAddToCart';
import { AuthContext } from '../../utils/AuthProvider';

const Cards = () => {
    const { user } = useContext(AuthContext)
    const [data, setData] = useState([]);

    const [cartData, refetch] = useAddToCart()
    console.log(cartData)
    useEffect(() => {
        fetch('fakeData.json')
            .then((res) => res.json())
            .then((json) => setData(json))
    }, [])
    const cartClickHandler = id => {
        console.log(id)
        fetch('http://localhost:5000/cart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                itemId: id,
                userName: user.displayName,
                userEmail: user.email
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.insertedId) {
                    alert('Item added to cart')
                }
            })
    }

    return (
        <>

            <div className="grid gap-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4">
                {
                    data.map((item) => <div key={item.uuid} className=" lg:w-[300px] w-full flex flex-col justify-between p-2 border">
                        <div className="">
                            <img className="h-[250px] w-full" src={item.image} alt="" />
                        </div>
                        <div className="mt-4 px-2">
                            <h1 className="font-bold text-lg">{item.name}</h1>
                            <p className="text-sm ">{item.description}</p>
                            <div className="flex justify-between items-center mt-5">
                                <p className="font-bold text-blue-600">${item.price}</p>
                                <button onClick={() => cartClickHandler(item.uuid)} className='px-3 py-1 text-white font-bold rounded-xl text-sm bg-blue-500'>Add to Cart</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    );
};

export default Cards;