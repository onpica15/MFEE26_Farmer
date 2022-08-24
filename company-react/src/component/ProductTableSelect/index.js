import styles from './ProductTableSelect.module.css'
import { useDispatch, useSelector } from 'react-redux'
import SearchForSupplier from '../SearchForSupplier'
import SelectForSupplier from '../SelectForSupplier'
import { updateTableSelect } from '../../store/slices/product'

const optionType = [
    { value: 1, label: '全部商品' },
    { value: 2, label: '蔬菜類' },
    { value: 3, label: '水果類' },
    { value: 4, label: '豬肉類' },
    { value: 5, label: '雞肉類' },
    { value: 6, label: '牛肉類' },
    { value: 7, label: '羊肉類' },
    { value: 8, label: '魚類' },
    { value: 9, label: '甲殼類' },
]
const optionForStatus = [
    { value: 1, label: '全部商品狀態' },
    { value: 2, label: '上架中' },
    { value: 3, label: '下架' },
]
const optionForInventory = [
    { value: 1, label: '全部商品庫存' },
    { value: 2, label: '商品剩餘少於10' },
    { value: 3, label: '商品庫存在11到20之間' },
    { value: 4, label: '商品庫存大於20' },
]

function ProductTableSelect() {
    const dispatch = useDispatch()
    const tableSelect = useSelector((state) => state.product.tableSelect)
    const { type, status, inventory } = tableSelect

    const handleChange = (newValue) => {
        dispatch(updateTableSelect(newValue))
    }

    return (
        <>
            <div className="container">
                <div className={styles.selects}>
                    <div className={styles.select_component}>
                        <SelectForSupplier
                            option={optionType}
                            placeholder="查看商品"
                            value={type}
                            onChange={(type) => handleChange({ type })}
                        />
                    </div>
                    <div className={styles.select_component}>
                        <SelectForSupplier
                            option={optionForStatus}
                            placeholder={'商品狀態'}
                            value={status}
                            onChange={(status) => handleChange({ status })}
                        />
                    </div>
                    <div className={styles.select_component}>
                        <SelectForSupplier
                            option={optionForInventory}
                            placeholder={'商品庫存'}
                            value={inventory}
                            onChange={(inventory) =>
                                handleChange({ inventory })
                            }
                        />
                    </div>
                    <SearchForSupplier />
                </div>
            </div>
        </>
    )
}

export default ProductTableSelect
