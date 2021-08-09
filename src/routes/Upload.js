import React, { useState, useRef, useEffect } from "react";
import "./Upload.css";
import "../components/Button.css";
import axios from "axios"
import FileUpload from "../components/FileUpload";
import {Form, Input} from "antd";

import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const { TextArea } = Input;

function Upload(props){
  console.log(props);

  const [Price, setPrice] = useState("")
  const [Contact, setContact] = useState("")
  const [Content, setContent] = useState("")
  const [images, setImages] = useState([])
  const image = useRef([])
  const [Acookie] = useCookies(['access-token'])
  const history = useHistory()

  // 페이지 렌더링 시 로그인 확인 (토큰으로)
  useEffect(() => {
    if(Acookie['access-token'] === undefined) {
      alert("로그인을 먼저 하세요")
      history.replace('/login')
      return
    }
  }, [])

  //각 핸들러 = 인풋으로 상태 변경될 때마다 set
  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value)
  }

  const contactChangeHandler = (event) => {
    setContact(event.currentTarget.value)
  }

  const contentChangeHandler = (event) => {
    setContent(event.currentTarget.value)
  }
  
  const updateImages = (newImages) => {
    setImages(newImages)
  }

  // 게시물 업로드
  const submitHandler = () => {
    // posts에 게시글 post 요청 (1)
    axios({
      url: "/posts/",
      method: "POST",
      headers: {
        'Authorization': `Bearer ${Acookie['access-token']}`
      },
      data: {
        price: Price,
        contact: Contact,
        content: Content
      }
    })
    // (1) 성공 후 응답
    .then(function(response) {
      alert("업로드 되었습니다.")
      // posts에 get 요청(2)
        axios({
          method: 'get',
          url: '/posts/',
        })
        // (2) 성공 후 응답
        .then(res => {
            // 이미지들을 formData에 추가
            image.current.forEach(val => {
              let formData = new FormData();
              // get한 post에서 post_id를 가져와 formData에 추가
              formData.append("post_id", res.data[res.data.length - 1].id)
              formData.append("image", val)
              // photos에 post 요청 (3)
              axios({
                method: 'POST',
                url: "/photos/",
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${Acookie['access-token']}`
                },
                data: formData
              })
                  // (3) 성공 후 응답
                  .then(response => {
                      console.log(response)
                  })
                  // (3) 실패 오류
                  .catch(err => {
                      console.log(err.response)
                  })
              })
            })
            console.log(image.current)
          // 메인 페이지로 이동
          props.history.push("/");
        })
        // (1) 실패 오류
        .catch(function(error){
          console.log(error.response)
          // 입력값이 빠진 경우
          if ( !Price || !Contact || !Content){
            alert("모든 값을 입력해주세요.")
          }
          // 입력값이 있지만 실패한 경우
          else{
            alert("업로드에 실패했습니다.")
          }
        });
      }

  // dropzone으로 들어오는 이미지 저장 함수 (이미 있는 이미지에 얹음)
  const handle = (files) => {
    image.current = [...image.current, ...files]
  }

  // 이미지 삭제 함수
  const delHandle = (img) => {
    console.log(image.current)
    const currentIndex = image.current.indexOf(img);
    let newImages = [...image.current]
    newImages.splice(currentIndex, 1)
    image.current = newImages
  }
  
  return (
    <div className="uploadContainer">
      <h3 className="uploadTitle">Upload</h3>
      <Form onSubmit={submitHandler} className="uploadForm">

        <FileUpload delHandle={delHandle} handle={handle} refreshFunction={updateImages} />
        <br/><br/>
        <label>가격</label><br/>
        <Input className="txtBoxS"
          onChange={priceChangeHandler} value={Price}
        />
        <br/><br/>
        <label>연락처</label><br/>
        <Input className="txtBoxS"
          onChange={contactChangeHandler} value={Contact}
        />
        <br/><br/>
        <label>제품 정보</label><br/>
        <TextArea className="txtBoxL"
          onChange={contentChangeHandler} value={Content}
        />
        <br/><br/>
        <Input
          type="submit"
          value="업로드"
          onClick={submitHandler}
        />
        </Form>
      </div>
  );
}

export default Upload;