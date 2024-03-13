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

export function extractCodeFromString(message: string) {
    const codeBlockRegex = /```([\w-]+)?\n([\s\S]*?)\n```/g;
    const messageBlocks = [];

    let match;
    let lastIndex = 0;
    while ((match = codeBlockRegex.exec(message)) !== null) {
        const [, language, code] = match;
        const textBlock = message.slice(lastIndex, match.index);
        if (textBlock) {
        messageBlocks.push({ type: 'text', content: textBlock });
        }
        messageBlocks.push({ type: 'code', language, code: code.trim() });
        lastIndex = match.index + match[0].length;
    }

    const remainder = message.slice(lastIndex);
    if (remainder) {
        messageBlocks.push({ type: 'text', content: remainder });
    }

    return messageBlocks;
}

export const configAnimation = (data: object) => {
    const configLottie = {
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    return configLottie
}