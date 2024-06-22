import Button from './Button.jsx'
import './DiaryList.css'
import DairyItem from './DairyItem.jsx'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DiaryList = ({ data }) => {

  const nav = useNavigate()

  // 리랜더링을 위한 state
  const [sortType, setSortType] = useState('latest')

  const onChangeSortType = (e) => {
    setSortType(e.target.value)
  }

  const getSortedDate = () => {
    // 정렬된 새로운 데이터를 반환한다, 내부에 정렬 함수를 구현한다
    return data.toSorted((a, b) => {
      // 오름 차순
      if (sortType === 'oldest') {
        return Number(a.createDate) - Number(b.createDate)
        // 내림 차순
      } else {
        return Number(b.createDate) - Number(a.createDate)
      }
    })
  }

  const sortedData = getSortedDate()

  return (
    <div className={'DiaryList'}>
      <div className={'menu_bar'}>
        <select onChange={onChangeSortType}>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된 순</option>
        </select>
        <Button onClick={() => {
          nav('/new')
        }} text={'새 일기 쓰기'} type={'POSITIVE'} />
      </div>
      <div className={'list_wrapper'}>
        {sortedData.map((item) => {
          return <DairyItem key={item.id} {...item} />
        })}

      </div>
    </div>
  )

}

export default DiaryList