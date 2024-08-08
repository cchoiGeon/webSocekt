document.addEventListener('DOMContentLoaded', async () => {
    try {
        // roomid 존재 여부 확인
        const response = await fetch('http://localhost:3000/roomid', {
            credentials: 'include', // 쿠키 포함 설정
        });
        const roomidData = await response.json();
        if (!roomidData.isSuccess) {
            alert("잘못된 경로입니다.");
            window.location.href = "/";
            return;
        }

        // 채팅 내역 가져오기
        const response2 = await fetch(`http://localhost:3000/chat/${roomidData.result}`, {
            credentials: 'include', // 쿠키 포함 설정
        });
        const chatData = await response2.json();
        console.log(chatData);
        if (chatData.isSuccess) {
            // 채팅 데이터를 채팅 창에 추가
            chatData.result.forEach(chat => {
                addMessageToChat(chat.message, chat.sender);
            });

            const checkJsCompleteEvent = new Event('checkJsComplete');
            document.dispatchEvent(checkJsCompleteEvent);
        } else {
            alert("채팅 데이터를 불러오는 중 오류가 발생했습니다.");
        }
    } catch (err) {
        console.error(err);
        alert("서버와의 통신 중 오류가 발생했습니다.");
    }
});

// 채팅창에 메시지 추가하는 함수
function addMessageToChat(message, type) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', type);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
