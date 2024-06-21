import { memo } from 'react'

const Header = () => {


  return (<div className={'Header'}>
    <h3>오늘은 📅</h3>
    <h1>{new Date().toDateString()}</h1>
  </div>)
}

// 렌더링 최적화

// 1
// export default Header

// 2
// const memorizedHeader = memo(Header)
// export default memorizedHeader

// 3
export default memo(Header)
