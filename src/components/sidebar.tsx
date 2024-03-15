import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/ei-icon.png";
import { TbSquareRoundedPlus } from "react-icons/tb";
import ProfileChat from "./profileChat";
import api from "../utils/api";
import { useQuery } from "react-query";
import { useEffect } from "react";

type props = {
    isNewProfile: boolean,
    resetValue: () => void
}

const SideBar = ({isNewProfile, resetValue}: props) => {
    const { idChat } = useParams()
    const navigate = useNavigate()
    const { data: dataProfileChat } = useQuery("fetchDataProfile",
            api.profileChat,
        {
            onError: (error:Error) => {
                console.log(error)
            },
        }
    );

    useEffect(() => {
        if(isNewProfile && dataProfileChat) {
            const newProfile = dataProfileChat[dataProfileChat.length - 1]
            resetValue()
            navigate(`/d/${newProfile._id}`)
        }
    }, [isNewProfile, dataProfileChat, navigate, resetValue])

    return(
        <div className="sidebar w-[290px] bg-[#1e1f26] h-full px-2 py-5">
            <div className="logo w-full flex items-center h-10 border-b border-zinc-600 pb-2">
                <Link to="/">
                    <img src={logo} alt="logo" className="h-9 w-9 object-cover object-center"/>
                </Link>
                <h1 className="text-[15px] tracking-wide pl-2">Easy AI</h1>
            </div>
            <div className="chat-profile relative poppins tracking-wide text-sm font-light mt-10 h-[60%] overflow-y-auto">
                {dataProfileChat?.map(item => (
                    <ProfileChat 
                        id={item._id}
                        name={item.name}
                        active={item._id == idChat ? true : false}  
                    />
                ))}
                <div className="nav sticky bottom-0 left-0 z-20 bg-[#1e1f26]">
                    <Link 
                        to="/d" 
                        className="flex items-center bg-[#282a2c] h-10 text-zinc-300 hover:text-white px-4 rounded-full border-none poppins tracking-wide mt-10 cursor-pointer text-xs font-medium">
                            <TbSquareRoundedPlus className="text-2xl"/>
                            <p className="pl-2">Tambah obrolan</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SideBar