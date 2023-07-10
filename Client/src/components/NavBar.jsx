import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
const NavBar = () => {
  const [show, setShow] = useState(false)
  return (
    <nav className='md:px-20 px-7 flex justify-between items-center  py-2'>
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
      <div className="">
        <FiMenu onClick={() => setShow(!show)} className='text-3xl' />
      </div>
    </nav>
  );
};

export default NavBar;