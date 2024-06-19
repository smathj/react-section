import { useEffect, useState } from 'react'

const Even = () => {

  useEffect(()=> {
    // 클린업, 정리함수 useEffect 가 끝날때 호출된다
    console.log('설정함수')
    return () => {
      console.log('정리함수 unmount')
    }
  }, [])

  return <div>짝수입니다</div>
}

export default Even
