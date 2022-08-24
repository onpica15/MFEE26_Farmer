import _ from 'lodash';
import ProductBanner from '../../component/lil/ProductBanner';
import ProductNavBar from '../../component/lil/ProductNavBar';
import SearchP from '../../component/lil/SearchP';
import PriceSelect from '../../component/lil/PriceSelect';
import Ad from '../../component/lil/Ad';
import Title from '../../component/lil/Title';
import styles from './ProductList.module.css';
import clsx from 'clsx';
import ProductCard from '../../component/lil/ProductCard';
import ProductHashTag from '../../component/lil/ProductHashTag';
import Pagination from '../../component/lil/Pagination';
import React, { useEffect, useState, useContext, useMemo } from 'react';
import {
    fetchProduct,
    getHotSale,
    addToCart,
    getProductItem,
    updateCollect,
    getCollected,
    updateCompare,
    deleteCompare,
    getCompare,
} from '../../api/product';
import { HASHTAG, SUPPLIER } from '../../config/variables';
import { useQuery } from '../../hooks';
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHashTag } from '../../store/slices/product';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CartCountContext from '../../component/ben/cart_count/CartCountContext';
import { FaNetworkWired } from 'react-icons/fa';
import Modal from 'react-modal';
import Compare from '../../component/lil/Compare';
import { useWindowScrollPosition } from 'rooks';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 0,
        padding: 0,
        backgroundColor: 'transparent',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
    },
};
Modal.setAppElement('#root');

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1000,
};

function ProductList() {
    let subtitle;
    const { cartList, setCartList } = useContext(CartCountContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [hotSales, setHotSale] = useState([]);
    const query = useQuery();
    const page = query['page'] || 1;
    const type = query['type'];
    const search = query['search'];
    const [hashTagURL, setHashTagURL] = useSearchParams();
    const member_info = JSON.parse(localStorage.getItem('auth')) || {};
    const userId = member_info.customer_id;
    const lsKey = `histroy${userId}`;
    const [historyData, setHistoryData] = useState([]);
    const [collectData, setCollectData] = useState([]);
    const [compareBTN, setCompareBTN] = useState(false);
    const [compared, setCompared] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [adShow, setAdShow] = useState();
    const position = useWindowScrollPosition();
    const [navFixed, setNavFixed] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const productList = useMemo(() => {
        if (data && data.rows) {
            return data.rows.map((el) => {
                // { sid: 112, product_name: "2112", product_type: 2, ... }
                const { sid } = el;

                // { product_id: 112, saved: 0 }
                const { saved = 0 } =
                    _.find(collectData, { product_id: sid }) || {};
                return { ...el, saved };
            });
        }
        return [];
    }, [data, collectData]);

    const hotSaleList = useMemo(() => {
        if (hotSales.rows) {
            return hotSales.rows.map((el) => {
                const { sid } = el;

                const { saved = 0 } =
                    _.find(collectData, { product_id: sid }) || {};
                return { ...el, saved };
            });
        }
        return [];
    }, [hotSales, collectData]);

    const historyList = useMemo(() => {
        if (historyData) {
            return historyData.map((el) => {
                const { sid } = el;
                const { saved = 0 } =
                    _.find(collectData, { product_id: sid }) || {};
                return { ...el, saved };
            });
        }
        return [];
    }, [historyData, collectData]);

    useEffect(() => {
        //取history
        const json = localStorage.getItem(lsKey);
        if (json) {
            const history = JSON.parse(json);
            const ids = Object.keys(history);
            if (ids.length) {
                getHistoryProducts(ids);
            }
        }

        // 取收藏
        getCollectedItem();
    }, []);

    useEffect(() => {
        // 取熱門
        getHotSales();
    }, []);

    const getHistoryProducts = async (ids) => {
        const getHistoryData = await Promise.all(
            ids.map((v, i) => {
                return getProductItem(v);
            })
        );
        // set state
        setHistoryData(getHistoryData);
    };

    const { hashTag } = useSelector((state) => state.product);

    let orderBy = query['orderBy'] || 'sid';
    let order = query['order'] || 'DESC';

    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedOption, setSelectedOption] = useState(null);

    const goToPath = (sid) => {
        navigate(`/product/${sid}`);
    };
    const getProduct = async (page, hashTag, type, orderBy, order, search) => {
        const data = await fetchProduct(
            page,
            hashTag,
            type,
            orderBy,
            order,
            search,
            1
        );
        if (data && data.rows) {
            // console.log(data);
            setData(data);
        }
    };

    const getHotSales = async () => {
        const data = await getHotSale();
        if (data && data.rows) {
            setHotSale(data);
        }
    };

    const handleToggleHashTag = (key) => {
        const { search, ...rest } = query;
        setHashTagURL({ ...rest, page: 1 });
        console.log({ key });
        dispatch(toggleHashTag(key));
    };

    useEffect(() => {
        getProduct(page, hashTag, type, orderBy, order, search);
    }, [page, hashTag, type, orderBy, order, search]);

    useEffect(() => {
        const { value: priceOrder } = selectedOption ?? {};
        let orderBy;
        let order;

        switch (priceOrder) {
            case 1: {
                orderBy = 'price';
                order = 'ASC';
                break;
            }
            case 2: {
                orderBy = 'price';
                order = 'DESC';
                break;
            }
            default: {
                break;
            }
        }

        const q = {
            ...query,
            orderBy,
            order,
        };

        if (query.orderBy !== orderBy || query.order !== order) {
            // order = priceOrder === '1' ? 'ASC' : 'DESC'
            setSearchParams(q);
        }
    }, [selectedOption]);

    const handleToCart = async (sid, amount) => {
        if (!member_info.customer_id) {
            MySwal.fire({
                title: '請先登入帳號',
                confirmButtonColor: '#82CA35',
            });
            // alert('請先登入帳號');
            return;
        }
        const newBuyList = await addToCart({
            product_count: amount,
            product_id: +sid,
            member_id: member_info.customer_id,
        });
        console.log(newBuyList.cart);
        setCartList(newBuyList.cart);
    };
    const handleCollect = async (sid, saved) => {
        // update state
        if (!member_info.customer_id) {
            MySwal.fire({
                title: '請先登入帳號',
                confirmButtonColor: '#82CA35',
            });
            return;
        }
        setCollectData((prev) => {
            if (_.find(prev, { product_id: sid })) {
                return prev.map((el) => {
                    if (el.product_id === sid) {
                        return { ...el, saved };
                    }
                    return el;
                });
            }
            return [
                ...prev,
                {
                    product_id: sid,
                    saved,
                },
            ];
        });

        // update data
        await updateCollect({
            member_id: member_info.customer_id,
            product_id: +sid,
            saved: +saved,
        });

        // console.log(newCollect);
    };

    const getCollectedItem = async () => {
        // [{member_id: 530, product_id: 6, saved: 1}]
        const collected = await getCollected(userId);
        setCollectData(collected);
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setCompareBTN(true);
            } else {
                setCompareBTN(false);
            }
        });
    }, []);

    const handleCompare = async (sid) => {
        if (compared.includes(sid)) {
            // deleted
            const data = await deleteCompare(sid);
            setCompared(data);
        } else if (compared.length < 3) {
            const data = await updateCompare(sid);
            setCompared(data);

            // add
        } else {
            // hint
            alert('只能比較三個商品喔！');
            return;
        }
    };

    const fetchCompare = async () => {
        const data = await getCompare();
        setCompared(data);
    };

    useEffect(() => {
        fetchCompare();
    }, []);

    const handleAdClose = () => {
        setAdShow(false);
    };

    useEffect(() => {
        if (position.scrollY > 800 && _.isNil(adShow)) {
            setAdShow(true);
        }
    }, [position, adShow]);

    useEffect(() => {
        if (position.scrollY > 400) {
            setNavFixed(true);
        } else {
            setNavFixed(false);
        }
    }, [position, navFixed]);
    return (
        <>
            <div className={styles.page}>
                {compareBTN && (
                    <div
                        className={styles.comparebtn}
                        onClick={() => openModal()}
                    >
                        <div className={styles.compareNum}>
                            {compared.length}
                        </div>
                        <FaNetworkWired size={30} />
                    </div>
                )}

                <ProductBanner />
                <div className={styles.container}>
                    <div className={clsx('row', styles.row)}>
                        <div
                            className={clsx('col-3', styles.sidebar)}
                            style={{ marginTop: '53px' }}
                        >
                            <div className={clsx({ [styles.fixed]: navFixed })}>
                                <SearchP />
                                <PriceSelect
                                    value={selectedOption}
                                    onSelect={setSelectedOption}
                                />
                                <ProductNavBar />
                            </div>
                            <div className={styles.ad_wrap}>
                                <Ad
                                    className={clsx(styles.ad_hidden, {
                                        [styles.ad_move]: adShow,
                                    })}
                                    onClick={handleAdClose}
                                />
                            </div>
                        </div>
                        <div className={clsx('col-9', styles.main)}>
                            <Title zh={'熱銷商品'} eg={'Hot Sales'} />
                            <div className={clsx('row', styles.card)}>
                                <Slider {...settings}>
                                    {hotSaleList &&
                                        hotSaleList.map((v, i) => {
                                            return (
                                                <ProductCard
                                                    key={i}
                                                    onClick={() =>
                                                        goToPath(v.sid)
                                                    }
                                                    className={styles.slick}
                                                    name={v.product_name}
                                                    supplier={
                                                        SUPPLIER[
                                                            v.product_supplier
                                                        ]
                                                    }
                                                    price={v.product_price}
                                                    unit={v.product_unit}
                                                    img={
                                                        v.product_img &&
                                                        v.product_img[0]
                                                    }
                                                    inventory={
                                                        v.product_inventory
                                                    }
                                                    hotSale={true}
                                                    onSubmit={(amount) =>
                                                        handleToCart(
                                                            v.sid,
                                                            amount
                                                        )
                                                    }
                                                    onCollect={(save) => {
                                                        handleCollect(
                                                            v.sid,
                                                            save
                                                        );
                                                    }}
                                                    saved={v.saved}
                                                    compareModal={true}
                                                />
                                            );
                                        })}
                                </Slider>
                            </div>
                            <Title zh={'標籤探索'} eg={'Tag exploration'} />
                            <div className={clsx('col-9', styles.hash_tag)}>
                                {Object.keys(HASHTAG).map((key) => {
                                    const value = HASHTAG[key];
                                    const checked = hashTag === key;
                                    return (
                                        <ProductHashTag
                                            key={key}
                                            hashTag={value}
                                            checked={checked}
                                            onClick={() =>
                                                handleToggleHashTag(key)
                                            }
                                        />
                                    );
                                })}
                            </div>

                            <Title zh={'小農產品'} eg={'Products'} />

                            <div className={clsx('row', styles.card)}>
                                {productList.map((v, i) => {
                                    return (
                                        <ProductCard
                                            key={i}
                                            onClick={() => goToPath(v.sid)}
                                            className="col-6 col-lg-4"
                                            sid={v.sid}
                                            name={v.product_name}
                                            supplier={
                                                SUPPLIER[v.product_supplier]
                                            }
                                            price={v.product_price}
                                            unit={v.product_unit}
                                            img={
                                                v.product_img &&
                                                v.product_img[0]
                                            }
                                            inventory={v.product_inventory}
                                            hotSale={false}
                                            onSubmit={(amount) =>
                                                handleToCart(v.sid, amount)
                                            }
                                            onCollect={(save) => {
                                                handleCollect(v.sid, save);
                                            }}
                                            saved={v.saved}
                                            onCompare={handleCompare}
                                            compared={compared.includes(v.sid)}
                                            compareModal={false}
                                        />
                                    );
                                })}
                            </div>
                            <div className={styles.pagination}>
                                {data && data.totalPage ? (
                                    <Pagination
                                        page={data.page}
                                        totalPage={data.totalPage}
                                    />
                                ) : null}
                            </div>
                            {historyData && historyData.length ? (
                                <>
                                    <Title zh={'瀏覽紀錄'} eg={'History'} />
                                    <div className={clsx('row', styles.card)}>
                                        {historyList.map((v, i) => {
                                            return (
                                                <ProductCard
                                                    key={v.sid}
                                                    hotSale={false}
                                                    onClick={() =>
                                                        goToPath(v.sid)
                                                    }
                                                    className="col-6 col-lg-4"
                                                    name={v.product_name}
                                                    supplier={
                                                        SUPPLIER[
                                                            v.product_supplier
                                                        ]
                                                    }
                                                    inventory={
                                                        v.product_inventory
                                                    }
                                                    price={v.product_price}
                                                    unit={v.product_unit}
                                                    img={
                                                        v.product_img &&
                                                        v.product_img[0]
                                                    }
                                                    onSubmit={(amount) =>
                                                        handleToCart(
                                                            v.sid,
                                                            amount
                                                        )
                                                    }
                                                    onCollect={(save) => {
                                                        handleCollect(
                                                            v.sid,
                                                            save
                                                        );
                                                    }}
                                                    saved={v.saved}
                                                    compareModal={true}
                                                />
                                            );
                                        })}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <Compare onClose={closeModal} sid={compared} />
            </Modal>
        </>
    );
}

export default ProductList;

//TODO: card排版  熱銷輪播rwd彙報版
