import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import { AiOutlinePlus } from 'react-icons/ai';
//import { useCookies } from 'react-cookie'

function FileUpload(props) {

    // 상태와 set 선언
    const [Images, setImages] = useState([])
    //const [id, setId] = useState(0)
    const [imgUrl, setUrls] = useState([])
    //const [Acookie] = useCookies(['access-token'])

    // 삭제 함수
    const deleteHandler = (image) => {
        // 선택한 이미지의 인덱스 설정
        const currentIndex = Images.indexOf(image);
        // 인덱스 예외처리
        if(props.images !== undefined) {
            if(props.images.indexOf(image) !== -1) {
                props.delHandle(image)
                setImages(prev => prev.filter(val => image !== val))
                return
            }
        } else {
            setUrls(imgUrl.filter(val => val !== imgUrl[currentIndex]))
        }
        let newImages = [...Images]
        // newImages 에서 해당 인덱스의 이미지 삭제
        newImages.splice(currentIndex, 1)
        // Images를 newImages로 set
        setImages(newImages)
        props.refreshFunction(newImages)
        props.delHandle(image)
    }

    // 이미지 추가 함수
    const plusImage = files => {   
        setImages([...Images, ...files]) 
        props.handle(files)
    }

    // 이미지가 먼저 있을 경우
    useEffect(() => {
        if(!props.images) return
        console.log(props.images)
        if(props.images) setUrls([...imgUrl , ...props.images]); setImages([...Images, ...props.images])
    }, [props.images])

    // 사진 미리보기를 위해 쥐고있는 사진 url 가져오기?
    useEffect(() => {
        const urlss = []
        if(props.images)setUrls([...props.images])
        Images.forEach(function async (image) {
            if(image.type === undefined) {
                return
            }
            const reader = new FileReader()
            reader.onload = e => {
                urlss.push(e.target.result)
                setUrls(val => [...val, e.target.result])
            }
            reader.readAsDataURL(image)
        })
    }, [Images])

    useEffect(() => {
        console.log(imgUrl)
    }, [imgUrl])

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={plusImage}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: '240px', height: '240px', border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        // dropzone 설정
                        {...getRootProps()}>
                        {/* dropzone 이벤트 설정 */}
                        <input {...getInputProps()} />
                        {/* 아이콘 사용 */}
                        <AiOutlinePlus type="plus" style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '240px', height: '240px', overflowX: 'scroll' }}>
                {
                    // map으로 미리보기 뿌림
                    imgUrl.map((val, i) =>
                        // 클릭하면 삭제함수
                        (<div style={{display: "flex", maxWidth: "250px"}} onClick={() => deleteHandler(Images[i])}>
                            <img style={{width: 'auto', height: '100%', marginRight: "30px"}}
                                src={val}
                                alt={val} // alt에 넣을 게 딱히 없는데 이거때문에 컴플릿나서 일단 이렇게 넣어둠
                            />
                        </div>)
                    )
                }
            </div>
        </div>
    )
}

export default FileUpload
