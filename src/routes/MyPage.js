import React, { useState, useEffect }from "react";
import "./ItemDetail.css";
import "./MyPage.css";
import axios from "axios";
import Movie from "../components/MainList";
//import { Input, Form } from "antd";
//import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Mypage = () => {
  const [posts, setPost] = useState([])
  const [users, setUser] = useState({})
  const [Em] = useCookies('e')

  //const history = useHistory()

  //const go = (Id) => {}

  useEffect(() => {
    axios({
      url: "/uesrs/",
      method: 'get'
    })
    .then(res => {
      res.data.forEach(val => {
        if(val.email === Em.e) {
          setUser(val)
          console.log(val)
        }
      })
    })
    .catch(err => {
      console.log(err.response)
    })
  }, [])

  useEffect(() => {
    axios({
      url: "/posts/",
      method: 'get'
    })
    .then(res => {
      console.log(res.data.filter(val => val.owner === users.id))
      setPost(res.data.filter(val => val.owner === users.id))
    })
    .catch(err => {
      console.log(err.response)
    })
  }, [users])

  return (
    <div>
      <div className="detailWrapper">
      <p className = "myupload">내가 업로드한 제품들</p>
      {/*<button onClick={() => history.push('/editmy')}>정보 수정하기</button>*/}
       <div className="imgsWrapper">
          {posts.length !== 0 && posts.map(post => (<Movie 
                  hello={true}
                  key={post.id}
                  id={post.id}
                  price={post.price}
                  image={post.images[0] !== undefined && post.images[0].image} />))}
        </div><hr/>
        <div className = "mypage_info">
          <p className = "myinfo">내 정보</p>
          <h2 ><img src={users.icon} alt={""}/>{users.username}</h2>
          <h2>이메일: {users.email}</h2>
          <h2>닉네임:{users.nickname}</h2>
          <h2>가입일: {new Date(users.date_joined).getFullYear()}년 {new Date(users.date_joined).getMonth()+1}월 {new Date(users.date_joined).getDate()}일</h2>
        </div>
      </div>
    </div>
  )
}

export default Mypage; 