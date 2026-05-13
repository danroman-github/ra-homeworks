import { NavLink } from 'react-router-dom';

const Menu = () => {
    const menuItems = [
        { path: '/', label: 'Главная' },
        { path: '/drift', label: 'Дрифт-такси' },
        { path: '/timeattack', label: 'Time Attack' },
        { path: '/forza', label: 'Forza Karting' }
    ];

    return (
        <nav className="menu">
            {menuItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        isActive ? 'menu__item menu__item-active' : 'menu__item'
                    }
                    end={item.path === '/'}
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
};

export default Menu;