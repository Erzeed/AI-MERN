import { useEffect, useState } from "react";
import logo from "../assets/ei-icon.png";

const Header = () => {
    const [showBackground, setShowBackground] = useState(false);
    const TOP_OFFSET = 100;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return(
        <div className={`${showBackground && "bg-black"} sticky z-20 top-0 left-0 flex h-16 md:px-10 px-3 py-4 justify-between dark:text-white`}>
            <div className="logo flex h-full items-center">
                <img src={logo} className="h-12 w-12 object-cover" />
                <h1 className="md:text-xl text-sm tracking-wide pl-2">Easy Ai</h1>
            </div>
            <div className="space-x-2 hidden md:flex">
                <div className="btn color-gradient w-24 h-9 rounded-full p-[1px] flex justify-center items-center">
                    <button type="button" className="text-xs bg-black w-full h-full rounded-full">Login</button>
                </div>
                <div className="btn color-gradient w-28 h-9 rounded-full p-[1px] flex justify-center items-center">
                    <button type="button" className="text-xs color-gradient-parent w-full h-full rounded-full">Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default Header