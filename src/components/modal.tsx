import { useState } from "react"
import { useMutation, useQueryClient } from "react-query";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type props = {
    openModal: boolean,
    onCloseModal: () => void,
    nameAction: string | undefined,
    idDelChat: string | undefined
}

const Modal = ({ openModal, onCloseModal, nameAction, idDelChat }: props) => {
    const [nameChat, setNameChat] = useState<string>("")
    const queryClient = useQueryClient();
    const { idChat } = useParams();
    const navigate = useNavigate()

    const {mutate} = useMutation(api.deleteChat, {
        onSuccess: async () => {
            toast.success("Berhasil Dihapus")
            await queryClient.refetchQueries("fetchDataProfile")
            onCloseModal()
            idChat == idDelChat && navigate("/d")
        },
        onError: (error) => {
            console.log(error)
            toast.error("Gagal menghapus")
        }
    })

    const { mutate: updateNameChatMutation } = useMutation(
        async ({ nameChat, idDelChat }: { nameChat: string, idDelChat: string}) => {
          // Mutation function
            await api.updateNameChat(nameChat, idDelChat);
        },
        {
            onSuccess: async () => {
                toast.success("Berhasil Update Name");
                await queryClient.refetchQueries("fetchDataProfile");
                onCloseModal();
            },
            onError: (error) => {
                console.log(error);
                toast.error("Gagal Update Name");
            },
        }
    );

    const onHandleConfirm = () => {
        if(nameAction == "delete") {
            idDelChat && mutate(idDelChat);
        }else if(nameAction === "rename" && nameChat?.length > 0) {
            idDelChat && updateNameChatMutation({ nameChat, idDelChat})
        }
    }

    return(
        <div className={`${
            openModal ? "scale-100": "scale-0 delay-200"
        } modal fixed top-0 left-0 poppins h-svh w-svw flex justify-center items-center bg-black/10 z-30`}
        >
            <div className={`${
                openModal ? "scale-100": "scale-0"
            } content bg-[#202124] w-1/3 h-60 p-5 rounded-2xl transition ease-in-out delay-100 duration-200`}
            >
                <div className="flex flex-col h-full justify-between font-light">
                    <div className="judul border-b border-zinc-700 h-10">
                        <h1 className="text-2xl">{nameAction == "rename" ? "Edit Nama ?" : "Hapus chat ?"}</h1>
                    </div>
                    {nameAction == "rename" ? (
                        <form>
                            <input 
                                type="text" 
                                placeholder="Rename" 
                                className="w-full h-12 rounded-xl bg-zinc-800 px-3 focus:outline-none text-sm"
                                onChange={(event) => setNameChat(event.target.value)}
                            />
                        </form>
                    ):(
                        <p className="text-sm leading-6 text-zinc-400 tracking-wide">Anda tidak akan melihat percakapan ini lagi di sini. Tindakan ini juga akan menghapus aktivitas terkait seperti perintah, respons, dan masukan dari Aktivitas Aplikasi Anda.</p>
                    )}
                    <div className="btn flex justify-end text-sm tracking-wide text-purple-800 font-medium">
                        <button 
                            type="button"
                            className="hover:bg-purple-500/20 rounded-full py-1.5 px-4 hover:text-purple-300"
                            onClick={onCloseModal}
                        >
                            Batal
                        </button>
                        <button 
                            type="button"
                            className="hover:bg-red-500/20 rounded-full py-1.5 px-4 hover:text-red-500"
                            onClick={onHandleConfirm}
                        >
                            {nameAction == "rename" ? "Edit" : "Hapus"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal