import './List.css';
import Item from './Item'
import Input from './Input';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function List() {

    const navigate = useNavigate();
    const [todoItems, setTodoItems] = useState([]);
    
    useEffect(() => {
        if(!localStorage.getItem('access')) {
            navigate('/', {replace:false})
        }
    },[])

    useEffect(() => { getList() }, []
    )

    function getList(){
        axios.get('https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/todos', {headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access')
        }})
        .then((response) => {
            setTodoItems(response.data)
        })
    }

    function delItem(itemId){
        axios.delete('https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/todos/' + itemId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access')
        }})
        .then((response) => {
            setTodoItems(todoItems.filter((item,index) => {
                return item.id !== itemId;
            }))
        }
        )
    };

    function editItem(targetId, todo, isCompleted){
        axios.put('https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/todos/' + targetId, {
            todo,
            isCompleted
    }, {
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access'),
                    'Content-Type': 'application/json',
                }
            }
        )
        .then(response => {
            setTodoItems(
                todoItems.map((item) => 
                    item.id === response.data.id ? response.data : item
                ));
        })
    };
    
    function addItem(inputValue){
        setTodoItems(prevList => {
            return [...prevList, inputValue];
        });
        console.log(todoItems);
    }
    function handleLogOut() {
        localStorage.removeItem('access');
        navigate('/', {replace:false});
    }

    return (
        <div className="todolist">
        <h1 className="todo-title">To Do List!</h1>
        <Input 
            addItem={addItem} 
            />
        <div className="todo-box">
        <ul className="todo-items"> 
        {todoItems.map((item, index) => 
          <Item 
          key={index}
          id={item.id}
          todo={item.todo}
          onClick={delItem}
          editItem={editItem}
          isCompleted={item.isCompleted}
          />
        )}
        </ul>
        </div>
        <div onClick={handleLogOut} className='log-out'>로그아웃</div>
        </div>
    )
}

export default List;