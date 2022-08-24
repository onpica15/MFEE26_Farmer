import _ from 'lodash'
import axios from 'axios'
import { SERVER } from '../config/ajax-path'

export async function uploadImages(images) {
    // 對照server上的檔案名稱
    const formData = new FormData()

    _.forEach(images, (el, i) => {
        formData.append(`image-${i}`, el)
    })

    const { data } = await axios.post(`${SERVER}/upload-images`, formData)
    return data
}

export async function submitData(val) {
    const { data } = await axios.post(`${SERVER}/product`, val)
    return data
}

export async function changeData(val) {
    const { data } = await axios.put(`${SERVER}/product`, val)
    return data
}

export async function deleteData(sid) {
    const { data } = await axios.delete(`${SERVER}/product`, { data: { sid } })
    return data
}
