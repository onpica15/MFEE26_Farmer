import styles from './ProductHashTag.module.css'
import clsx from 'clsx'

function ProductHashTag(props) {
  // const [collect, setCollect] = useState(false)

  return (
    <>
      <div
        className={clsx(styles.hashTag, props.className)}
        onClick={() => {
          // setCollect((prev) => !prev)
          props.onClick()
        }}
      >
        <h5
          className={clsx(styles.hashTagH, { [styles.active]: props.checked })}
        >
          #{props.hashTag}
        </h5>
      </div>
    </>
  )
}

export default ProductHashTag
