import { createContext, useCallback, useContext, useReducer, useRef, useState } from 'react'
import './App.css'
import './Editor.css'
import './List.css'
import './TodoItem.css'
import Header from './compoenents/Header.jsx'
import Editor from './compoenents/Editor.jsx'
import List from './compoenents/List.jsx'


const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'React 공부하기',
    // content: "React 공부하기",
    date: new Date().getTime(), // 타임스탬프
  },
  {
    id: 1,
    isDone: false,
    content: '빨래하기',
    // content: "헬스 등",
    date: new Date().getTime(), // 타임스탬프
  },
  {
    id: 2,
    isDone: false,
    content: '노래 연습하기',
    // content: "삼겹살 먹기",
    date: new Date().getTime(), // 타임스탬프
  },
]

function reducer(todos, action) {
  switch (action.type) {

    case 'CREATE':
      return [action.data, ...todos]
    case 'UPDATE':
      return todos.map((item) => item.id === action.targetId ? { ...item, isDone: !item.isDone } : item)
    case 'DELETE':
      return todos.filter((item) => item.id !== action.targetId)
    default:
      return todos
  }
}

export const TodoContext = createContext()

function App(callback, deps) {

  const [todos, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(3)


  const onCreate = useCallback((content) => {

    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    })
  }, [])

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    })
  }, [])


  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    })
  }, [])


  return (
    <div className={'App'}>

      <Header />
      <TodoContext.Provider value={{
        todos,
        onCreate,
        onUpdate,
        onDelete,
      }}>
        <Editor />
        <List />
      </TodoContext.Provider>

    </div>
  )
}

export default App
