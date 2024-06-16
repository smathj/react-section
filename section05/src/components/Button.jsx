import {useState} from "react";

const Button = (props) => {
    console.log(props)

    const { text, color, children } = props

    let onClickButton = (e) => {
        console.log(e)
        console.log(text)
    };

    return (
    <>
      <button
          onClick={onClickButton}
          style={{ color }}>
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
