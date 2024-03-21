import SideBar from "../components/sidebar";
import TextareaAutosize from 'react-textarea-autosize';
import { useAuthContext } from "../contexts/auth"
import { IoReturnDownForward } from "react-icons/io5";
import { useState } from "react";
import NewChatAnimate from "../components/newChatAnimate";
import { Outlet, useParams } from "react-router-dom";
import api from "../utils/api";
import { useMutation, useQueryClient } from "react-query";

export type message = {
    idProfile: string|undefined,
    role: string,
    content: string
}

const Chat = () => {
    const { userData, 
            setCurrentChat, 
            setLoading, 
            Loading} = useAuthContext();
    const [inputPromp, setInputPromp] = useState<string>("")
    const [isNewProfile, setIsNewProfile] = useState<boolean>(false)
    const { idChat } = useParams()
    const queryClient = useQueryClient();
    const avatar = `https://ui-avatars.com/api/?rounded=true&name=${userData?.username}&background=random`

    const mutation = useMutation(api.SendChat, {
        onSuccess: async (data) => {
            await queryClient.refetchQueries("fetchChatById")
            onHanldeSetCurrentChat(data?.chat)
            checkIfNewProfile()
        },
        onError:(error:Error) => {
            console.log(error)
        }
    })

    const onHanldeSetCurrentChat = (chat: object[]) => {
        setCurrentChat({
            isnew: chat.length <= 2 ? true : false,
            ...chat[chat.length - 1]
        })
    }

    const checkIfNewProfile = async () => {
        if(!idChat) {
            await queryClient.refetchQueries("fetchDataProfile")
            setIsNewProfile(true)
        }
    }

    const onHandleResetValue = () => {
        setIsNewProfile(false)
    }


    const onHandleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputPromp(event.target.value)
    }

    const onHandleSubmit = () => {
        if(inputPromp.length >= 2 && Loading !== true) {
            const newMessage: message = { 
                idProfile: idChat,
                role: "user", 
                content: inputPromp
            }
            mutation.mutateAsync(newMessage)
            setLoading(true)
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
        <div className="chat flex text-white h-full w-full">
            <SideBar 
                isNewProfile={isNewProfile} 
                resetValue={onHandleResetValue}
            />
            <div className="content w-3/4 flex flex-col justify-between poppins tracking-wider px-2">
                <div className="header flex justify-end h-14 w-full px-4 py-3">
                    <button type="button" className="w-10 h-10 bg-white rounded-full flex justify-center items-center text-black">
                        <img src={avatar} alt={userData?.username} />
                    </button>
                </div>
                <div className="content h-full w-full  flex flex-col mb-5 overflow-x-hidden">
                    {idChat == undefined ? (
                        <NewChatAnimate username={userData?.username}/>
                    ): (
                        <Outlet />
                    )}
                </div>
                <div className="foot h-28 relative flex flex-col justify-end items-center p-2">
                    <div className="prompt relative w-5/6 h-auto ">
                        <TextareaAutosize 
                            className="w-full text-base tracking-wide text-zinc-300 rounded-lg bg-[#282a2c] border-none focus:outline-none px-4 py-3 resize-none" 
                            maxRows={5}
                            onChange={onHandleChangeInput}
                            onKeyDown={handleKeyDown}
                            value={inputPromp}
                            rows={1}
                        />
                        <button 
                            type="button" 
                            className="absolute right-5 bottom-[16px] p-1 bg-[#1e1f26] rounded"
                            onClick={onHandleSubmit}
                        >
                            <IoReturnDownForward className="text-xl font-semibold"/>
                        </button>
                    </div>
                    <p className="text-[10px] font-light text-zinc-500 mt-1">Informasi yang diberikan mungkin tidak akurat.</p>
                </div>
            </div>
        </div>
    )
}

export default Chat