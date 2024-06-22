import { createContext, useCallback, useContext, useMemo, useReducer, useRef, useState } from 'react'
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

export const TodoStateContext = createContext()
export const TodoDispatchContext = createContext()

function App(callback, deps) {

  const [todos, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(3)

  // App 컴포넌트가 랜더링 될떄마다 생성됨
  const onCreate = useCallback((content) => {

    let action = {
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    }
    dispatch(action)
  }, [])

  // App 컴포넌트가 랜더링 될떄마다 생성됨
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    })
  }, [])

  // App 컴포넌트가 랜더링 될떄마다 생성됨
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    })
  }, [])

  //! App 컴포넌트가 랜더링 될떄마다 생성되는걸 캐싱
  //! 세 함수를 다시는 생성 하지 않도록 함
  const memoizedDispatch = useMemo(() => {
    return {
      onCreate,
      onUpdate,
      onDelete,
    }
  }, [])  // 마운트 이후로 변하지않음

  return (
    <div className={'App'}>

      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>

    </div>
  )
}

export default App
