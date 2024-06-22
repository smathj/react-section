import './DairyItem.css'
import { getEmotionImage } from '../utils/get-emotion-image.js'
import Button from './Button.jsx'
import { useNavigate } from 'react-router-dom'

const DairyItem = ({ id, content, createDate, emotionId }) => {

  const nav = useNavigate()


  return (
    <div className={'DairyItem'}>
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImage(emotionId)} />
      </div>

      <div className={'info_section'}>
        <div className={'created_date'}>
          {new Date(createDate).toLocaleDateString()}
        </div>
        <div className={'content'}>
          {content}
        </div>
      </div>

      <div className={'button_section'}>
        <Button text={'수정하기'} />
      </div>
    </div>
  )
}

export default DairyItem

