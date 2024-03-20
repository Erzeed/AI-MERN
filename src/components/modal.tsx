import { useEffect, useState } from "react"

type props = {
    openModal: boolean,
    onCloseModal: () => void,
    nameAction: string | undefined,
}

const Modal = ({ openModal, onCloseModal, nameAction }: props) => {
    const [isConfirm, setIsConfirm] = useState<string>()

    const onHandleConfirm = () => {
        console.log(isConfirm)
    }

    useEffect(() => {
        onHandleConfirm()
    }, [isConfirm])

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
                    <h1 className="text-2xl">{nameAction == "rename" ? "Edit Nama ?" : "Hapus chat ?"}</h1>
                    {nameAction == "rename" ? (
                        <form>
                            <input 
                                type="text" 
                                placeholder="Rename" 
                                className="w-full h-12 rounded-xl bg-zinc-800 px-3 focus:outline-none text-sm"
                            />
                        </form>
                    ):(
                        <p className="text-sm leading-6 text-zinc-300 tracking-wide">Anda tidak akan melihat percakapan ini lagi di sini. Tindakan ini juga akan menghapus aktivitas terkait seperti perintah, respons, dan masukan dari Aktivitas Aplikasi Anda.</p>
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
                            onClick={() => setIsConfirm(nameAction == "rename" ? "Edit" : "Hapus")}
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