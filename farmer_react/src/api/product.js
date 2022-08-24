import axios from 'axios';
import {
    AB_GET_PRODUCT,
    getImgUrl,
    AB_GET_HOT_SALES,
    CART_ADD_PRODUCT,
    PRODUCT_COLLECT,
    PRODUCT_COMPARE,
    PRODUCT_COMMENT,
    RECOMMEND_RECIPE,
} from '../config/ajax-path';

axios.defaults.withCredentials = true;

export async function fetchProduct(
    page,
    hashTag,
    type,
    orderBy,
    order,
    search,
    status
) {
    const params = {
        page,
        hashTag,
        type,
        orderBy,
        order,
        search,
        status,
    };
    const res = await axios.get(AB_GET_PRODUCT, { params });
    const { data } = res;

    if (data && data.rows) {
        const newRows = data.rows.map((el) => {
            const { product_img, ...rest } = el;
            return {
                ...rest,
                product_img: product_img.map((o) => getImgUrl(o)),
            };
        });
        data.rows = newRows;
    }

    return res.data;
}

export async function getProductItem(sid) {
    const res = await axios.get(`${AB_GET_PRODUCT}?sid=${sid}`);
    const { data } = res;

    if (data && data.rows) {
        const [item] = data.rows.map((el) => {
            const { product_img, ...rest } = el;
            return {
                ...rest,
                product_img: product_img.map((o) => getImgUrl(o)),
            };
        });
        return item;
    }

    return {}; //fallback
}

export async function getHotSale() {
    const res = await axios.get(AB_GET_HOT_SALES);
    const { data } = res;

    if (data && data.rows) {
        const newRows = data.rows.map((el) => {
            const { product_img, ...rest } = el;
            return {
                ...rest,
                product_img: product_img.map((o) => getImgUrl(o)),
            };
        });
        data.rows = newRows;
    }
    return res.data;
}

export async function getSupplierProduct(supplier) {
    const params = {
        supplier,
    };
    const res = await axios.get(AB_GET_PRODUCT, { params });
    const { data } = res;

    if (data && data.rows) {
        const newRows = data.rows.map((el) => {
            const { product_img } = el;
            return {
                ...el,
                img_urls: product_img.map((o) => getImgUrl(o)),
            };
        });
        data.rows = newRows;
    }

    return res.data;
}

export async function addProduct() {
    const body = {};
    const res = await axios.post(AB_GET_PRODUCT, body);
    console.log(res.data);
}

export async function addToCart(val) {
    // { product_count, product_id, member_id }
    if (val.member_id) {
        const { data } = await axios.post(CART_ADD_PRODUCT, val);
        // console.log(val);
        return data;
    }
    return {};
}

export async function updateCollect(val) {
    const { data } = await axios.post(PRODUCT_COLLECT, val);
    console.log(data);
    return data;
}

export async function getCollected(user, sid) {
    if (user) {
        const params = {
            user,
            sid,
        };
        const { data } = await axios.get(PRODUCT_COLLECT, { params });
        // console.log(data);
        return data;
    }
    return [];
}

export async function getCompare() {
    const { data } = await axios.get(PRODUCT_COMPARE);
    return data;
}

export async function updateCompare(sid) {
    const { data } = await axios.put(PRODUCT_COMPARE, { sid });
    return data;
}

export async function deleteCompare(sid) {
    const { data } = await axios.delete(PRODUCT_COMPARE, { data: { sid } });
    return data;
}

export async function getStarRating(sid) {
    const params = { sid };
    const { data } = await axios.get(PRODUCT_COMMENT, { params });
    //console.log(data);  [{…}, {…}, {…}, {…}, {…}, {rating: '5'}]
    const rows = data.length;
    const sum = data.reduce((total, obj) => {
        return total + Number(obj.rating);
    }, 0);

    const average = Math.round((sum / rows) * 100) / 100;
    // console.log({ average, rows });
    return { average, rows };
}

export async function getRecommendRecipe(sid) {
    const params = { sid };
    const { data } = await axios.get(RECOMMEND_RECIPE, { params });
    return data ? data[0] : {};
}
