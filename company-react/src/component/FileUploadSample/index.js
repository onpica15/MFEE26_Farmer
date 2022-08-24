import React, { useState, useEffect, useRef } from 'react'
import Box from '../Box'
import styles from './FileUploadSample.module.css'
import { getImgUrl } from '../../config/ajax-path'

function FileUploadSample({ onChange, photos }) {
    // 選擇的檔案
    const [selectedFile, setSelectedFile] = useState([])
    // 是否有檔案被挑選
    const [isFilePicked, setIsFilePicked] = useState(false)
    // 預覽圖片
    const [preview, setPreview] = useState([])
    // server上的圖片網址
    const [imgServerUrl, setImgServerUrl] = useState('')
    const inputFileRef = useRef()

    // 當選擇檔案更動時建立預覽圖
    useEffect(() => {
        if (!selectedFile.length) {
            setPreview([])
            return
        }

        const objectUrls = selectedFile.map((el) => URL.createObjectURL(el))
        setPreview(objectUrls)

        // 當元件unmounted時清除記憶體
        return () => {
            objectUrls.forEach((el) => URL.revokeObjectURL(el))
        }
    }, [selectedFile])

    const changeHandler = (e) => {
        const files = e.target.files
        const values = Object.values(files)

        setIsFilePicked(true)
        setSelectedFile(values)
        setImgServerUrl('')
        // const newPicArray = values.map((v) => {
        //     return v.name
        // })
        // console.log(newPicArray)
        onChange(values)
    }

    useEffect(() => {
        setPreview(photos.map((n) => getImgUrl(n)))
    }, [photos])

    const handleOnClickUpload = () => {
        inputFileRef.current.click()
    }
    return (
        <div style={{ width: '100%' }}>
            <input
                type="file"
                name="photos"
                accept="images/*"
                multiple
                onChange={changeHandler}
                ref={inputFileRef}
                style={{ display: 'none' }}
            />

            <div>
                <div className={styles.click} onClick={handleOnClickUpload}>
                    上傳照片
                </div>
                <div style={{ width: '100%' }}>
                    <div className="d-flex">
                        {preview.map((v, i) => {
                            return (
                                <div className={styles.previewimg} key={i}>
                                    <Box>
                                        <img src={v} alt="" />
                                    </Box>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileUploadSample
