import {useRef, useState} from 'react'
import './App.css';
import './Editor.css';
import './List.css';
import './TodoItem.css';
import Header from "./compoenents/Header.jsx";
import Editor from "./compoenents/Editor.jsx";
import List from "./compoenents/List.jsx";


const mockData = [
    {
        id: 0,
        isDone: false,
        content: "React 공부하기",
        date: new Date().getTime(), // 타임스탬프
    },
    {
        id: 1,
        isDone: false,
        content: "빨래하기",
        date: new Date().getTime(), // 타임스탬프
    },
    {
        id: 2,
        isDone: false,
        content: "노래 연습하기",
        date: new Date().getTime(), // 타임스탬프
    },
];

function App() {

    const [todos, setTodos] = useState(mockData);
    const idRef = useRef(3);
    const onCreate = (content) => {
        const newTodo = {
            id: idRef.current++,
            isDone: false,
            content: content,
            date: new Date().getTime(),
        }

        setTodos([newTodo, ...todos])
    }


    return (
        <div className={'App'}>
            <Header/>
            <Editor onCreate={onCreate}/>
            <List todos={todos}/>
        </div>
    )
}

export default App
