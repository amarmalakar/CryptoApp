import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import UiContext from "../../store/ui-context";
import '../../toggle.css';

const Navbar = () => {
    // Theme Handler
    const uiCtx = useContext(UiContext)
    const changeTheme = () => uiCtx.changeThemeApp()
    const checkedStatus = uiCtx.theme === 'dark';

    // mobile nav handler
    const [mobNav, setMobNav] = useState(false);
    const mobNavHandler = () => setMobNav(mobNav ? false : true);

    const navLinks = [
        {text: 'Coins', url: '/coins'},
        {text: 'WatchList', url: '/watchlist'},
        {text: 'dolor', url: '/'},
    ]

    return(
        <Fragment>
            <nav className="w-full shadow bg-cyan-600 py-4 px-2 dark:bg-gray-800">
                <div className="max-w-screen-xl m-auto flex items-center justify-between">
                    
                    <div className="flex items-center">
                        <span className="mr-2 cursor-pointer md:hidden" onClick={mobNavHandler}>
                            <i className="bi bi-list text-white text-2xl"></i>
                        </span>
                        <Link to="/" className="text-white font-semibold text-xl">CryptoApp</Link>
                    </div>

                    <ul className="hidden md:flex text-white text-lg space-x-4">
                        {navLinks.map((link, i) => (
                            <li key={i}>
                                <Link to={link.url}>{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="flex items-center space-x-4">
                        <a href="https://github.com/amarmalakar/CryptoApp" target="_blank">
                            <i className="bi bi-github text-2xl text-white"></i>
                        </a>

                        <label className="switch">
                            <input type="checkbox" checked={checkedStatus} onChange={() => {}} />
                            <span className="slider" onClick={changeTheme}></span>
                        </label>
                    </div>
                </div>
            </nav>

            {mobNav && <ul className="md:hidden bg-gray-500 text-white">
                {navLinks.map((link, i) => (
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-900" key={i}>
                        <Link to={link.url} className="block">{link.text}</Link>
                    </li>
                ))}
            </ul>}
        </Fragment>
    )
}

export default Navbar;
