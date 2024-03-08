import SideBar from "../components/sidebar";
import TextareaAutosize from 'react-textarea-autosize';
import { useAuthContext } from "../contexts/auth"
import { IoReturnDownForward } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import NewChatAnimate from "../components/newChatAnimate";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export type message = {
    role: string,
    message: string
}

const Chat = () => {
    const { userData, isLogin } = useAuthContext();
    const [inputPromp, setInputPromp] = useState<string>("")
    const [chatMessage, setChatMessage] = useState<message>()
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const params = useParams()
    const navigate = useNavigate()
    console.log(userData)

    useEffect(() => {
        // Scroll to the bottom of the chat container when chatMessage changes
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessage]);

    useEffect(() => {
        !isLogin && navigate("/login")
    }, [isLogin, navigate])


    const onHandleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputPromp(event.target.value)
    }

    const onHandleSubmit = () => {
        if(inputPromp.length >= 2) {
            const newMessage: message = {role: "user", message: inputPromp}
            setChatMessage(newMessage)
            setInputPromp("")
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onHandleSubmit();
        }
    };

    return(
        <div className="chat flex text-white h-full w-full overflow-hidden">
            <SideBar />
            <div className="content w-full flex flex-col justify-between poppins tracking-wider">
                <div className="header flex justify-end h-14 w-full px-4 py-3">
                    <button type="button" className="w-10 h-10 bg-white rounded-full flex justify-center items-center text-black">
                        Rz
                    </button>
                </div>
                <div ref={chatContainerRef} className="content h-full w-4/5 flex flex-col m-auto overflow-y-scroll">
                    {params.idChat == undefined ? (
                        <NewChatAnimate username="Feizal Reza"/>
                    ): (
                        <Outlet context={chatMessage}/>
                    )}
                </div>
                <div className="foot h-28 relative flex flex-col justify-end items-center p-1">
                    <div className="prompt relative w-4/5 h-auto ">
                        <TextareaAutosize 
                            className="w-full text-base tracking-wide text-zinc-300 rounded-lg bg-[#282a2c] border-none focus:outline-none px-4 py-4 resize-none" 
                            maxRows={5}
                            onChange={onHandleChangeInput}
                            onKeyDown={handleKeyDown}
                            value={inputPromp}
                            rows={1}
                        />
                        <button 
                            type="button" 
                            className="absolute right-5 bottom-[16px] p-2 bg-[#1e1f26] rounded"
                            onClick={onHandleSubmit}
                        >
                            <IoReturnDownForward className="text-xl font-semibold"/>
                        </button>
                    </div>
                    <p className="text-xs font-light text-zinc-400 mt-1">Informasi yang diberikan mungkin tidak akurat.</p>
                </div>
            </div>
        </div>
    )
}

export default Chat