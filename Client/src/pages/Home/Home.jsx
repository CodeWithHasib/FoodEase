import React from 'react';
import NavBar from '../../components/NavBar';
import Cards from './Cards';
import Hero from './Hero';

const Home = () => {
    return (
        <div className="max-w-screen-xl w-[90%] mx-auto">
            <Hero />
            <Cards />
        </div>
    );
};

export default Home;