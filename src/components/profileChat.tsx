import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { VscEdit } from "react-icons/vsc";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

type profile = {
    name: string,
    active: boolean
}

const ProfileChat = ({name, active}: profile) => {
    const [openPopOver, setOpenPopOver] = useState<boolean>(false)
    const popOverRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
                if (popOverRef.current && !popOverRef.current.contains(event.target)) {
                setOpenPopOver(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return(
        <div ref={popOverRef} className={`${active ? "bg-[#282a2c]" : "hover:bg-[#282a2c] cursor-pointer"} relative profilename h-10 w-full rounded-md flex items-center justify-between px-3 mt-1`}>
            <p className="max-w-[200px] text-zinc-200 tracking-wide truncate overflow-hidden">{name}</p>
            <button 
                className="action z-10 w-10 bg-transparent border-none"
                onClick={() => setOpenPopOver(!openPopOver)}
            >
                <HiOutlineDotsHorizontal className="text-white text-xl cursor-pointer"/>
            </button>
            <div className={`${ openPopOver ? "block" : "hidden"} popup absolute top-1 -right-36 w-32 bg-[#282a2c] text-white z-20 p-2 rounded poppins tracking-wider text-[14px] font-normal`}>
                <div className="action flex items-center h-10 w-full hover:bg-gray-700 rounded px-2 cursor-pointer">
                    <VscEdit className="text-base"/>
                    <p className="text-xs ml-3">Edit nama</p>
                </div>
                <div className="action flex items-center h-10 hover:bg-slate-700 rounded px-2 cursor-pointer">
                    <RiDeleteBin5Line className="text-base"/>
                    <p className="text-xs ml-3">Hapus</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileChat