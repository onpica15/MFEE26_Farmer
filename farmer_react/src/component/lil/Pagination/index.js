import styles from './Pagination.module.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import qs from 'qs';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useQuery } from './../../../hooks';
import { useSearchParams } from 'react-router-dom';

function Pagination({ page, totalPage }) {
    const query = useQuery();
    const [URL, setURL] = useSearchParams();

    const changeNextPage = () => {
        if (page < totalPage) {
            setURL({ ...query, page: page + 1 });
        }
    };

    const changePrevPage = () => {
        if (page > 1) {
            setURL({ ...query, page: page - 1 });
        }
    };

    return (
        <>
            {totalPage >= 1 && (
                <ul className={styles.pagination}>
                    <li className={styles.page_item}>
                        <div onClick={changePrevPage}>
                            <IoIosArrowBack />
                        </div>
                    </li>

                    {Array(totalPage >= 3 ? 3 : totalPage)
                        .fill(1)
                        .map((v, i) => {
                            const num =
                                page < 3
                                    ? i + 1
                                    : page > totalPage - 2
                                    ? totalPage + i - 2
                                    : page + i - 1;

                            const isActive = page === num;

                            // total = 5
                            // i = 0,1,2
                            // page = 1 num = 1 2 3
                            // page = 2  num = 1 2 3
                            // page = 3  num = 2 3 4
                            // page = 4  num = 3 4 5
                            // page = 5  num = 3 4 5

                            const q = {
                                ...query,
                                page: num,
                            };

                            const qStr = qs.stringify(q);

                            return (
                                <li
                                    className={clsx(
                                        'page-item',
                                        styles.page_num,
                                        {
                                            [styles.active]: isActive,
                                        }
                                    )}
                                    key={`page-${num}`}
                                >
                                    <Link className="page-link" to={`?${qStr}`}>
                                        {num}
                                    </Link>
                                </li>
                            );
                        })}

                    <li className={styles.page_item_right}>
                        <div onClick={changeNextPage}>
                            <IoIosArrowForward />
                        </div>
                    </li>
                </ul>
            )}
        </>
    );
}

export default Pagination;
