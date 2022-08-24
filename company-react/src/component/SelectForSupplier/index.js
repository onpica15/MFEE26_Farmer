import styles from './SelectForSupplier.module.css'
import Select from 'react-select'
import React, { useState } from 'react'

const customStyles = {
  control: () => ({
    width: '100%',
    height: 30,
    border: '1px solid #333333',
    display: 'flex',
    borderRadius: 2,
    marginBottom: 10,
    cursor: 'pointer',
  }),
  singleValue: (provided, state) => {
    return { ...provided, fontSize: 16 }
  },
  menu: (provided, state) => ({ ...provided, width: '100%', fontSize: 16 }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'grey' : 'transparent',
    ':active': {
      backgroundColor: 'lightgrey',
    },
  }),
  placeholder: (provided, state) => ({ ...provided, fontSize: 16 }),
}

function SelectForSupplier(props) {
  // const [selectedOption, setSelectedOption] = useState(null)

  return (
    <>
      <Select
        styles={customStyles}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        options={props.option}
      />
    </>
  )
}
export default SelectForSupplier

//TODO:寬度設定改成％
