import { useContext, useMemo, useState } from 'react'
import { TodoStateContext } from '../App.jsx'
import TodoItem from './TodoItem.jsx'

const List = () => {

  // 이때는 객체로 안넘겼기 때문에 바로 받는다
  const todos = useContext(TodoStateContext)


  const [search, setSearch] = useState('')

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }


  const getFilteredData = () => {
    if (search === '') {
      return todos
    }
    return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()))
  }

  const filteredTodos = getFilteredData()    // 호출!!!

  /*
    const getAnalyzeData = () => {
      console.log('getAnalyzeData 호출')
      const totalCount = todos.length
      const doneCount = todos.filter((todo) => todo.isDone).length
      const notDoneCount = totalCount - doneCount

      return { totalCount, doneCount, notDoneCount }

    }
   */

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log('useMemo 호출')
    const totalCount = todos.length
    const doneCount = todos.filter((todo) => todo.isDone).length
    const notDoneCount = totalCount - doneCount

    return { totalCount, doneCount, notDoneCount }

  }, [todos])  // 콜백함수, 의존성 배열

  // const { totalCount, doneCount, notDoneCount } = getAnalyzeData()


  return (
    <div className={'List'}>
      <h4>Todo List 🪴</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>
      <input value={search} onChange={onChangeSearch} placeholder={'검색어를 입력해주세요'} />
      <div className={'todos_wrapper'}>
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />
        })}
      </div>
    </div>
  )
}

export default List