import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { AuthContext } from '../utils/AuthProvider';
import Swal from 'sweetalert2';
const navLinks = [
  { name: 'Home', link: '/' },
  { name: 'Items', link: '/' },
  { name: 'Shop', link: '/' },
]
const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const logoutHandler = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire(
              'Okk!',
              'You are logged out.',
              'success'
            )
          })
          .catch(err => console.log(`Error while logging out ${err}`))
      }
    })
  }

  return (
    <nav className='fixed  top-0 w-full bg-white'>
      <div className=" flex md:px-20 px-7 justify-between bg-white w-full items-center  backdrop-blur-2xl bg-opacity-20 py-4">
        <div className="">
          <h1 className='text-3xl font-bold'>Food Ease</h1>
        </div>
        <div className="hidden md:block">
          <ul>
            {

              navLinks.map((link, index) => (
                <li key={index} className='inline-block px-4 py-2'>
                  <Link className='font-bold hover:text-blue-600 duration-200' to={link.link}>{link.name}</Link>
                </li>
              ))
            }
            <li className='inline-block px-4 py-2'>
              <Link className='font-bold hover:text-blue-600 duration-200 relative' to='/cart'><span>Cart</span> <span className='w-fit absolute bg-blue-700 text-white px-2 rounded-full -top-5 left-5'>00</span></Link>
            </li>
            <li className='inline-block px-4 py-2'>
              {
                user ? <Link className='font-bold hover:text-blue-600 text-blue-500 duration-200' to='/'>{user.displayName}</Link> : <Link className='font-bold hover:text-blue-600 duration-200' to={`${location.pathname === '/login' ? '/register' : '/login'}`}>{location.pathname === '/login' ? 'Register' : 'Login'}</Link>
              }
            </li>
            {
              user && <li className='inline-block px-4 py-2'>
                <span onClick={() => logoutHandler()} className='font-bold cursor-pointer hover:text-blue-600 text-red-500 duration-200'>Logout</span>
              </li>
            }
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