const signupUser = async(user_id, password) => {
  try {;
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id,password}),
    });
    const result = await response.json();
    return result.isSuccess;
  } catch (error) {
    console.error("Error singup in user:", error);
    return false;
  }
};

// 로그인 버튼 이벤트
document.getElementById('signup-button').addEventListener('click', async () => {
  try{
    const user_id = document.getElementById('signup-user_id').value;
    const password = document.getElementById('signup-password').value;
    console.log(user_id,password);
    const result = await signupUser(user_id, password);
    if(result){
        window.location.href = "/login";
    }else{
      alert("아이디 비밀번호를 확인해주세요");
      document.getElementById('signup-user_id').value = '';
      document.getElementById('signup-password').value = '';
    }
  }catch(err){
    console.error(err);
    alert("아이디 비밀번호를 확인해주세요");
    document.getElementById('signup-user_id').value = '';
    document.getElementById('signup-password').value = '';
  }
});
