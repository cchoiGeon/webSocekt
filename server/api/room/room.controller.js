import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { Op } from 'sequelize';
import db from "../../db/index.js";

export async function GetRoomId(req, res) {
    try {
        const uuid = res.locals.uuid;
        if(!uuid){
            return res.send(response(status.BAD_REQUEST));
        }
        const isExistUser = await db.Room.findOne({
            where: {
              [Op.or]: [
                { user1_id: uuid },
                { user2_id: uuid },
              ],
            },
        });
        if(!isExistUser){
            return res.send(response(status.BAD_REQUEST));
        }
        return res.send(response(status.SUCCESS,isExistUser.id));
    } catch (err) {
        console.error(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}