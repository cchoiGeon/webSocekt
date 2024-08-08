import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { ChatDataGetService, ChatDataSaveService } from "./chat.service.js";

export async function ChatDataSaveLoic(req, res) {
    try {
        const uuid = res.locals.uuid;
        if(!uuid){
            return res.send(response(status.BAD_REQUEST));
        }

        const {message,roomId} = req.body;
        if(!message || !roomId){
            return res.send(response(status.EMPTY_REQUEST_BODY));
        }

        const result = await ChatDataSaveService(uuid,message,roomId);

        if(result.code == 401){
            return { code:401 ,success: false, message: '채팅 저장 중 오류 발생' };
        }
        if(result.code == 500){
            return res.send(response(status.INTERNAL_SERVER_ERROR));
        }

        return res.send(response(status.SUCCESS));
    } catch (err) {
        console.error(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function ChatDataGetLogic(req,res){
    try{
        const uuid = res.locals.uuid;
        if(!uuid){
            return res.send(response(status.BAD_REQUEST));
        }

        const roomId = req.params.roomId;

        if(!roomId){
            return res.send(response(status.BAD_REQUEST));
        }

        const result = await ChatDataGetService(uuid,roomId);
        if(result.code == 401){
            return { code:401 ,success: false, message: '채팅창 데이터 존재 X' };
        }
        
        return res.send(response(status.SUCCESS,result));
    }catch(err){
        console.error(err);
        return 
    }
}