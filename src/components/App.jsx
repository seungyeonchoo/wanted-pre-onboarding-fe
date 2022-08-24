import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import List from './List';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/todo' element={<List />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
