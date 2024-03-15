import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type props = {
    language?: string,
    code?: string,
    index: number,
    widtComponent?: number
}

const ChatIsCode = ({language, code, index, widtComponent}: props) => {
    
    return(
        <div className="code bg-zinc-700 p-1 mt-2 rounded overflow-x-hidden">
            <div className="header h-8 flex items-center px-2 text-xs">
                <p>{language ?? "Code"}</p>
            </div>
            <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language={language ?? "javascript"}
                customStyle={{
                    borderRadius: '7px',
                    width: `${widtComponent !== undefined ? widtComponent - 8 : widtComponent}px`,
                    fontSize: '13px',
                    lineHeight: 1.7,
                }}
            >
                {code ?? ""}
            </SyntaxHighlighter>
        </div>
    )
}

export default ChatIsCode