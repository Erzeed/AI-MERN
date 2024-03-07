import logo from "../assets/ei-icon.png";

type props = {
    message: string,
    role: boolean
}
const ChatBuble = ({message, role}: props) => {
    return( 
        <div className={`${
            role ? "flex-row-reverse" : ""
        } flex items-start gap-2.5 my-2`}>
            <img className="w-10 h-10 rounded-full" src={logo} alt="Jese image" />
            <div className={`${
                    role ? "items-end" : ""
                } flex flex-col gap-1`}>
                <div className={`${
                    role ? "flex-row-reverse" : ""
                } flex items-center mb-1`}>
                    <span className="text-sm text-white tracking-wide">Bonnie Green</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 px-2">11:46</span>
                </div>
                <div className={`${
                    role ? "rounded-l-xl rounded-br-xl" : "rounded-e-xl rounded-es-xl"
                } flex flex-col leading-1.5 px-4 py-3 border-gray-200 bg-gray-100 dark:bg-[#282a2c] w-fit max-w-3/4`}>
                    <p className="text-sm font-light text-white whitespace-pre-line">{message}</p>
                </div>
                {/* <span className="text-xs tracking-wide font-normal text-gray-500">Delivered</span> */}
            </div>
        </div>
    )
}

export default ChatBuble