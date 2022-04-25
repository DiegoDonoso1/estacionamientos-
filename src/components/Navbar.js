import { NavLink } from 'react-router-dom';
import './navbar.css';

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutBotton from './LogoutBotton';

export default function Navbar() {
    const { isAuthenticated, isLoading } = useAuth0();
    if (!isLoading)
        return (
            <div>
                <ul>
                    {isAuthenticated ? (
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
                                to='./perfil'
                            >
                                perfil
                            </NavLink>
                        </li>
                    ) : (
                        ''
                    )}
                    <li>
                        <NavLink to='./'>Home</NavLink>
                    </li>

                    <li>
                        <button>
                            {isAuthenticated ? (
                                <LogoutBotton />
                            ) : (
                                <LoginButton />
                            )}
                        </button>
                    </li>
                </ul>
            </div>
        );
}
