import { RefObject, useEffect } from "react";
import { optionProfile, optionProfileChat } from "../utils/constant";
import { motion } from 'framer-motion';

type props = {
    isOpen: boolean,
    setClose: () => void,
    popOverRef: RefObject<HTMLButtonElement | HTMLDivElement>,
    action: string,
    onClick: (name: string) => void
}

interface Option {
    name: string;
    icons: JSX.Element;
}

const PopOver = ({ isOpen, setClose, popOverRef, action, onClick }: props) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
                if (popOverRef.current && !popOverRef.current.contains(event.target as Node)) {
                    setClose();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const renderOptions = (options: Option[]) => (
        options.map((item, index) => (
            <button
                key={index}
                className="action flex h-9 items-center w-full hover:text-white rounded cursor-pointer tracking-wider text-zinc-400 z-30"
                onClick={() => onClick(item.name)}
            >
                <i className={`text-${action === 'chat' ? 'sm' : 'lg'}`}>{item.icons}</i>
                <p className={`ml-3 text-${action === 'chat' ? 'xs' : 'sm'}`}>
                    {item.name}
                </p>
            </button>
        ))
    );

    const popoverVariants = {
        open: { opacity: 1, height: "auto",zIndex: 40, applyAtStart: { display: "block" }},
        closed: { opacity: 0, height: 0, applyAtEnd: { display: "none"}},
    };

    return(
        <motion.div
            className={`popover border border-zinc-700 bg-[#282a2c] absolute top-10 right-5 z-30 p-4 text-zinc-300 py-1 rounded poppins tracking-wider font-normal`}
            variants={popoverVariants}
            animate={isOpen ? 'open' : 'closed'}
            initial="closed"
            transition={{ duration: .3 }}
        >
            {renderOptions(action === 'chat' ? optionProfileChat : optionProfile)}
        </motion.div>
    )
}

export default PopOver