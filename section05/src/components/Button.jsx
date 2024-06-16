const Button = (props) => {
    console.log(props)

    const { text, color, children } = props
    
  return (
    <>
      <button style={{ color }}>
        {text} - {color.toUpperCase()}
          {children}
      </button>
    </>
  )
}

// 컴포넌트의 디폴트 프로퍼티 셋팅
Button.defaultProps = {
    color: "black"
}

export default Button
