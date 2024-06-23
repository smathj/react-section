import Header from '../components/Header.jsx'
import Button from '../components/Button.jsx'
import Editor from '../components/Editor.jsx'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { DiaryDispatchContext } from '../App.jsx'
import usePageTitle from '../hooks/usePageTitle.jsx'

const New = () => {

  const { onCreate } = useContext(DiaryDispatchContext)
  const nav = useNavigate()

  usePageTitle('새 일기 쓰기')

  const onSubmit = (input) => {
    onCreate(
      input.createdDate.getTime(),
      input.emotionId,
      input.content,
    )
    nav('/', { replace: true }) // 뒤로가기 방지
  }

  return (
    <div>
      <Header title={'새 일기 쓰기'}
              leftChild={
                <Button text={'< 뒤로가기'}
                        onClick={() => nav(-1)} />
              }
      />
      {/*작성폼 컴포넌트*/}
      <Editor onSubmit={onSubmit} />
    </div>
  )
}

export default New