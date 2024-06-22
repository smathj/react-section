import Button from './Button.jsx'
import './DiaryList.css'
import DairyItem from './DairyItem.jsx'
import React from 'react'

const DiaryList = () => {
  return (
    <div className={'DiaryList'}>
      <div className={'menu_bar'}>
        <select>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된 순</option>
        </select>
        <Button text={'새 일기 쓰기'} type={'POSITIVE'} />
      </div>
      <div className={'list_wrapper'}>
        <DairyItem />
      </div>
    </div>
  )

}

export default DiaryList