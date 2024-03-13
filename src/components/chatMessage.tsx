import { useParams } from "react-router-dom"
import { useQuery } from "react-query";
import { useEffect, useRef } from "react";
import { useAuthContext } from "../contexts/auth";
import { message } from "../page/chat";
import ChatBuble from "../components/chatBuble";
import api from "../utils/api";
import Loading from "./loading";

const ChatMessage = () => {
    const { userData, 
            currentChat, 
            setCurrentChat, 
            setLoading,
            loading } = useAuthContext();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { idChat } = useParams()
    const { username } = userData

    const { data: dataChat, isLoading, refetch } = useQuery(
        ["fetchChatById", idChat], () => api.fetchChatById(idChat || ""),
        {
            enabled: !!idChat,
        }
    );

    useEffect(() => {
        setLoading(false)
    }, [dataChat, setLoading])

    // Scroll to the bottom of the chat container when dataChat changes
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [dataChat, loading]);

    useEffect(() => {
        refetch()
        setCurrentChat({})
    }, [idChat, refetch, setCurrentChat])

    return(
        <div className="w-4/5 h-full overflow-y-scroll m-auto no-scrollbar" ref={chatContainerRef}>
            {isLoading ? (
                <Loading />
            ):(
                dataChat?.chat?.map((item: message) => (
                    <ChatBuble 
                        role={item.role == "user"} 
                        message={item.content} 
                        username={item.role == "user" ? username : "AI"}
                        dataCurrentChat={currentChat !== undefined ? currentChat : ""}
                    />
                ))
            )}
            {loading && (
                <Loading />
            )}
        </div>
    )
}

export default ChatMessage