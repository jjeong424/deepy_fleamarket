import React, {useState, useEffect} from 'react'
import './Comment.css'

import axios from 'axios'

import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

const Comment = (props) => {
    const [text, setText] = useState('')
    const [Acookie] = useCookies('access-token')
    const [e] = useCookies('e')
    const [owner, setOwner] = useState(0)
    const history = useHistory()

    useEffect(() => {
        if(e.e === undefined) {
            alert("로그인을 먼저 해주세요")
            history.push('/login')
            return
        }
        axios({
            method: 'get',
            url: "/uesrs/"
        })
        .then(res => {
            res.data.map(val => {if(val.email === e.e) setOwner(val.id)})
            return
        })
        .catch(err =>{
            console.log(err.response)
        })
    }, [])

    const submit = e => {
        e.preventDefault()
        axios({
            url: "/comments/",
            method: "post",
            headers: {
                'Authorization': `Bearer ${Acookie['access-token']}`
            },
            data: {
                post_id: props.match.params.id,
                text, 
                owner_id: owner
            }
        })
        .then(res => {
            console.log(res)
            alert('댓글 작성 완료')
            history.push('/post/' + props.match.params.id)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    return (
        <form onSubmit={submit} style={{maxWidth: "950px", margin: "0 auto"}}>
            <textarea value={text} onChange={e => setText(e.target.value)} style={{padding: "8px 15px", fontSize: "16px"}} type="text" placeholder="댓글을 입력해주세요." />
            <button>입력</button>
        </form>
    )
}

export default Comment