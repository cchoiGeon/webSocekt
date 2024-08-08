document.addEventListener('DOMContentLoaded', async () => {
    try{
        const response = await fetch('http://localhost:3000/roomid',{
            credentials: 'include', // 쿠키 포함 설정
        });
        const result = await response.json();
        if(result.isSuccess){
            window.location.href = `/chat/${result.result}`
        }
        if(result.code == "403"){
            alert("토큰을 재발급 받아주세요");
            window.location.href = "/login"
        }
        if(result.code == "404"){
            alert("채팅방이 존재하지 않습니다.");
        }
    }catch(err){
        console.error(err);
    }
});
