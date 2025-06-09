// IMPORTS
import './nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

// FUNCTION
export default function Nav() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    return (
        <nav className='navDiv'>
            <div className='divNav1'>
                <h1 className='divNav1H1'>Where in the world?</h1>
            </div>
            <div className='divNav2' onClick={toggleDarkMode}>
                <FontAwesomeIcon className='divNav2Icon' icon={darkMode ? faSun : faMoon} />
                <p className='divNav2P'>{darkMode ? 'Light Mode' : 'Dark Mode'}</p>
            </div>
        </nav>
    );
}