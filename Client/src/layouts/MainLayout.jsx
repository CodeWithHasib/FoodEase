import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Toaster } from 'react-hot-toast';
const MainLayout = () => {
    return (
        <main>
            <NavBar />
            <Outlet />
            <Toaster />
        </main>
    );
};

export default MainLayout;