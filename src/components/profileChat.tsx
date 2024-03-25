import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import { VscEdit } from "react-icons/vsc";
// import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { TypeAnimation } from "react-type-animation";
import PopOver from "./popOver";

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

    const onHandleClick = (action: string) => {
        if(action == "Delete") {
            onHandleOpenModal("delete", String(id))
        }else {
            onHandleOpenModal("rename", String(id))
        }
    }

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
            <PopOver 
                isOpen={openPopOver}
                setClose={() => setOpenPopOver(false)}
                popOverRef={popOverRef}
                action="chat"
                onClick={onHandleClick}
            />
        </div>
    )
}

export default ProfileChat