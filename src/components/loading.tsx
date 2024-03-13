import Lottie from 'react-lottie';
import loading  from "../assets/loading.json";
import { configAnimation } from "../utils/constant";

const Loading = () => {
    return (
        <div className="loading">
            <Lottie 
                options={configAnimation(loading)}
                height={50}
                width={50}
            />
        </div>
    )
}

export default Loading