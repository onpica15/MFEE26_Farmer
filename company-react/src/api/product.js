import axios from 'axios'
import { AB_GET_PRODUCT, getImgUrl } from '../config/ajax-path'

export async function fetchProduct(
    page,
    hashTag,
    type,
    orderBy,
    order,
    search
) {
    const params = {
        page,
        hashTag,
        type,
        orderBy,
        order,
        search,
    }
    // `page=${goToPage}&hashTag=${hashTag}&type=${type}&orderBy=${orderBy}&order=${order}&search=${search}`
    const res = await axios.get(AB_GET_PRODUCT, { params })
    const { data } = res

    if (data && data.rows) {
        const newRows = data.rows.map((el) => {
            const { product_img, ...rest } = el
            return {
                ...rest,
                product_img: product_img.map((o) => getImgUrl(o)),
            }
        })
        data.rows = newRows
    }

    return res.data
}

export async function getProductItem(sid) {
    const res = await axios.get(`${AB_GET_PRODUCT}?sid=${sid}`)
    const { data } = res

    if (data && data.rows) {
        const [item] = data.rows.map((el) => {
            const { product_img } = el
            return {
                ...el,
                img_urls: product_img.map((o) => getImgUrl(o)),
            }
        })
        return item
    }

    return {}
}

export async function getSupplierProduct(supplier) {
    const params = {
        supplier,
        perPage: 999999999,
    }

    const res = await axios.get(AB_GET_PRODUCT, { params })
    const { data } = res

    if (data && data.rows) {
        const newRows = data.rows.map((el) => {
            const { product_img } = el
            return {
                ...el,
                img_urls: product_img.map((o) => getImgUrl(o)),
            }
        })
        data.rows = newRows
    }

    return res.data
}

// export async function AddProduct() {
//   const body = {}
//   const res = await axios.post(AB_GET_PRODUCT, body)
//   console.log(res.data)
// }
