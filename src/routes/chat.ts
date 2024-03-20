import OpenAI from 'openai';
import express, { Request, Response } from "express";
import { veryfyToken } from "../middleware/auth";
import { chatCompletionValidator, updateNameChatValidator, validate } from "../utils/validation";
import ChatProfile from "../model/chat";
import "dotenv/config";
import { param } from 'express-validator';

const router = express.Router();


router.post("/gpt", validate(chatCompletionValidator), veryfyToken, async (req: Request, resp:Response) => {
    try {
        const { idProfile, role, content } = req.body;
        // Check if group chat exists for the user
        let groupChat = await ChatProfile.findOne({_id: idProfile});
        if(!groupChat) {
            groupChat = new ChatProfile({
                    userId: req.id,
                    name: content.slice(0,20),
                    createAt: new Date(),
                    chat: [],
                });
            await groupChat.save();
        }
        // grab chats of user
        groupChat.chat.push({ content: content, role: "user" });
        // send all chats with new one to openAI API
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

router.get("/chat-profile", veryfyToken, async (req: Request, resp: Response) => {
    try {
        const userId = req.id
        // Query the database for documents with the specified userId
        const chats = await ChatProfile.find({ userId });
        // If no documents found, send an appropriate response
        if (!chats || chats.length === 0) {
            return resp.status(404).json({ message: 'No chats found for the specified user.' });
        }
        // Send the retrieved documents as a response
        resp.status(200).json(chats);
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "ERROR", cause: error.message });
    }
})

router.get("/gpt/:id", 
    [param("id").notEmpty().withMessage("ID is required")],
    veryfyToken, async (req: Request, resp: Response) => {
    try {
        const id = req.params.id.toString();
        // Query the database for documents with the specified userId
        const chats = await ChatProfile.findById(id);
        // If no documents found, send an appropriate response
        if (!chats) {
            return resp.status(404).json({ message: 'No chats found.' });
        }
        // Send the retrieved documents as a response
        resp.status(200).json(chats);
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "ERROR", cause: error.message });
    }
})

router.delete("/:id", 
    [param("id").notEmpty().withMessage("ID is required")],
    veryfyToken, async (req: Request, resp:Response) => {
    try {
        const { id } = req.params;
        const deleteData = await ChatProfile.findOneAndDelete({_id: id});
        if (!deleteData) {
            return resp.status(404).json({ message: "Data tidak ditemukan" });
        }
        resp.status(200).json({message: "Hapus data berhasil"})
    } catch (error) {
        console.log(error)
        resp.status(500).json("Something is wrong")
    }
})

router.patch("/:id", 
    validate(updateNameChatValidator),
    veryfyToken, async (req: Request, resp:Response) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            // Use the correct model for group chats
            const updatedGroupChat = await ChatProfile.findOneAndUpdate(
                { _id: id },
                { $set: { name } }, // Update only the "name" field
                { new: true } // Return the updated document
            );
            if (!updatedGroupChat) {
                return resp.status(404).json("Group chat not found");
            }
            resp.status(200).json(updatedGroupChat);
        } catch (error) {
            console.error(error);
            resp.status(500).json("Internal Server Error"); // More specific error message
        }
})

export default router
