import OpenAI from 'openai';
import express, { Request, Response } from "express";
import { veryfyToken } from "../middleware/auth";
import { chatCompletionValidator, validate } from "../utils/validation";
import ChatProfile from "../model/chat";
import "dotenv/config";

const router = express.Router();


router.post("/gpt", validate(chatCompletionValidator), veryfyToken, async (req: Request, resp:Response) => {
    try {
        const { idProfile, role, content } = req.body;
        // Check if group chat exists for the user
        let groupChat = await ChatProfile.findOne(idProfile);
        if(!groupChat) {
            groupChat = new ChatProfile({
                    userId: req.id,
                    name: content.slice(0,10),
                    createAt: new Date(),
                    chat: [],
                });
            await groupChat.save();
        }
        // grab chats of user
        groupChat.chat.push({ content: content, role: "user" });
    
        // // send all chats with new one to openAI API
        const openai = new OpenAI({
            apiKey: process.env.KEYGPT,
            organization: process.env.ORGANIZATION_ID,
        });
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": role, "content": content}],
        });

        // Save response to group chat entry in database
        groupChat.chat.push({role: "system", content: `${chatCompletion.choices[0].message.content}`});
        await groupChat.save();

        return resp.status(200).json(groupChat);
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "ERROR", cause: error.message });
    }
})

export default router
