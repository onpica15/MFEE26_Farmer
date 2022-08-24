import styles from './ManageList.module.css'
import _ from 'lodash'
import { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import ProductTableSelect from '../../component/ProductTableSelect'
import ProductTable from '../../component/ProductTable'
import { getSupplierProduct } from '../../api/product'
import { useQuery } from '../../hooks'
import Pagination from '../../component/Pagination'
import Modal from 'react-modal'
import AddProduct from '../../component/AddProduct'

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

function ManageList() {
    let subtitle

    const perPage = 12
    const [data, setData] = useState({})
    const [query, setQuery] = useQuery()
    const page = Number(query['page']) || 1
    const search = query['search']
    const member_info = JSON.parse(localStorage.getItem('comAuth'))
    const supplier = member_info.company_id
    const [modalIsOpen, setIsOpen] = useState(false)

    const tableSelect = useSelector((state) => state.product.tableSelect)
    const filteredRows = useMemo(() => {
        const { type, status, inventory } = tableSelect
        const { value: typeValue } = type || {}
        const { value: statusValue } = status || {}
        const { value: inventoryValue } = inventory || {}
        if (data.rows) {
            return data.rows.filter((el) => {
                let result = true

                if (search) {
                    result = el.product_name.includes(search)
                }

                if (result && inventoryValue) {
                    switch (inventoryValue) {
                        case 1: {
                            if (!el.product_inventory && el.product_inventory) {
                                result = false
                            }
                            break
                        }
                        case 2: {
                            if (el.product_inventory > 10) {
                                result = false
                            }
                            break
                        }
                        case 3: {
                            if (
                                el.product_inventory > 20 ||
                                el.product_inventory <= 10
                            ) {
                                result = false
                            }
                            break
                        }
                        case 4: {
                            if (el.product_inventory < 10) {
                                result = false
                            }
                            break
                        }
                        default: {
                        }
                    }
                }

                if (result && typeValue) {
                    switch (typeValue) {
                        case 1: {
                            if (!el.product_type) {
                                result = false
                            }
                            break
                        }
                        case 2: {
                            if (el.product_type !== 1) {
                                result = false
                            }
                            break
                        }
                        case 3: {
                            if (el.product_type !== 2) {
                                result = false
                            }
                            break
                        }
                        case 4: {
                            if (el.product_type !== 3) {
                                result = false
                            }
                            break
                        }
                        case 5: {
                            if (el.product_type !== 4) {
                                result = false
                            }
                            break
                        }
                        case 6: {
                            if (el.product_type !== 5) {
                                result = false
                            }
                            break
                        }
                        case 7: {
                            if (el.product_type !== 6) {
                                result = false
                            }
                            break
                        }
                        case 8: {
                            if (el.product_type !== 7) {
                                result = false
                            }
                            break
                        }
                        case 9: {
                            if (el.product_type !== 8) {
                                result = false
                            }
                            break
                        }
                        default: {
                        }
                    }
                }

                if (result && statusValue) {
                    switch (statusValue) {
                        case 1: {
                            if (el.statusValue && !el.statusValue) {
                                result = false
                            }
                            break
                        }
                        case 2: {
                            if (el.statusValue) {
                                result = false
                            }
                            break
                        }
                        case 3: {
                            if (!el.statusValue) {
                                result = false
                            }
                            break
                        }
                        default: {
                        }
                    }
                }

                return result // true, false
            })
        }
        return []
    }, [data, tableSelect, search])

    const slicedRows = useMemo(() => {
        return filteredRows.slice((page - 1) * perPage, page * perPage)
    }, [page, filteredRows])

    const totalPage = Math.ceil(filteredRows.length / perPage)

    function openModal() {
        setIsOpen(true)
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00'
    }

    function closeModal() {
        setIsOpen(false)
    }

    const getProduct = async () => {
        if (!_.isNil(supplier)) {
            const data = await getSupplierProduct(supplier)
            if (data && data.rows) {
                // console.log(data)
                setData(data)
            }
        }
    }

    useEffect(() => {
        getProduct()
    }, [supplier])

    useEffect(() => {
        setQuery({ page: 1 })
    }, [supplier, tableSelect, search])

    //TODO:search完 清url
    return (
        <>
            <div className={styles.page}>
                <div className="container">
                    <div className="row justify-content-between align-items-baseline mb-4">
                        <div className={styles.name}>商品管理</div>
                        <div
                            className={styles.addProduct}
                            onClick={() => openModal()}
                        >
                            新增商品
                        </div>
                    </div>
                </div>
                <ProductTableSelect />
                <ProductTable
                    data={slicedRows}
                    onDeleted={getProduct}
                    onUpdate={getProduct}
                />
                <div className="container">
                    <div className={styles.pagination}>
                        {totalPage > 1 && (
                            <Pagination page={page} totalPage={totalPage} />
                        )}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <AddProduct
                    onClose={closeModal}
                    isNew={true}
                    onUpdate={getProduct}
                />
            </Modal>
        </>
    )
}

export default ManageList
