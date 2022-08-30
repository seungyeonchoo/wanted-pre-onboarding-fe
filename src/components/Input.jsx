import axios from "axios";
import { useRef, useState } from "react";

function Input(props) {

    let [inputValue, setInputValue] = useState('');

    function createItem(){
        axios.post('https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/todos', {
            todo : inputValue  
        }, {headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access'),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        
        }})
        .then((response) => {
            console.log(response);
            props.addItem(response.data)
        }
        )
    }

    function inputChange(e) {
        setInputValue(e.target.value);
        console.log(inputValue);
    }

    return (
        <form className="todo-input">
            <input className="todo-item-input" value={inputValue} onChange={inputChange} type="text" placeholder="해야 할 일을 입력하세요." />
            <button 
            className="todo-item-addbtn" 
            onClick={(e) => {
                (inputValue) &&
                createItem();
                setInputValue("");
                e.preventDefault();
            }}
            type="submit">+</button>
        </form>
    )
}

export default Input;