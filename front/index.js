// index.js
import express from 'express';
import path from 'path'; // path 모듈 추가
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url); // 현재 파일의 URL을 파일 경로로 변환
const __dirname = path.dirname(__filename); // 파일 경로에서 디렉토리 경로를 추출

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views')); // 예: 'my_views'로 디렉토리 변경
app.use(express.static('public'));

// 기본 경로에 대한 간단한 응답
app.get('/login', (req, res) => {
  res.render('login');
});
app.get("/signup",(req,res)=>{
  res.render('signup')
})

app.get('/chat', (req, res) => {
  res.render('chatcheck');
});
 
app.get('/chat/:id', (req, res) => {
  res.render('chat');
});

// 서버 시작
app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});