import Header from '../components/Header.jsx'
import Button from '../components/Button.jsx'
import DiaryList from '../components/DiaryList.jsx'
import { useContext, useState } from 'react'
import { DiaryStateContext } from '../App.jsx'
import usePageTitle from '../hooks/usePageTitle.jsx'


/**
 * 컴포넌트 외부에서 함수 정의
 */
const getMonthlyData = (pivotDate, data) => {

  // 해당 월의 시작일 : 1일 0시 0분 0초 => 타임 스탬프
  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime()

  // 해당 월의 마지막일 : 월을 1늘리고 일자를 0으로해서 말일 => 타임 스탬프
  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime()

  return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime)
}

const Home = () => {

  const data = useContext(DiaryStateContext)

  const [pivotDate, setPivotDate] = useState(new Date())

  usePageTitle('감정 일기장')

  const monthlyData = getMonthlyData(pivotDate, data)


  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
  }
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
  }

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={'<'} onClick={onDecreaseMonth} />}
        rightChild={<Button text={'>'} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  )
}

export default Home