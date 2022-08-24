import axios from 'axios';
import { COMMENT_MAIN, getImgUrl } from '../config/ajax-path';

// 這隻會幫我找到搜尋or篩選出來的東西，再幫忙渲染出來
export async function fetchComment(page, order, search) {
    const params = {
        page,
        order,
        search,
    };
    const res = await axios.get(COMMENT_MAIN, { params });
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
