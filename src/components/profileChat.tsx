import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { VscEdit } from "react-icons/vsc";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { TypeAnimation } from "react-type-animation";

type profile = {
    name: string,
    active: boolean,
    id: number
}

const ProfileChat = ({name, active, id }: profile) => {
    const { currentChat } = useAuthContext();
    const [openPopOver, setOpenPopOver] = useState<boolean>(false)
    const popOverRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
                if (popOverRef.current && !popOverRef.current.contains(event.target as Node)) {
                setOpenPopOver(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return(
        <Link to={`${id}`} ref={popOverRef} className={`${active ? "bg-[#282a2c]" : "hover:bg-[#282a2c]"} relative profilename h-10 w-full rounded-md flex items-center justify-between px-3 mt-1`}>
            <p className="max-w-[200px] text-zinc-200 tracking-wide truncate overflow-hidden">{
                currentChat.name !== name ? (
                    <TypeAnimation
                        sequence={[name]}
                        cursor={false}
                        speed={10}
                    />
                ):(
                    name
                )
            }</p>
            <button 
                className="action z-10 w-12 h-full border-none flex items-center justify-center"
                onClick={() => setOpenPopOver(!openPopOver)}
            >
                <HiOutlineDotsHorizontal className="text-white text-xl cursor-pointer"/>
            </button>
            <div className={`${ openPopOver ? "block" : "block"} popup top-1 -right-36 w-32 bg-[#282a2c] text-white z-30 p-2 rounded poppins tracking-wider text-[14px] font-normal`}>
                <div className="action flex items-center h-10 w-full hover:bg-gray-700 rounded px-2 cursor-pointer">
                    <VscEdit className="text-base"/>
                    <p className="text-xs ml-3">Edit nama</p>
                </div>
                <div className="action flex items-center h-10 hover:bg-slate-700 rounded px-2 cursor-pointer">
                    <RiDeleteBin5Line className="text-base"/>
                    <p className="text-xs ml-3">Hapus</p>
                </div>
            </div>
        </Link>
    )
}

export default ProfileChat