import React from 'react';
import NavBar from '../../components/NavBar';
import Cards from './Cards';

const Home = () => {
    return (
        <div>
            <div className="max-w-screen-xl w-[90%] mx-auto">
                <Cards />
            </div>
        </div>
    );
};

export default Home;