import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Menu from '../../pages/Menu/Menu';
import Location from '../../pages/Location/Location';
import ReserveTable from '../../pages/Reservation/ReserveTable';

const HashNavigationWrapper = () => {
    const [activeView, setActiveView] = useState('Home');
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash.replace('#', '');

        if (hash && ['Home', 'Menu', 'Location', 'Reservation'].includes(hash)) {
            setActiveView(hash);
        } else if (!hash) {
            // Set default hash if none exists
            window.location.hash = 'Home';
            setActiveView('Home');
        }
    }, [location.hash]);

    // Render the component based on active view
    const renderActiveComponent = () => {
        switch (activeView) {
            case 'Menu':
                return <Menu />;
            case 'Location':
                return <Location />;
            case 'Reservation':
                return <ReserveTable />;
            case 'Home':
            default:
                return <Home />;
        }
    };

    return (
        <div className="hash-navigation-content">
            {renderActiveComponent()}
        </div>
    );
};

export default HashNavigationWrapper;