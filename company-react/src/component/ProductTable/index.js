import { useState } from 'react'
import clsx from 'clsx'
import styles from './ProductTable.module.css'
import { CgMoreO } from 'react-icons/cg'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Modal from 'react-modal'
import ProductManage from '../ProductManage'
import { UNIT, TYPE } from '../../config/variables'
import Box from '../Box'
import AddProduct from '../AddProduct'
import { deleteData } from '../../api/root'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

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
}

Modal.setAppElement('#root')

function ProductTable({ data, onDeleted, onUpdate }) {
    let subtitle

    const [modalIsOpen, setIsOpen] = useState(false)
    const [editIsOpen, setEditIsOpen] = useState(false)
    const [sid, setSid] = useState('')

    function openModal() {
        setIsOpen(true)
    }

    function openEdit() {
        setEditIsOpen(true)
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00'
    }

    function closeModal() {
        setIsOpen(false)
        setEditIsOpen(false)
    }

    const handleDelete = async (sid) => {
        console.log(sid)
        MySwal.fire('確定要刪除這筆商品嗎？')
        // MySwal.fire({
        //     title: '確定要刪除這筆商品嗎？',
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: '確定，刪除這筆資料!',
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         Swal.fire('已刪除!')
        //     }
        // })
        const result = await deleteData(sid)
        if (result.success) {
            onDeleted(sid)
        }
    }

    return (
        <>
            <div className="container">
                <table className={clsx(styles.product_table, 'table')}>
                    <thead className={clsx(styles.table, 'table-dark')}>
                        <tr>
                            <th scope="col">商品圖片</th>
                            <th scope="col">商品名稱</th>
                            <th scope="col">分類</th>
                            <th scope="col">價格</th>
                            <th scope="col">單位</th>
                            <th scope="col">庫存</th>
                            <th scope="col">商品狀態</th>
                            <th scope="col">更多</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v, i) => {
                            return (
                                <tr key={v.sid}>
                                    <td style={{}}>
                                        <div
                                            style={{
                                                width: '100px',
                                                margin: 'auto',
                                            }}
                                        >
                                            <Box>
                                                <img
                                                    src={
                                                        v.img_urls &&
                                                        v.img_urls[0]
                                                    }
                                                    alt=""
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </Box>
                                        </div>
                                    </td>
                                    <td>{v.product_name}</td>
                                    <td>{TYPE[v.product_type]}</td>
                                    <td>{v.product_price}</td>
                                    <td>{UNIT[v.product_unit]}</td>
                                    <td>{v.product_inventory}</td>
                                    <td>
                                        {v.product_status ? '上架中' : '下架'}
                                    </td>
                                    <td>
                                        <CgMoreO
                                            size={18}
                                            style={{
                                                margin: '0 3px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                openModal()
                                                setSid(v.sid)
                                            }}
                                        />
                                        <BiEdit
                                            size={18}
                                            style={{
                                                margin: '0 3px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                openEdit()
                                                setSid(v.sid)
                                            }}
                                        />

                                        <RiDeleteBin6Line
                                            size={18}
                                            style={{
                                                margin: '0 3px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleDelete(v.sid)}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <ProductManage onClose={closeModal} sid={sid} />
            </Modal>
            <Modal
                isOpen={editIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <AddProduct
                    onClose={closeModal}
                    sid={sid}
                    onUpdate={onUpdate}
                    isNew={false}
                />
            </Modal>
        </>
    )
}
export default ProductTable

//TODO: box
