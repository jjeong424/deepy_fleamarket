import React, {useState, useEffect, useRef} from 'react'
import './Register.css'
import axios from "axios";
import { Input, Form } from "antd";

import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const EditMy = (props) => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nickname, setNickname] = useState("")
    const [user, setUser] = useState({})
    const history = useHistory()
    const [em] = useCookies('e')
    const formData = useRef()
    const [Acookie] = useCookies('access-token')

    useEffect(() => {
        axios({
            url: '/uesrs/',
            method: 'get'
        })
        .then(res => {
            setUser(res.data.filter(val => val.email === em.e)[0])
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    useEffect(() => {
      setUserName(user.username)
      setNickname(user.nickname)
      setEmail(user.email)
      
      let request = new XMLHttpRequest()
      formData.current = new FormData()

      request.responseType = "blob";
      request.onload = () => {
        const file = new File([request.response], 'default.png')
        formData.current.append('icon', file)
      }
      request.open("GET", user.icon)
      request.send()
    }, [user])
  
    const userNameChangeHandler = (event) => {
        setUserName(event.currentTarget.value)
    }
  
    const emailChangeHandler = (event) => {
      setEmail(event.currentTarget.value)
    }
  
    const passwordChangeHandler = (event) => {
      setPassword(event.currentTarget.value)
    }

    const nicknameChanegeHandler = (event) => {
      setNickname(event.currentTarget.value)
    }
  
  const submitHandler= () => {
    formData.current.append('email', email)
    formData.current.append('username', userName)
    formData.current.append('nickname', nickname)
    formData.current.append('password', password)
    axios({
       url: "/uesrs/"+user.id+"/",
        method: 'put',
       data: formData.current,
        headers: {
            'Authorization': `Bearer ${Acookie['access-token']}`
        }
    })
    .then(function (response) {
      alert("?????? ?????? ??????")
      history.push("/");
    })
    .catch(function (error) {
      console.log(error.response)
        alert("??????????????????.")
    });
  }
    
    return (
      <div className="RegisterContainer">
        <h3 className="RegisterTitle">Edit My infor</h3>
        <div className="RegisterForm">
          <Form onSubmit={submitHandler}>
           <br/><br/>
           <label>??????</label><br/>
           <Input
            type = "name"
            value={userName}
            onChange={userNameChangeHandler}
          /><br/>
          <label>?????????</label><br/>
        <Input
            type = "email"
            value={email}
            onChange={emailChangeHandler}
        /><br/>
        <label>????????????</label><br/>
        <Input
            type = "password"
            value={password}
            onChange={passwordChangeHandler}
        /><br/>
        <label>?????????</label><br/>
        <Input
            type = "nickname"
            value={nickname}
            onChange={nicknameChanegeHandler}
        /><br/>
        <Input
            type = "submit"
            value = "????????????"
            onClick={submitHandler}
        />
        </Form>
        </div>
      </div>
    )
}

export default EditMy