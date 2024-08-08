import db from "../../db/index.js";

export async function ChatDataSaveRepository(uuid,message,room_id){
    try{
        await db.Chat.create({
            sender_id:uuid,
            message,
            room_id,
        });
        return true
    }catch(err){
        console.error(err);
        return false;
    }
}

export async function ChatDataGetRepository(roomId){
    try{
        const chatData = await db.Chat.findAll({
            where: { room_id: roomId },
            order: [['createdAt', 'ASC']]
        });
        return chatData;
    }catch(err){
        console.error(err);
        return false;
    }
}