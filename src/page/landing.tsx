import bg from "../assets/bg-home-1.webp";
import Lottie from 'react-lottie';
import lottiAnimation  from "../assets/lotttie.json";
import lottiAI  from "../assets/Ai.json";
import { cardData } from "../utils/constant";

const Landing = () => {

    const configAnimation = (data: object) => {
        const configLottie = {
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: data,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }
        return configLottie
    }

    return(
        <div className="home w-full dark:text-white md:px-10 px-4">
            <section className="hero w-full md:flex h-[90vh]">
                <div className="left w-full md:w-2/3 flex flex-col justify-center  h-full space-y-4">
                    <div className="txt w-full">
                        <h1 className="font-semibold tracking-tighter md:text-[55px] text-2xl leading-snug">Start your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Generative Ai</span> Business in Minutes!</h1>
                    </div>
                    <div className="desc rajdhani lg:w-3/4 md:w-1/2 pt-3 space-y-3 dark:text-gray-300 tracking-wider text-sm">
                        <p>Creative Ai-driver content generation tools that assist content creators in generating articles, product description, or marketing copy</p>
                        <p>This can be offered as a SaaS solution where users pay for the number of words or contents pieces generated</p>
                        <div className="flex pt-3 text-white kode-mono">
                            <div className="btn color-gradient w-28 h-9 rounded-full p-[1px] flex justify-center items-center">
                                <button type="button" className="text-xs color-gradient-parent w-full h-full rounded-full">Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right hidden lg:w-1/3 md:flex justify-start md:w-1/2">
                    <Lottie 
                        options={configAnimation(lottiAnimation)}
                        height={500}
                        width={500}
                    />
                </div>
            </section>
            <img src={bg} className="fixed top-0 left-0 -z-10 h-full w-full" />
            <section className="desc rajdhani w-full flex flex-col items-center mb-16">
                <div className="title w-full md:w-1/2 text-center">
                    <h1 className="text-[40px]">How <span className="kode-mono bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Easy Ai</span> Empower Your Business</h1>
                    <p className="text-sm text-zinc-400 font-medium tracking-wide">Discover how we simplify the process of creating your own AI-as-a-service platform with its advanced, user friendly feature.</p>
                </div>
                <div className="card-content px-10 py-10 flex flex-wrap gap-3">
                    {cardData?.map((item,index) => (
                        <div key={index} className="card relative w-[350px] border border-zinc-400 text-white px-8 py-8 flex flex-col items-center rounded-3xl h-56 justify-between backdrop-blur-md bg-purple-950 bg-opacity-30">
                            <span className="p-2 rounded-md bg-black text-[40px]">{item.icons}</span>
                            <h1 className="text-xl font-semibold tracking-wide">{item.name}</h1>
                            <p className="text-[13px] text-zinc-400 text-center font-medium tracking-wide">{item.desc}</p>
                            <div className="absolute top-9 -left-[1px] h-36 w-[350px] border-x border-purple-950"></div>
                        </div>
                    ))}
                    <svg width="0" height="0">
                        <linearGradient id="purple-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop stopColor="#7e5ef7" offset="9%" />
                            <stop stopColor="#bf5ff9" offset="100%" />
                        </linearGradient>
                    </svg>
                </div>
            </section>
            <section className="relative flex w-full justify-center md:px-10 mb-10">
                <div className="content w-full border border-purple-800 bg-purple-950 bg-opacity-30 backdrop-blur-sm md:p-10 p-2 h-96 rounded-3xl text-center flex flex-col justify-center items-center space-y-5">
                    <h1 className="md:text-[35px] md:leading-snug text-sm">Ready to Kickstart your AI-as-a-Service Business</h1>
                    <button type="button" className="w-36 text-sm rounded h-10 bg-gradient-to-r from-pink-500 to-yellow-500">Start Now</button>
                </div>
                <div className="animation hidden md:flex absolute bottom-[190px] right-10 -z-10">
                    <Lottie 
                        options={configAnimation(lottiAI)}
                        height={500}
                        width={500}
                        speed={.7}
                    />
                </div>
            </section>
            <section className="footer rajdhani px-10 border-t border-purple-950 flex justify-center h-10 items-center">
                <p className="text-sm text-zinc-300 tracking-wider font-medium">@2024 <span className="kode-mono">Easy AI</span> All rights reserved</p>
            </section>
        </div>
    )
}

export default Landing
