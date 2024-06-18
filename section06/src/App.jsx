import { useState } from 'react'
import './App.css'
import Viewer from './components/Viewer.jsx'
import Controller from './components/Controller.jsx'

function App() {

  const [count, setCount] = useState(0)

  const onClickButton = (value) => {
    console.log(value)
    setCount(count + value)
  }

  return (
    <>

      <div className={'App'}>
        <h1>Simple Counter</h1>

        <section>
          <Viewer count={count} />
        </section>

        <section>
          <Controller onClickButton={onClickButton} />
        </section>
      </div>

    </>
  )
}

export default App
