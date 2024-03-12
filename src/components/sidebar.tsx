import { Link, useParams } from "react-router-dom";
import logo from "../assets/ei-icon.png";
import { TbSquareRoundedPlus } from "react-icons/tb";
import ProfileChat from "./profileChat";
import api from "../utils/api";
import { useQuery } from "react-query";

const SideBar = () => {
    const { idChat } = useParams()
    const { data: dataProfileChat } = useQuery("fetchDataProfile",
            api.profileChat,
        {
            onError: (error:Error) => {
                console.log(error)
            },
        }
    );

    return(
        <div className="sidebar w-[290px] bg-[#1e1f26] h-full px-2 py-5">
            <div className="logo w-full flex items-center h-10 border-b border-zinc-600 pb-2">
                <Link to="/">
                    <img src={logo} alt="logo" className="h-9 w-9 object-cover object-center"/>
                </Link>
                <h1 className="text-[15px] tracking-wide pl-2">Easy AI</h1>
            </div>
            <div className="chat-profile poppins tracking-wide text-sm font-light mt-10">
                {dataProfileChat?.map((item) => (
                    <ProfileChat 
                        id={item._id}
                        name={item.name}
                        active={item._id == idChat ? true : false}  
                    />
                ))}
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