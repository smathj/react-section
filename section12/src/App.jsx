import './App.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import New from './pages/New.jsx'
import Diary from './pages/Diary.jsx'
import Notfound from './pages/Notfound.jsx'
import { getEmotionImage } from './utils/get-emotion-image.js'
import Button from './components/Button.jsx'
import Header from './components/Header.jsx'
import Edit from './pages/Edit.jsx'
import { createContext, useReducer, useRef } from 'react'


const mockData = [
  {
    id: 1,
    createdDate: new Date('2024-06-23').getTime(),
    emotionId: 1,
    content: '1번 일기 내용',
  },
  {
    id: 2,
    createdDate: new Date('2024-06-22').getTime(),
    emotionId: 2,
    content: '2번 일기 내용',
  },
  {
    id: 3,
    createdDate: new Date('2024-05-05').getTime(),
    emotionId: 3,
    content: '3번 일기 내용',
  },
]


/**
 * 리듀서
 * @param state mockData
 * @param action 액션 객체
 * @returns {*[]}
 */
function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state]
    case 'UPDATE':
      return state.map((item) =>
        String(item.id) === String(action.data.id) ?
          action.data :
          item)
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.data.id))

  }
}


export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()


function App() {

  const [data, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(3)

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    })

  }
  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    })
  }

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      data: {
        id,
      },
    })
  }


  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}>
          <Routes>
            <Route path={'/'} element={<Home />}></Route>
            <Route path={'/new'} element={<New />}></Route>
            <Route path={'/diary/:id'} element={<Diary />}></Route>
            <Route path={'/edit/:id'} element={<Edit />}></Route>
            <Route path={'*'} element={<Notfound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
