import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import "../components/Button.css";
import { useCookies } from 'react-cookie'
import axios from "axios";

function Navigation(props) {
  const [Acookie, qwer, Aremove] = useCookies('access-token') 
  const [em, asdf, Eremove] = useCookies('e') 
  const [user, setUser] = useState({})

 const logout = () => {
    Aremove('access-token')
    Eremove('e')
 }

useEffect(() => {
  axios({
    url: "/uesrs/",
    method: "get",
  })
  .then(res => {
    setUser(res.data.filter(val => val.email === em.e)[0])
  })
  .catch(err => {
    console.log(err.response)
  })
}, [em])

  return (
    <div  className="nav">
      <div className="navTitle">
        <Link to={"/"}>우리들만의 플리마켓, 샤플</Link>
      </div>
      {
        Acookie['access-token'] === undefined ? (
          <div className="navLogin">
            <button>
            <Link to={"/Login"}>Login</Link>
            </button>
          </div>
        ) : (
          <>
            <button className="navLogin">
              <Link to={"/MyPage"}>{user !== undefined && user.nickname}</Link>
            </button>
            <button onClick={logout} className="navLogin">
              <Link>로그아웃</Link>
            </button>
          </>
        )
      }
    </div>

  );
}

export default Navigation;