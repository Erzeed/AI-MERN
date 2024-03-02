import mongoose from "mongoose";
import { randomUUID } from "crypto";

export type groupChatType = {
    userId: string,
    name: string,
    createAt: Date,
    chat: string[],
}

export type chatType ={
    id: string,
    role: string,
    content: string[]
}

const chatSchema = new mongoose.Schema<chatType>({
    id:{ type: String, default: randomUUID},
    role: { type: String, required: true},
    content: [{type: String, required: false}]
})

const groupChatSchema = new mongoose.Schema<groupChatType>({
    userId: { type: String, required: true},
    name: { type: String, required: true},
    createAt: { type: Date, required: true},
    chat: [chatSchema]
})

const chat = mongoose.model("Chat", groupChatSchema);

export default chat