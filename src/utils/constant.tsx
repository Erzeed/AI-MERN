import { AiFillAppstore } from "react-icons/ai";
import { PiChatTextBold } from "react-icons/pi";
import { IoLanguageSharp } from "react-icons/io5";

export const cardData= [
    {   
        name: "Dynamic Tools", 
        desc: "Build and configure your own prompts and tools dynamically for a personalized AI experiance",
        icons: <AiFillAppstore style={{ fill: "url(#purple-gradient)" }}/>
    },
    {   
        name: "Chat Playground", 
        desc: "Have full, ngaging onversations with AI, without topic restrictions, in our chat playground",
        icons: <PiChatTextBold style={{ fill: "url(#purple-gradient)" }}/>
    },
    {   
        name: "Multilingual Support", 
        desc: "Go global and connect with user worldwide with our multingual support",
        icons: <IoLanguageSharp style={{ fill: "url(#purple-gradient)" }}/>
    },
]