import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='mt-10'>
            <section className="py-26 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="max-w-lg mx-auto">
                        <div className="text-center mb-8">
                            <a className="inline-block mx-auto mb-6" href="#">
                            </a>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Sign in</h2>
                        </div>
                        <form action="">
                            <div className="mb-6">
                                <label className="block mb-2 font-extrabold" htmlFor="email">Email</label>
                                <input
                                    className="inline-block 
                                    w-full px-4 py-2 leading-6 text-lg
                                     font-extrabold placeholder-gray-400
                                     placeholder:text-base placeholder:font-normal
                                     outline-none
                                      bg-white shadow border-2 border-blue-500 rounded"
                                    type="email"
                                    id="email"
                                    placeholder="Enter Your Email"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 font-extrabold" htmlFor="password">Password</label>
                                <input
                                    className="inline-block 
                                    w-full px-4 py-2 leading-6 text-lg
                                     font-extrabold placeholder-gray-400
                                     placeholder:text-base placeholder:font-normal
                                     outline-none
                                      bg-white shadow border-2 border-blue-500 rounded"
                                    type="password"
                                    id="password"
                                    placeholder="Enter Your Password"
                                />
                            </div>
                            <button
                                className="inline-block w-full py-3 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-blue-500 hover:bg-blue-600 border-3 border-blue-500 shadow rounded transition duration-200"
                                type="submit"
                            >
                                Sign in
                            </button>
                            <p className="text-center font-extrabold">
                                Don&rsquo;t have an account? <Link to={'/register'} className="text-red-500 hover:underline" href="#">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;