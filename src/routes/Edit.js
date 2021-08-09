import React, { useState, useRef, useEffect } from "react";
import "./Upload.css";
import "../components/Button.css";
import axios from "axios"
import FileUpload from "../components/FileUpload";
import { Form, Input} from "antd";
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const { TextArea } = Input;

function Edit(props){
  console.log(props);

  const [Price, setPrice] = useState("")
  const [Contact, setContact] = useState("")
  const [Content, setContent] = useState("")
  const [images, setImages] = useState([])
  const [post, setPost] = useState({})
  const image = useRef([])
  const [Acookie] = useCookies(['access-token'])
  const history = useHistory()

  useEffect(() => {
    if(Acookie['access-token'] === undefined) {
      alert("로그인을 먼저 하세요")
      history.replace('/login')
      return
    }

    axios({
      method: 'get',
      url: "/posts/" + props.match.params.id + '/',
    })
    .then(res => {
      setPost(res.data)
      setPrice(res.data.price)
      setContact(res.data.contact)
      setContent(res.data.content)
      setImages(res.data.images.map(val => val.image))

      res.data.images.forEach(imgInfor => {
        let request = new XMLHttpRequest()
        console.log(imgInfor)
        request.responseType = "blob";
        request.onload = () => {
          const file = new File([request.response], new Date(Date.now()).getTime() + '.png')
          image.current.push(file)
        }
        request.open("GET", imgInfor.image)
        request.send()
      })
    })
    .catch(err => {
      console.log(err.response)
    })
  }, [])

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
    
  }
  const submitHandler = () => {
    axios({
      url: `/posts/${props.match.params.id}/`,
      method: "put",
      headers: {
        'Authorization': `Bearer ${Acookie['access-token']}`
      },
      data: {
        price: Price,
        contact: Contact,
        content: Content
      }
    })
    .then(function(response) {
      alert("수정 되었습니다.")
        axios({
          method: 'get',
          url: '/posts/',
        })
        .then(res => {
          axios({
            method: 'get',
            url: '/photos/',
          })
          .then(resa => {
            const temp = resa.data.filter(val => val.post_id === props.match.params.id)
            console.log(temp)
            temp.forEach(val => {
              axios({
                method: 'delete',
                url: '/photos/' + val.id + '/',
                headers: {
                  'Authorization': `Bearer ${Acookie['access-token']}`
                }
              })
              .then(res => {
                console.log(res)
              })
              .catch(err => {
                console.log(err.response)
              })
            })
          })
            image.current.forEach(val => {
              console.log(val)
              let formData = new FormData();
              formData.append("post_id", props.match.params.id)
              formData.append("image", val)
              axios({
                method: 'POST',
                url: "/photos/",
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${Acookie['access-token']}`
                },
                data: formData
              })
                  .then(response => {
                      console.log(response)
                  })
                  .catch(err => {
                      console.log(err.response)
                  })
              })
            })
            console.log(image.current)
          props.history.push("/");

    
  }
    )}

  const handle = (files) => {
    image.current = [...image.current, ...files]
  }

  const delHandle = (img) => {
    console.log(image.current, img)
    if(images.indexOf(img) !== -1) {
      setImages(prev => prev.filter((val, i) => i !== images.indexOf(img)))
      console.log(image.current.indexOf(img))
      if(img.indexOf("http") === -1) {
        return
      }
    }

    const currentIndex = image.current.indexOf(img);
    let newImages = [...image.current]
    newImages.splice(currentIndex, 1)
    image.current = newImages
    console.log(image.current)
  }

  // 게시글 삭제 정말?
  const confirmAction = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      deleteHandler();
    } else {
      
    }
  };
  // 게시글 삭제 함수
  const deleteHandler = () => {
    // posts 해당 id에 delete 요청
    axios({
      url: `/posts/${props.match.params.id}/`,
      method: "delete",
      headers: {
        'Authorization': `Bearer ${Acookie['access-token']}`
      },
      data: {
        price: Price,
        contact: Contact,
        content: Content
      }
    })
    // 성공 후 응답
    .then(function(response) {
      alert("삭제되었습니다.")
      props.history.push("/")
    })
    // 실패 후 응답
    .catch(function(error) {
      alert("실패했습니다.")
    })
  }  
  
  return (
    <div className="uploadContainer">
      <h3 className="uploadTitle">Edit</h3>
      <Form onSubmit={submitHandler} className="uploadForm">
        <FileUpload delHandle={delHandle} images={images} handle={handle} refreshFunction={updateImages} />
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
        <br/><br/>
        <Input
          type="submit"
          value="삭제하기"
          onClick={confirmAction}
        />
        </Form>
      </div>
  );
}

export default Edit