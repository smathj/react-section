// 간단한 회원 가입 폼
// 1. 이름
// 2. 생년월일
// 3. 국적
// 4. 자기소개
import { useRef, useState } from 'react'

const Register = () => {
  const [input, setInput] = useState({
    name: '',
    birth: '',
    country: '',
    bio: '',
  })

  // useRef 은 랜더링을 발생하지 않는다
  const countRef = useRef(0)
  const inputRef = useRef()

  const { name, birth, country, bio } = input

  const onChange = (e) => {
    countRef.current++
    console.log(countRef.current)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = () => {
    // input.name 이 입력되지 않았을때 => 이름을 입력하는 DOM 요소 포커스
    if (input.name === '') {
      // inputRef.current 은 input 태그를 가리킴
      inputRef.current.focus()
      console.dir(inputRef.current)
    }
  }

  return (
    <div>
      <div>
        <input
          ref={inputRef}
          name={'name'}
          placeholder={'이름'}
          type={'text'}
          onChange={onChange}
          value={name}
        />
      </div>

      <div>
        <input type={'date'} name='birth' onChange={onChange} value={birth} />
      </div>

      <div>
        <select value={country} onChange={onChange} name={'country'}>
          <option value=''></option>
          <option value='kr'>한국</option>
          <option value='us'>미국</option>
          <option value='uk'>영국</option>
        </select>
      </div>

      <div>
        <textarea value={bio} onChange={onChange} name={'bio'} />
      </div>

      <button onClick={onSubmit}>제출</button>
    </div>
  )
}

export default Register
