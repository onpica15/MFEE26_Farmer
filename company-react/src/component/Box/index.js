function Box(props) {
  return (
    <>
      <div
        style={{
          width: '100%',
          paddingTop: '100%',
          height: 0,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {props.children}
        </div>
      </div>
    </>
  )
}
export default Box
