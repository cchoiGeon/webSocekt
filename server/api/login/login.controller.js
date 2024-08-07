import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { LoginDTO } from "./login.dto.js";
import { LoginService } from "./login.service.js";

export async function LoginLogic(req, res) {
    try {
        const { user_id, password } = req.body;

        if (!user_id || !password) {
            return res.send(response(status.EMPTY_DATA));
        }

        const LoginData = LoginDTO(user_id, password);

        const result = await LoginService(LoginData);

        if (result.code == 401) {
            return res.send(response(status.USER_NOT_FOUND));
        }
        if(result.code == 403){
            return res.send(response(status.PASSWORD_MISMATCH));
        }
        if(result.code == 500){
            return res.send(response(status.INTERNAL_SERVER_ERROR));
        }

        res.cookie('accessToken', result.accessToken, { httpOnly: true, secure: false});
        res.cookie('refreshToken', result.refreshToken, { httpOnly: true, secure: false});

        console.log("토큰 생성 완료");

        return res.send(response(status.SUCCESS));
    } catch (err) {
        console.error(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}