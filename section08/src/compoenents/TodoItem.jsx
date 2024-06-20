const TodoItem = ({id, isDone, content, date}) => {


    return (
        <div className={"TodoItem"}>
            <input readOnly={true} checked={isDone} type={"checkbox"}/>
            <div className={"content"}>{content}</div>
            <div className={"date"}>{new Date(date).toLocaleDateString()}</div>
            <button>삭제</button>
        </div>
    )
};

export default TodoItem;