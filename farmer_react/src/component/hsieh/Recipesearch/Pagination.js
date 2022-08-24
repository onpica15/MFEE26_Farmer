import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Pagination({ page, totalPages }) {
    const location = useLocation();
    const usp = new URLSearchParams(location.search);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="#/">
                        第一頁 First Page
                    </a>
                </li>
                {Array(11)
                    // Array 長度11
                    .fill(1)
                    // fill填滿，給1
                    .map((v, i) => {
                        const isActive = page === page + i - 5 ? 'active' : '';

                        return page + i - 5 >= 1 &&
                            page + i - 5 <= totalPages ? (
                            <li
                                className={`page-item ${isActive}`}
                                key={'pagi' + (+page + i - 5)}
                            >
                                <Link
                                    className="page-link"
                                    to={`?page=${page + i - 5}`}
                                >
                                    {page + i - 5}
                                </Link>
                            </li>
                        ) : null;
                    })}

                <li className="page-item">
                    <a className="page-link" href="#/">
                        最後一頁 Last Page
                    </a>
                </li>
            </ul>
        </nav>
    );
}
