export const SERVER = 'http://localhost:3600';

export const AB_GET_PRODUCT = `${SERVER}/product`;
// export const AB_GET_LIST_AUTH = `${SERVER}/manage/product?userId=1`;
export const AB_GET_HOT_SALES = `${AB_GET_PRODUCT}/hot_sale`;
export const CART_LIST_TOBUY = `${SERVER}/cart`;
export const CART_LIST_CHANGE_COUNT = `${SERVER}/cart/changenum`;
export const CART_LIST_DELETE = `${SERVER}/cart/delete`;
export const CART_LIST_CHECK = `${SERVER}/cart/readytobuy`;
export const CART_LIST_ORDERLIST = `${SERVER}/cart/addtoorderlist`;
export const CART_LINEPAY = `${SERVER}/linepay`;
export const CART_LINEPAY_CHECK = `${SERVER}/linepay-check`;
export const CART_EMAIL = `${SERVER}/cartemail`;
export const CART_DISCOUNT = `${SERVER}/cart/getdiscount`;
export const CART_DISCOUNT_CHANGEISUESD = `${SERVER}/cart/discountcouponused`;
export const customized_lunch_CHECK = `${SERVER}/customized_lunch/api`;
export const AB_POST_UPLOAD_PHOTOS = `${SERVER}/try-uploads`;
export const CART_ADD_PRODUCT = `${SERVER}/cart/addfresh`;
export const AB_GET_COUPON = `${SERVER}/game/coupon`;
export const PRODUCT_COMPARE = `${SERVER}/compare-session`;
export const PRODUCT_COMMENT = `${AB_GET_PRODUCT}/rating`;

export const COMMENT_MAIN = `${SERVER}/comment`;
export const COMMENT_ALLLIKE = `${SERVER}/comment/getAllLike`;
export const COMMENT_CHECKLIKE = `${SERVER}/comment/islikedchange`;
export const COMMENT_SEARCHNAME = `${SERVER}/comment/getproductbyname`;

export const RECOMMEND_RECIPE = `${SERVER}/recommend_recipe`;

export const PRODUCT_COLLECT = `${SERVER}/product_collect`;
// export const COMMENT_MAIN = `${SERVER}/comment`;
// export const COMMENT_ITEM = `${SERVER}/comment/sid`;

export function getImgUrl(name) {
    return `${SERVER}/images/${name}`;
}
