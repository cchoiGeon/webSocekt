import { Server } from 'socket.io';

export function setupSocketIO(server, app) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3001', // 허용할 출처 설정
      methods: ['GET', 'POST'], // 허용할 HTTP 메서드
      credentials: true, // 인증 정보 허용
    },
    path: '/socket.io',
  });

  // io 인스턴스를 app 객체에 저장
  app.set('io', io);

  // /chat 네임스페이스 설정
  const chatNamespace = io.of('/chat');
  chatNamespace.on('connection', (socket) => {
    console.log('채팅 네임스페이스에 새로운 클라이언트 접속:', socket.id);

    // 특정 방에 참가
    socket.on('join', (roomId) => {
      console.log(`사용자 ${socket.id}가 방 ${roomId}에 참가`);
      socket.join(roomId);
    });

    // 특정 방으로 메시지 전송
    socket.on('chat message', ({ roomId, message }) => {
      console.log(`방 ${roomId}에서 메시지 수신: ${message}`);
      chatNamespace.to(roomId).emit('chat message', { id: socket.id, message });
    });

    socket.on('disconnect', () => {
      console.log('채팅 네임스페이스 클라이언트 접속 해제:', socket.id);
    });
  });
}
