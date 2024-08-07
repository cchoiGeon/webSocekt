const loginUser = async (user_id, password) => {
  try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 포함 설정
        body: JSON.stringify({user_id,password}),
      });
      const result = await response.json();
      console.log(result);
      return result.isSuccess;
  } catch (error) {
      console.error("Error logging in user:", error);
      return false;
  }
};

// 로그인 버튼 이벤트
document.getElementById('login-button').addEventListener('click', async () => {
  try{
    const user_id = document.getElementById('login-user_id').value;
    const password = document.getElementById('login-password').value;
    const result = await loginUser(user_id, password);
    if(result){
        window.location.href = "/chat";
    }else{
      alert("아이디 비밀번호를 확인해주세요");
      document.getElementById('login-user_id').value = '';
      document.getElementById('login-password').value = '';
    }
  }catch(err){
    console.error(err);
    alert("아이디 비밀번호를 확인해주세요");
    document.getElementById('login-user_id').value = '';
    document.getElementById('login-password').value = '';
  }
});
