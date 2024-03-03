import logo from "../assets/ei-icon.png";

const Header = () => {
    return(
        <div className="sticky z-20 top-0 left-0 flex h-16 px-10 py-4 justify-between dark:text-white">
            <div className="logo flex h-full items-center">
                <img src={logo} className="h-12 w-12 object-cover" />
                <h1 className="text-xl tracking-wide pl-2">Easy Ai</h1>
            </div>
            <div className="flex space-x-2">
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