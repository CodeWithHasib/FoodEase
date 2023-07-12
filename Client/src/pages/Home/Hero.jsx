import React from 'react';

const Hero = () => {

    return (
        <div>
            <div className="dark:bg-transparent">
                <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
                    <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl 
                        text-center text-gray-800  font-black">
                            Food Ease: Order Food
                            <span className="text-blue-600 mx-3">Online</span>
                            and Satisfy Your Hunger
                        </h1>
                        <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-500 font-normal text-center text-xl">
                            Order Food Online
                        </p>
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default Hero;