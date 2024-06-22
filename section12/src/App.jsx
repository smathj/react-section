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
    createDate: new Date().getTime(),
    emotionId: 1,
    content: '1번 일기 내용',
  },
  {
    id: 2,
    createDate: new Date().getTime(),
    emotionId: 2,
    content: '2번 일기 내용',
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


const DiaryStateContext = createContext()
const DiaryDispatchContext = createContext()


function App() {

  const [data, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(3)

  // 새로운 일기 추가
  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    })

  }
  // 기존 일기 수정
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createDate,
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

/*

  // CSR 방식 이동
  const nav = useNavigate()

  const onClickButton = () => {
    nav('/')
  }



<Header title={'Header'}
        leftChild={<Button text={'Left'} />}
        rightChild={<Button text={'Right'} />}
/>

<Button text={'짖어'}
        onClick={() => console.log('기본')}
        type={'DEFAULT'}
/>
<Button text={'긍정적'}
        onClick={() => console.log('긍정적')}
        type={'POSITIVE'}
/>
<Button text={'부정적'}
        onClick={() => console.log('부정정')}
        type={'NEGATIVE'}
/>
*/
