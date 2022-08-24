import React, { useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './PickTime.module.css'
import clsx from 'clsx'

function PickTime(props) {
    const { value, onChange } = props
    const input1Ref = useRef(undefined)
    const input2Ref = useRef(undefined)

    return (
        <div className={clsx(styles.pickTime, 'row')}>
            <div className="col-6">
                <input
                    className={styles.input}
                    ref={input1Ref}
                    type="checkbox"
                    defaultChecked={!value}
                    onChange={(e) => {
                        if (e.target.checked) {
                            onChange(null)
                            input2Ref.current.checked = false
                        } else {
                            onChange(new Date())
                            input2Ref.current.checked = true
                        }
                    }}
                />
                <label style={{ paddingLeft: '10px' }}>立即上架</label>
            </div>
            <div className="col-6">
                <input
                    className={styles.input}
                    ref={input2Ref}
                    type="checkbox"
                    defaultChecked={!!value}
                    onChange={(e) => {
                        if (e.target.checked) {
                            onChange(new Date())
                            input1Ref.current.checked = false
                        } else {
                            onChange(null)
                            input1Ref.current.checked = true
                        }
                    }}
                />
                <label style={{ paddingLeft: '10px' }}>預約時間：</label>
                <DatePicker
                    selected={value}
                    onChange={onChange}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    style={{ cursor: 'pointe' }}
                />
            </div>
        </div>
    )
}
export default PickTime
