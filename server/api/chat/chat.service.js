import { ChatDataGetRepository, ChatDataSaveRepository } from "./chat.repository.js";

export async function ChatDataSaveService(uuid,message,roomId){
    try{
        const isSave = await ChatDataSaveRepository(uuid,message,roomId);
        if(!isSave){
            return { code:401 ,success: false, message: '채팅 저장 중 오류 발생' };
        }
        return true;
    }catch(err){
        console.error(err);
        return { code:500 ,success: false, message: '서버 오류' };
    }
}

export async function ChatDataGetService(uuid,roomId){
    try{
        const chatData = await ChatDataGetRepository(roomId);

        if(!chatData){
            return { code:401 ,success: false, message: '채팅 데이터 없음' };
        }
        const formattedData = chatData.map(chat => ({
            id: chat.id,
            message: chat.message,
            sender: chat.sender_id === uuid ? 'sent' : 'received'
        }));
        return formattedData;
    }catch(err){
        console.error(err);
        return { code:500 ,success: false, message: '서버 오류' };
    }
}