import bg from "../assets/bg-home.webp";
import Lottie from 'react-lottie';
import lottiAnimation  from "../assets/lotttie.json";

const Landing = () => {

    const configLottie = {
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: lottiAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return(
        <div className="home h-[100vh] w-full dark:text-white">
            <section className="hero w-full flex">
                <div className="left w-2/3">
                    <div className="txt px-10 w-full pt-20">
                        <h1 className="font-semibold tracking-tighter text-[55px]">Start your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Generative Ai</span> Business in Minutes!</h1>
                    </div>
                    <div className="desc rajdhani px-10 w-3/4 pt-3 space-y-3 dark:text-gray-300 tracking-wider text-sm">
                        <p>Creative Ai-driver content generation tools that assist content creators in generating articles, product description, or marketing copy</p>
                        <p>This can be offered as a SaaS solution where users pay for the number of words or contents pieces generated</p>
                        <div className="flex pt-3 text-white kode-mono">
                            <div className="btn color-gradient w-28 h-9 rounded-full p-[1px] flex justify-center items-center">
                                <button type="button" className="text-xs color-gradient-parent w-full h-full rounded-full">Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right w-1/3 flex justify-start">
                    <Lottie 
                        options={configLottie}
                        height={500}
                        width={500}
                    />
                </div>
            </section>
            <img src={bg} className="absolute top-0 left-0 -z-10" />
        </div>
    )
}

export default Landing
