import './App.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import New from './pages/New.jsx'
import Diary from './pages/Diary.jsx'
import Notfound from './pages/Notfound.jsx'
import { getEmotionImage } from './utils/get-emotion-image.js'
import Button from './components/Button.jsx'


function App() {

  // CSR 방식 이동
  const nav = useNavigate()

  const onClickButton = () => {
    nav('/')
  }

  // 1. "/" : 모든 일기를 조회하는 Home 페이지
  // 2. "/new" : 새로운 일기를 작성하는 New 페이지
  // 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
  return (
    <>
      <Button />
      <div>
        <img src={getEmotionImage(1)} />
        <img src={getEmotionImage(2)} />
        <img src={getEmotionImage(3)} />
        <img src={getEmotionImage(4)} />
        <img src={getEmotionImage(5)} />
      </div>

      {/*! 이 부분은 모든 페이지에 랜더링된다*/}
      {/*! 공통 요소는 여기에 사용할 수 있겠지 */}
      <div>
        {/*a 태그 대체한다, CSR 방식 이동*/}
        <Link to={'/'}>Home</Link>
        <Link to={'/new'}>New</Link>
        <Link to={'/diary'}>Diary</Link>
      </div>
      <button onClick={onClickButton}>New 페이지 이동</button>
      <Routes>
        {/* Routes 컴포넌트 안에는 Route 컴포넌트만 사용할 수 있다 */}
        <Route path={'/'} element={<Home />}></Route>
        <Route path={'/new'} element={<New />}></Route>
        <Route path={'/diary/:id'} element={<Diary />}></Route>
        <Route path={'*'} element={<Notfound />}></Route> {/*! switch 의 default 와 비슷함 */}
      </Routes>
    </>
  )
}

export default App
