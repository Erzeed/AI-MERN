import mongoose from "mongoose";
import { randomUUID } from "crypto";

export type groupChatType = {
    userId: string,
    name: string,
    createAt: Date,
    chat: chatType[],
}

export type chatType ={
    role: string,
    content: string
}

const chatSchema = new mongoose.Schema<chatType>({
    role: { type: String, required: true },
    content: { type: String, required: true }
});


const groupChatSchema = new mongoose.Schema<groupChatType>({
    userId: { type: String, required: true},
    name: { type: String, required: true},
    createAt: { type: Date, required: true},
    chat: [chatSchema]
})

const ChatProfile = mongoose.model("Chat", groupChatSchema);

export default ChatProfile