import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
const NavBar = () => {
  const [show, setShow] = useState(false)
  return (
    <nav className='fixed  top-0 w-full bg-white'>
      <div className=" flex md:px-20 px-7 justify-between bg-blue-600 w-full items-center  backdrop-blur-2xl bg-opacity-20 py-4">
        <div className="">
          <h1 className='text-3xl font-bold'>Food Ease</h1>
        </div>
        <div className="hidden md:block">
          <ul>
            <li className='inline-block px-4 py-2'>
              <Link className='font-bold hover:text-blue-600 duration-200' to='/'>Home</Link>
            </li>
            <li className='inline-block px-4 py-2'>
              <Link className='font-bold hover:text-blue-600 duration-200' to='/'>Items</Link>
            </li>
            <li className='inline-block px-4 py-2'>
              <Link className='font-bold hover:text-blue-600 duration-200' to='/'>Shop</Link>
            </li>
          </ul>
        </div>
        <div className={`md:hidden`}>
          <FiMenu onClick={() => setShow(!show)} className='text-3xl' />
        </div>
      </div>
      <ul className={`${show ? 'mt-5' : '-mt-28'} md:block bg-slate-200`}>
        <li className='inline-block px-4 py-2'>
          <Link className='font-bold hover:text-blue-600 duration-200' to='/'>Home</Link>
        </li>
        <li className='inline-block px-4 py-2'>
          <Link className='font-bold hover:text-blue-600 duration-200' to='/'>Items</Link>
        </li>
        <li className='inline-block px-4 py-2'>
          <Link className='font-bold hover:text-blue-600 duration-200' to='/'>Shop</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;