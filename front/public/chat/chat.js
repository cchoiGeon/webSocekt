document.addEventListener('checkJsComplete', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
  
    // 현재 URL에서 방 ID 추출
    const roomId = new URL(location).pathname.split('/').at(-1);
  
    // 채팅 네임스페이스에 연결
    const chatSocket = io('localhost:3000/chat', { path: '/socket.io' });
  
    // 특정 방에 참가
    chatSocket.emit('join', roomId);
  
    // 채팅 네임스페이스로부터 메시지를 수신
    chatSocket.on('chat message', ({ id, message }) => {
      const messageType = chatSocket.id === id ? 'sent' : 'received';
      addMessageToChat(message, messageType);
    });
  
    // 채팅창에 메시지 추가하는 함수
    function addMessageToChat(message, type) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('chat-message', type);
      messageElement.textContent = message;
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    // Send 버튼 클릭 시 메시지 전송
    sendButton.addEventListener('click', async() => {
    const message = messageInput.value;
    if (message) {
        // 메시지를 특정 방으로 전송
        const response = await fetch('http://localhost:3000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 쿠키 포함 설정
          body: JSON.stringify({message,roomId}),
        });
        const result = await response.json();
        console.log(result);
        if(result.isSuccess){
          chatSocket.emit('chat message', { roomId, message });
          messageInput.value = ''; // 입력창 초기화 
        }else{
          alert("에러 발생");
          messageInput.value = ''; // 입력창 초기화 
        }
    }
    });
  
    // Enter 키를 눌렀을 때 메시지 전송
    messageInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        sendButton.click();
      }
    });
  });
  