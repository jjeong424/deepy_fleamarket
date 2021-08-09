import Axios from "axios";
import React from "react";
import './ItemDetail.css'
import { withCookies, Cookies } from 'react-cookie' 
import { instanceOf } from "prop-types";
// import { Link } from "react-router-dom";


class Detail extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)

    this.props = props
    this.state = {
      post: {},
      users: [],
      comments: [],
      my: 0,
      comment: ''
    }
  }

  static propsTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  componentDidMount() {
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
      return
    }
    Axios({
      method: 'get',
      url: "/uesrs/"
    })
    .then(res => {
      console.log(res.data)
      this.setState({...this.state, users: res.data})
      this.setState({...this.state, my: res.data.filter(val => val.email === this.props.cookies.get('e'))[0].id})
    })
    .catch(err => {
      console.log(err.response)
    })

    this.getComment()
    this.getPosts()
  };

  getComment = () => {
    Axios({
      method: 'get',
      url: "/comments/"
    })
    .then(res => {
      this.setState({...this.state, comments: res.data.filter(post => post.post_id === this.props.location.state.id)})
    })
  }

  getPosts = async (post) => {
    const {data} = await Axios.get(
      "/posts/?format=json"
    )
    console.log(data)
    if(data === undefined) return;

    data.forEach(val => {
      if(val.id === this.props.location.state.id) this.setState({...this.state, post: val})
    });

    console.log(post)
  };
  getUsernick() {
    if(this.state.users.length === 0) return
    return this.state.users.map(val => val.id === this.state.post.owner && val.nickname)
  }

  soldout = () => {
    console.log(this.props)
    Axios({
      method: 'put',
      url: `/posts/${this.props.location.state.id}/`,
      headers: {
        'Authorization': `Bearer ${this.props.cookies.get('access-token')}`
      },
      data: {
        issold: true,
        price: "판매완료"
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err.response)
    })
  }

  write = () => {
    Axios({
      url: "/comments/",
      method: "post",
      headers: {
        'Authorization': `Bearer ${this.props.cookies.get('access-token')}`
      },
      data: {
          post_id: this.props.location.state.id,
          text: this.state.comment, 
          owner_id: this.state.my
      }
    })
    .then(res => {
        console.log(res)
        alert('댓글 작성 완료')
        this.getComment()
    })
    .catch(err => {
        console.log(err.response)
    })
  }

  render() {
    const { location } = this.props;
    if (this.state.post.id !== undefined) {
      return (<div className="detailWrapper">
        <div className="imgsWrapper">
          {this.state.post.images.map(val => (<img height="100%" className="imgsItem" src={val.image} alt={val} />))}
        </div>
        <hr/>
        <h2>판매자: {this.getUsernick()}</h2>
        <h2>상품 가격: {this.state.post.price}원</h2>
        <h2 className="contact">연락방법:</h2>
        <a className="contactLink" href={()=> this.state.post.contact.slice(0,4) === "http" ? this.state.post.contact : null}>{this.state.post.contact}</a>
        <h4 style={{width: "100%", fontWeight: 500}}>{this.state.post.content}</h4><br/>
        {this.state.my === this.state.post.owner && <>
        <button className="editButton" onClick={() => this.props.history.push('/edit/' + location.state.id)}>게시글 수정</button>
        <button className="editButton" onClick={this.soldout}>판매완료</button></>}
        <hr/>
        <h2 style={{display: "flex", justifyContent: "space-between"}}>댓글</h2>
        <textarea className="txtBox" value={this.state.comment} onChange={e => this.setState({...this.state, comment: e.target.value})} /><br/>
        <button onClick={this.write}>댓글 작성</button>
        <hr/>
        {this.state.comments.map(com => (
          <div key={com.id}>
            <h4><img height="auto" width="30px" src={this.state.users.filter(val => (val.id === com.owner_id))[0].icon} alt={""}/>{this.state.users.filter(val => (val.id === com.owner_id))[0].username}</h4>
            <h4 className="comTxt">{com.text}</h4> 
            <span>{new Date(com.create_date).getFullYear()}년 {new Date(com.create_date).getMonth() + 1}월 {new Date(com.create_date).getDate()}일</span><br/><br/>
          </div>
        ))}
      </div>)
    } else {
      return null;
    }
  }
}
export default withCookies(Detail);