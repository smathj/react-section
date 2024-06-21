import { useContext, useRef, useState } from 'react'
import { TodoDispatchContext } from '../App.jsx'


const Editor = () => {
  const { onCreate } = useContext(TodoDispatchContext)

  const [content, setContent] = useState('')
  const contentRef = useRef()
  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit()
    }
  }
  const onSubmit = () => {
    if (content === '') {
      contentRef.current.focus()
      return
    }


    onCreate(content)
    setContent('')
  }

  return (
    <div className={'Editor'}>
      <input
        onKeyDown={onKeyDown}
        ref={contentRef}
        value={content} onChange={onChangeContent} placeholder={'새로운 Todo...'} />
      <button onClick={onSubmit}>추가</button>
    </div>
  )
}

export default Editor