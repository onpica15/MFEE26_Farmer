import axios from 'axios';
import { COMMENT_ITEM } from '../../../../config/ajax-path';

export async function getCommentItem(sid) {
    const res = await axios.get(`${COMMENT_ITEM}?commnet_sid=${sid}`);
    const { data } = res;
    return data;
}
