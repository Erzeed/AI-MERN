import { useEffect, useRef, useState } from "react";
import logo from "../assets/ei-icon.png";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useParams } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

type props = {
    message: string,
    role: boolean,
    username: string,
    dataCurrentChat: {
        content: string,
        role: boolean,
    }
}

function extractCodeFromString(message: string) {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChatBuble = ({message, role, username, dataCurrentChat}: props) => {
    const messageBlocks = extractCodeFromString(message);
    const widthComponentBuble = useRef<HTMLDivElement>(null);
    const [widtComponent, setWidthComponent] = useState<number>();
    const { idChat } = useParams();

    const renderText = (text:string) => {
        // Regular expression to match text enclosed within backticks
        const regex = /`(.*?)`/g;
        // Split the text using the regular expression
        const parts = text.split(regex);
        // Render each part
        return parts.map((part, index) => {
            // Check if the part is enclosed within backticks
            if (index % 2 === 1) {
                // Apply bold style to the text enclosed within backticks [#282a2c] text-zinc-400
                return <span className="bg-slate-800 px-2 py-[.1px] rounded-md text-blue-400" key={index}>{part}</span>;
            } else {
                // Render regular text
                return part
            }
        });
    }

    const width = widthComponentBuble.current?.offsetWidth;
    useEffect(() => {
        setWidthComponent(width)
    }, [idChat]);

    return( 
        <div className={`${ role ? "flex-row-reverse" : ""
            } flex items-start gap-2.5 my-2`}
        >
            <img className="w-10 h-10 rounded-full" src={logo} alt="Jese image" />
            <div className={`${ role ? "items-end" : "" } flex flex-col gap-1`} >
                <div className={`${ role ? "flex-row-reverse" : "" } flex items-center mb-1`}>
                    <span className="text-sm text-white tracking-wide">{username}</span>
                </div>
                <div className={`${
                        role ? "rounded-l-xl rounded-br-xl dark:bg-[#282a2c]" : "rounded-e-xl rounded-es-xl bg-zinc-900"
                    } flex flex-col px-4 py-3 border-gray-200 max-w-[85%]`}
                >
                    <div ref={widthComponentBuble} className="text-sm font-light whitespace-pre-line leading-relaxed text-zinc-300 w-full">
                        {!messageBlocks && (
                            message !== dataCurrentChat?.content ? (
                                message
                            ) : (
                                <TypeAnimation
                                    sequence={[message]}
                                    cursor={false}
                                    speed={70}
                                />
                            )
                        )}
                        {messageBlocks &&
                            messageBlocks.length &&
                                messageBlocks.map((block, index) =>
                                    block.type === 'code' ? (
                                        <SyntaxHighlighter
                                            key={index}
                                            style={coldarkDark}
                                            language={block.language}
                                            customStyle={{
                                                borderRadius: '7px',
                                                width: `${widtComponent}px`,
                                                fontSize: '13px',
                                                lineHeight: 1.7,
                                            }}
                                        >
                                            {block.code}
                                        </SyntaxHighlighter>
                                    ) : (
                                        message !== dataCurrentChat?.content ? (
                                            block.content && renderText(block.content)
                                        ) : (
                                            block.content &&
                                            renderText(block.content).map((item, itemIndex) => {
                                                if (item.type === 'span') {
                                                    return item
                                                } else {
                                                return (
                                                    <TypeAnimation
                                                        key={itemIndex}
                                                        sequence={[item]}
                                                        cursor={false}
                                                        speed={70}
                                                    />
                                                );
                                            }
                                            })
                                        )
                                )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBuble