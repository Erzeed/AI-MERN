import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/ei-icon.png";
import { TbSquareRoundedPlus } from "react-icons/tb";
import ProfileChat from "./profileChat";
import api from "../utils/api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/auth";
import Modal from "./modal";

type props = {
    isNewProfile: boolean,
    resetValue: () => void
}

type dataChat = {
    _id: string,
    chat: string[],
    name: string,
    userId: string
}

const SideBar = ({isNewProfile, resetValue}: props) => {
    const { idChat } = useParams()
    const { isLogin } = useAuthContext();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [nameAction, setNameAction] = useState<string>()
    const [idDelProfile, setIdDelProfile] = useState<string>()
    const navigate = useNavigate()

    const { data: dataProfileChat } = useQuery("fetchDataProfile",
            api.profileChat,
        {
            onError: (error:Error) => {
                console.log(error.message)
            },
        }
    );

    useEffect(() => {
        if(isLogin == false) {
            navigate("/login")
        }
    }, [isLogin, navigate])

    useEffect(() => {
        if(isNewProfile && dataProfileChat) {
            const newProfile = dataProfileChat[dataProfileChat.length - 1]
            resetValue()
            navigate(`/d/${newProfile._id}`)
        }
    }, [isNewProfile, dataProfileChat, navigate, resetValue])

    const onHandleOpenModal = (name: string, id: string) => {
        setNameAction(name)
        setIdDelProfile(id)
        isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true)
    }

    return(
        <div className="sidebar w-[290px] bg-[#1e1f26] h-full px-2 py-5">
            <div className="logo w-full flex items-center h-10 border-b border-zinc-600 pb-2">
                <Link to="/">
                    <img src={logo} alt="logo" className="h-9 w-9 object-cover object-center"/>
                </Link>
                <h1 className="text-[15px] tracking-wide pl-2">Easy AI</h1>
            </div>
            <div className="chat-profile poppins tracking-wide text-sm font-light mt-10 w-full h-[60%]">
                <div className="content h-full overflow-y-scroll">
                    {dataProfileChat?.map((item: dataChat)=> (
                        <ProfileChat
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            active={item._id == idChat ? true : false}  
                            onHandleOpenModal={onHandleOpenModal}
                        />
                    ))}
                </div>
                <div className="nav bg-[#1e1f26]">
                    <Link 
                        to="/d" 
                        className="flex items-center bg-[#282a2c] h-10 text-zinc-300 hover:text-white px-4 rounded-full border-none poppins tracking-wide cursor-pointer text-xs mt-3 font-medium">
                            <TbSquareRoundedPlus className="text-2xl"/>
                            <p className="pl-2">Tambah obrolan</p>
                    </Link>
                </div>
            </div>
            <Modal 
                openModal={isOpenModal}
                onCloseModal={() => setIsOpenModal(false)}
                nameAction={nameAction}
                idDelChat={idDelProfile}
            />
        </div>
    )
}

export default SideBar