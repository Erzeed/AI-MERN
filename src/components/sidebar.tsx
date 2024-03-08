import { Link } from "react-router-dom";
import logo from "../assets/ei-icon.png";
import { TbSquareRoundedPlus } from "react-icons/tb";
import ProfileChat from "./profileChat";

const SideBar = () => {

    return(
        <div className="sidebar w-[350px] bg-[#1e1f26] h-full px-2 py-5">
            <div className="logo w-full flex items-center h-10 border-b border-zinc-600 pb-2">
                <Link to="/">
                    <img src={logo} alt="logo" className="h-9 w-9 object-cover object-center"/>
                </Link>
                <h1 className="text-[15px] tracking-wide pl-2">Easy AI</h1>
            </div>
            <div className="chat-profile poppins tracking-wide text-sm font-light mt-10">
                <ProfileChat 
                    id={1}
                    name="Error in react" 
                    active={true}  
                />
                <ProfileChat
                    id={2}
                    name="Multer file upload error" 
                    active={false} 
                />
                <ProfileChat 
                    id={3}
                    name="Log rotation for disk usageeeeeee" 
                    active={false} 
                />
                <Link 
                    to="/d" 
                    className="flex items-center bg-[#282a2c] h-10 text-zinc-300 hover:text-white px-4 rounded-full border-none poppins tracking-wide mt-10 cursor-pointer text-xs font-medium">
                        <TbSquareRoundedPlus className="text-2xl"/>
                        <p className="pl-2">Tambah obrolan</p>
                </Link>
            </div>
        </div>
    )
}

export default SideBar