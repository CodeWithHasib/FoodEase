import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                src="logo.png"
                                alt="Logo"
                                className="h-8 w-8 transition transform hover:scale-110"
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a
                                    href="#"
                                    className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition transform hover:scale-110"
                                >
                                    Home
                                </a>
                                <a
                                    href="#"
                                    className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition transform hover:scale-110"
                                >
                                    Menu
                                </a>
                                <a
                                    href="#"
                                    className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition transform hover:scale-110"
                                >
                                    About
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button
                                type="button"
                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition transform hover:scale-110"
                            >
                                <span className="sr-only">View notifications</span>
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 21a9 9 0 01-9-9M22 12a9 9 0 01-9 9"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
