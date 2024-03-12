import { TypeAnimation } from "react-type-animation";

type props = {
    username: string
}
const NewChatAnimate = ({username}: props) => {

    const typeStyle = {
        fontSize: '56px',
        background: 'linear-gradient(90deg, rgba(255,86,190,1) 9%, rgba(181,86,255,1) 62%)',
        filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff56be',endColorstr='#b556ff',GradientType=1)",
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    }

    const getWelcomeText = () => {
        const hour = new Date().getHours();
    
        if (hour >= 5 && hour < 12) {
            return "Selamat pagi ,";
        } else if (hour >= 12 && hour < 18) {
            return "Selamat siang ,";
        } else if (hour >= 18 && hour < 22) {
            return "Selamat malam ,";
        } else {
            return "Hello ,";
        }
    }

    return(
        <div className="welcome text-[56px] w-4/5 mx-auto">
            <h1 className="text-zinc-500">{getWelcomeText()}</h1>
            <TypeAnimation
                sequence={[ 1000, `${username}`, 1000, "Apa yang bisa saya bantu ?"]}
                speed={2}
                style={typeStyle}
                repeat={2}
            />
        </div>
    )
}

export default NewChatAnimate