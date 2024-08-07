document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/roomid',{
        credentials: 'include', // 쿠키 포함 설정
    });
    const result = await response.json();
    if(result.isSuccess){
        const checkJsCompleteEvent = new Event('checkJsComplete');
        document.dispatchEvent(checkJsCompleteEvent);
    }else{
        alert("잘못된 경로입니다.");
    }
});
