// index.js
import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { setupSocketIO } from './socketio.js'; // socketio.js에서 가져오기
import { init } from './db/index.js';
import { signupRouter } from './routes/signup.js';
import { loginRouter } from './routes/login.js';
import { LoginCheck } from './middlewares/logincheck.js';
import { roomRouter } from './routes/room.js';
import { chatRouter } from './routes/chat.js';

await init();

const app = express();
const port = process.env.PORT || 3000;


// 미들웨어 설정
app.use(cors({
  origin : "http://localhost:3001",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/roomid",LoginCheck,roomRouter)
app.use("/chat",LoginCheck,chatRouter)
app.use('/signup',signupRouter);
app.use('/login',loginRouter);

// HTTP 서버 생성
const server = http.createServer(app);

// WebSocket 서버 설정
setupSocketIO(server,app);

// 서버 시작
server.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});