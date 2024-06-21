import { memo, useContext } from 'react'
import { TodoDispatchContext } from '../App.jsx'

const TodoItem = ({ id, isDone, content, date }) => {

  const { onUpdate, onDelete } = useContext(TodoDispatchContext)

  const onChangeCheckbox = () => {
    onUpdate(id)
  }

  const onClickDeleteButton = () => {
    onDelete(id)
  }

  return (
    <div className={'TodoItem'}>
      <input onChange={onChangeCheckbox} checked={isDone} type={'checkbox'} />
      <div className={'content'}>{content}</div>
      <div className={'date'}>{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  )
}

// export default TodoItem;

// 고차 컴포넌트 (HOC)
// export default memo(TodoItem, (prevProps, nextProps) => {
//   // 반환값에 따라, Props가 바뀌었는지 안바뀌었는지 판단
//   // T -> Props 바뀌지 않음 -> 리렌더링 X
//   // F -> Props 바뀜 -> 리렌더링 O
//
//   if (prevProps.id !== nextProps.id) return false
//   if (prevProps.isDone !== nextProps.isDone) return false
//   if (prevProps.content !== nextProps.content) return false
//   if (prevProps.date !== nextProps.date) return false
//
//   return true
// })

// props 가 변하지않으면 캐싱으로 사용
export default memo(TodoItem)