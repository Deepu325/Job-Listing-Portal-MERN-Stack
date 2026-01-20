import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../ui/components_lite/Navbar';

const PageTransitionLayout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default PageTransitionLayout;
