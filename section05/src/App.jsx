import './App.css'

import Header from './components/Header' // vite 에서는 확장자 생략가능
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx'
import Button from './components/Button.jsx'

// App 컴포넌트
function App() {

    const buttonProps = {
      text: '메일',
      color: 'black',
      a: 1,
      b: 2,
      c: 3,
    }
    
  return (
    <>
      <Button {...buttonProps} />
      {/*<Button text={'메일'} color={'red'} />*/}
      <Button text={'카페'} />
        <Button text={'블로그'}>
            <div>자식요소</div>
            <Header/>
        </Button>
    </>
  )
}

export default App
