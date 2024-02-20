import React, { useEffect, useState } from 'react';
import MenuDropdown from './MenuDropdown';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MenuItem({ menu }) {
    const location = useLocation();
    const [currentPathname, setCurrentPathname] = useState(location.pathname);

    
    useEffect(() => {
        setCurrentPathname(location.pathname);
    }, [location.pathname]);

    if (menu.sub) {
        return <MenuDropdown menu={menu} />;
    }

    return menu.icon ? (
        <li className='sidebar-item'>
            <Link className={`sidebar-link ${currentPathname === `/${menu.route}` ? 'active' : ''}`} to={`/${menu.route}`} aria-expanded="false">
            <div style={{width:'20px'}}>
                <span className="d-flex">
                {['Invoices','Contracts'].includes(menu.title) ? ( <FontAwesomeIcon icon={menu.icon} />) : ( <i className={menu?.icon} />)}
                </span>
            </div>
         
                <span className="hide-menu ml-5">{menu?.title}</span>
            </Link>
        </li>
    ) : (
        <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4" />
            <span className="hide-menu">{menu?.title}</span>
        </li>
    );
}

export default MenuItem;
