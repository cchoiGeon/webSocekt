document.addEventListener('DOMContentLoaded', async () => {
    try{
        const response = await fetch('http://localhost:3000/roomid',{
            credentials: 'include', // 쿠키 포함 설정
        });
        const result = await response.json();
        if(result.isSuccess){
            window.location.href = `/chat/${result.result}`
        }else{
            alert("채팅방이 존재하지 않습니다.");
        }
    }catch(err){
        console.error(err);
    }
});
