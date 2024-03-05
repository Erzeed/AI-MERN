import { useEffect, useState } from "react";
import logo from "../assets/ei-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { useMutation, useQueryClient } from "react-query";
import api from "../utils/api";
import { toast } from "react-toastify";

const Header = () => {
    const [showBackground, setShowBackground] = useState(false);
    const { isLogin } = useAuthContext()
    const TOP_OFFSET = 100;

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const mutation = useMutation(api.SignOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            toast.success("Sign out succes")
            navigate("/login")
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const onHandleSignOut = () => {
        mutation.mutate()
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return(
        <div className={`${showBackground && "bg-[#1e1f26]"} sticky z-20 top-0 left-0 flex h-16 md:px-10 px-3 py-4 justify-between dark:text-white`}>
            <div className="logo flex h-full items-center">
                <Link to="/">
                    <img src={logo} className="h-12 w-12 object-cover" />
                </Link>
                <h1 className="md:text-xl text-sm tracking-wide pl-2">Easy Ai</h1>
            </div>
            <div className="space-x-2 hidden md:flex">
                { isLogin ? (
                    <div className="btn color-gradient w-28 h-9 rounded-full p-[1px] flex justify-center items-center">
                        <button type="button" onClick={onHandleSignOut} className="text-xs color-gradient-parent w-full h-full rounded-full">Sign Out</button>
                    </div>
                ): (
                    <>
                        <div className="btn color-gradient w-24 h-9 rounded-full p-[1px] flex justify-center items-center">
                            <Link to="/login" className="text-xs bg-black w-full h-full rounded-full flex justify-center items-center">Login</Link>
                        </div>
                        <div className="btn color-gradient w-28 h-9 rounded-full p-[1px] flex justify-center items-center">
                            <button type="button" className="text-xs color-gradient-parent w-full h-full rounded-full">Get Started</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header