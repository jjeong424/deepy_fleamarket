import React, {useState} from "react";
import "./Login.css";
import "../components/Button.css";
import LinkButton from "../components/LinkButton";
import {Input, Form} from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";

function Login(props) {
  console.log(props);
  const [Acookie, setAcookie] = useCookies(['access-token'])
  const [Em, setE] = useCookies('e')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailChangeHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const submitHandler= () => {
    axios.post("/accounts/login/",
    {
      email: email,
      password: password
    })
    .then(function(response){
      console.log(response.data)
      if(response.data.message === "fail") throw new Error("에러")
      setAcookie('access-token', response.data.token, {expires: new Date(Date.now() + 1000 * 60 * 60 * 2)})
      setE('e', email, {expires: new Date(Date.now() + 1000 * 60 * 60 * 2)})
      props.history.push("/");
    })
    .catch(function(error){
      alert("이메일과 비밀번호를 확인해주세요.")
    });
  }

  return (
    <section>
      <div className="LoginContainer">
        <h2 className="LoginTitle">로그인</h2>
        <div className="RegisterButton">
          {LinkButton("/Register", "회원가입")}
        </div>
        <Form onSubmit={submitHandler} className="loginForm">
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
      <Input
          type = "submit"
          value = "로그인"
          onClick={submitHandler}
      />
        </Form>
      </div>
    </section>
  );
}

export default Login;