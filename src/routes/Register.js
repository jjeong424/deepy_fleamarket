import React, { useState }from "react";
import "./Register.css";
import axios from "axios";
import { Input, Form } from "antd";

function Register(props){
  console.log(props);

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [nickname, setNickname] = useState("")

  const userNameChangeHandler = (event) => {
      setUserName(event.currentTarget.value)
  }

  const emailChangeHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const passwordCheckChangeHandler = (event) => {
    setPasswordCheck(event.currentTarget.value)
  }
  const nicknameChanegeHandler = (event) => {
    setNickname(event.currentTarget.value)
  }

const submitHandler= () => {
  axios.post("/accounts/signup/",
  {
    email: email,
    username:userName,
    nickname: nickname,
    password: password
  })
  .then(function (response) {
    alert("회원가입 성공")
    props.history.push("/Login");
  })
  .catch(function (error) {
    if (!userName || !email || !password || !passwordCheck || !nickname) {
      return alert("모든 값을 입력해주세요.")
    }
    else if (password !== passwordCheck) {
      return alert("비밀번호가 일치하지 않습니다.")
    }
    else {
      return alert("실패했습니다.")
    }
  });
}
  
  return (
    <div className="RegisterContainer">
      <h3 className="RegisterTitle">Register</h3>
      <div className="RegisterForm">
        <Form onSubmit={submitHandler}>
         <br/><br/>
         <label>이름</label><br/>
         <Input
          type = "name"
          value={userName}
          onChange={userNameChangeHandler}
        /><br/>
        <label>이메일</label><br/>
      <Input
          type = "email"
          value={email}
          onChange={emailChangeHandler}
      /><br/>
      <label>비밀번호</label><br/>
      <Input
          type = "password"
          value={password}
          onChange={passwordChangeHandler}
      /><br/>
      <label>비밀번호 확인</label><br/>
      <Input
          type = "password"
          value={passwordCheck}
          onChange={passwordCheckChangeHandler}
      /><br/>
      <label>닉네임</label><br/>
      <Input
          type = "nickname"
          value={nickname}
          onChange={nicknameChanegeHandler}
      /><br/><br/>
      <span>가입정보 변경은 서울대 플리마켓 오픈카카오톡을 통해서 문의해주세요.</span><br/><br/>
      <Input
          type = "submit"
          value = "가입하기"
          onClick={submitHandler}
      />
      </Form>
      </div>
    </div>
  );
}

export default Register;
