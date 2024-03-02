import app from "./app";
import "dotenv/config";
import { connectToDatabase } from "./db/connection";

//connections and listeneres
const PORT = process.env.PORT || 5000;

connectToDatabase()
    .then(() => {
        app.listen(PORT, () =>
            console.log("Server Open & Connected To Database ")
        );
    })
    .catch((err) => console.log(err));