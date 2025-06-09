// IMPORTS
import { Outlet } from 'react-router-dom';
import Nav from './nav/Nav';
import Footer from './footer/Footer';

export default function Layout() {
    return (
        // NAV ET FOOTER EN DEHORS DU MAIN POUR EVITER DES REPETITIONS
        <>
            <Nav />
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>
    );
}