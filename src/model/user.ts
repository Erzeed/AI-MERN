import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

export type UserType = {
    email: string,
    password: string,
    username: string,
    groupchat: string[],
}

const userSchema = new mongoose.Schema<UserType>({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: false},
    username: { type: String, required: true},
    groupchat: [{type: String, required: false}]
})

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 8)
    }
    next();
})

const user = mongoose.model<UserType>("User", userSchema);

export default user;