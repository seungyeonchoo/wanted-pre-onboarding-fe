import { useState } from "react";


function Item(props) {
    const [editMode, setEditMode] = useState(false);
    const [isCompleted, setIsCompleted] = useState(props.isCompleted);
    let [itemChange, setItemChange] = useState('');

    function onEdit() {
        setEditMode(true);
    }

    function editedItem(e) {
        setItemChange(e.target.value);
    }

    function editCancle() {
        setEditMode(false);
    }
    
    return (
        <li key={props.id} className="todo-item">
        {editMode ? 
        <>
        <input onChange={editedItem} value={itemChange||''} className='edit-input' type='text' autoFocus />
        <div className="item-btn">
        <button onClick={() => {
            props.editItem(props.id, itemChange, isCompleted);
            setEditMode(false);
            setItemChange('');
        }}>제출</button>
        <button onClick={editCancle} >취소</button>
        </div>
        </>
        : 
        <>
        <input onChange={(e) => {
            props.editItem(props.id, props.todo, e.target.checked);
            setIsCompleted(e.target.checked);
        }} type="checkbox" checked={isCompleted} />
        <div className="item">{props.todo}</div>
        <div className="item-btn">
            <button onClick={onEdit} 
            className="edit-btn">수정</button>
            <button onClick={() => {
            props.onClick(props.id);
            }} className="del-btn">삭제</button>
        </div> 
        </>
        }
        </li>
    )
}

export default Item;   