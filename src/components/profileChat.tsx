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
    id: number,
    onHandleOpenModal: (name: string, id: string) => void
}

const ProfileChat = ({name, active, id, onHandleOpenModal }: profile) => {
    const { currentChat } = useAuthContext();
    const [openPopOver, setOpenPopOver] = useState<boolean>(false)
    const popOverRef = useRef<HTMLDivElement | null>(null);

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
        <div className="navlink group flex items-center h-10 w-full relative" ref={popOverRef}>
            <Link to={`${id}`} className={`${active ? "bg-[#282a2c]" : "group-hover:bg-[#282a2c]"} profilename h-full w-full rounded-l-md flex items-center px-3`}>
                <p className="max-w-[200px] text-zinc-200 tracking-wide truncate overflow-hidden">{
                    currentChat?.name == name ? (
                        <TypeAnimation
                            sequence={[name]}
                            cursor={false}
                            speed={10}
                        />
                    ):(
                        name
                    )
                }</p>
            </Link>
            <button 
                className={`${active ? "bg-[#282a2c]" : "group-hover:bg-[#282a2c]"} action z-10 w-12 h-full border-none flex items-center justify-center rounded-r-md`}
                onClick={() => setOpenPopOver(!openPopOver)}
            >
                <HiOutlineDotsHorizontal className="text-white text-xl cursor-pointer"/>
            </button>
            <div className={`${ openPopOver ? "block z-30 h-20 ease-out transition-all duration-500 border border-zinc-700" : "h-0 ease-out transition-all duration-500"} popup -z-30 delay-300 absolute top-4 h-0 right-10 w-32 bg-[#282a2c] text-zinc-300 py-1 rounded poppins tracking-wider text-[14px] font-normal`}>
                <button 
                    className="action flex h-9 items-center pl-4 w-full hover:text-white rounded cursor-pointer"
                    onClick={()=> onHandleOpenModal("rename", String(id))}
                >
                    <VscEdit className="text-base"/>
                    <p className="text-xs ml-3">Edit nama</p>
                </button>
                <button 
                    className="action flex items-center h-9 pl-4 hover:text-white rounded cursor-pointer"
                    onClick={()=> onHandleOpenModal("delete", String(id))}
                >
                    <RiDeleteBin5Line className="text-base"/>
                    <p className="text-xs ml-3">Hapus</p>
                </button>
            </div>
        </div>
    )
}

export default ProfileChat