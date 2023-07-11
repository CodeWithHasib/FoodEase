import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../utils/AuthProvider';
const MainLayout = () => {
    const { loader } = useContext(AuthContext);
    if (loader) return <h1>Loading...</h1>
    return (
        <main>
            <NavBar />
            <Outlet />
            <Toaster />
        </main>
    );
};

export default MainLayout;