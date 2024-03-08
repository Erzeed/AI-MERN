import { useOutletContext, useParams } from "react-router-dom"
import { message } from "../page/chat"
import ChatBuble from "../components/chatBuble";
import { useMutation } from "react-query";
import api from "../utils/api";
import { useEffect } from "react";

export type messageChat = {
    idProfile?: string,
    role?: string,
    content?: string
}

const ChatMessage = () => {
    const chatMessage = useOutletContext<message>()
    const { idChat } = useParams()

    const mutation = useMutation(api.SendChat, {
        onSuccess: (data) => {
            console.log("berhasil", data)
        },
        onError:(error:Error) => {
            console.log(error)
        }
    })

    const onHandleSendMessage = () => {
        mutation.mutate({
            idProfile: undefined,
            role: chatMessage?.role,
            content: chatMessage?.message
        })
        console.log("haii")
    }

    useEffect(() => {
        onHandleSendMessage();
    },[chatMessage])

    console.log(chatMessage)

    return(
        <div className="w-full h-full">
            {/* {chatMessage.map((item, index) => (
                <ChatBuble key={index} role={item.role == "user"} message={item.message}/>
            ))} */}
        </div>
    )
}

export default ChatMessage