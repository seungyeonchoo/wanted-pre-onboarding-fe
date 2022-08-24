import axios from "axios";
import { useEffect, useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();
    
    const [signUpMessage, setSignUpMessage] = useState('');
    
    let [userInfo, setUserInfo] = useState({
        email:'',
        password:''
    })

    const [clickRegister, setClickRegister] = useState(false);

    function clickToRegister() {
        setClickRegister(!clickRegister)
        setUserInfo({
            email:"",
            password:""
        })
    }

    const [isValidInput, setIsValidInput] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('access')) {
            navigate('/todo', {replace:false})
        } 
    },[])

    function signUp() {
        axios.post('https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup', {
        email: userInfo.email,
        password: userInfo.password
    }, {headers: {
        'Content-Type': 'application/json'
    }})
    .then((response) => {
        localStorage.setItem('access',response.data.access_token)
        setSignUpMessage("회원가입이 완료되었습니다.");
        setUserInfo({
            email:"",
            password:""
        })
        setClickRegister(false);
        setIsValidInput(false);
    })
    .catch((err) => {
        setSignUpMessage(err.response?.data.message || err);
    })
}

    function signIn() {
        axios.post('https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin', {
        email: userInfo.email,
        password: userInfo.password
    }, {headers: {
        'Content-Type': 'application/json'
    }})
    .then((response) => {
        localStorage.setItem('access',response.data.access_token)
        navigate('/todo')
    })
    .catch((err) => {
        setSignUpMessage(err.response?.data.message || err);
    })
    }

    function onClickButton() {
        if (clickRegister) {
            signUp()
        } else {
            signIn()
        }
        setSignUpMessage('')
    }

    function setUserEmail(e) {
        const userEmail = e.target.value;
        setUserInfo(prevValue => {
            return{
                email:userEmail,
                password:prevValue.password
            }
        })
        handleIsValidInput();
    }

    function setUserPassword(e) {
        const userPassword = e.target.value;
        setUserInfo(prevValue => {
            return{
                email:prevValue.email,
                password:userPassword
            }
        })
        handleIsValidInput();
    }

    function handleIsValidInput() {
        const emailCheck = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g;
        const passwordCheck = /^.{8,}$/g;
        const isChecked = emailCheck.test(userInfo.email) && passwordCheck.test(userInfo.password);
        setIsValidInput(isChecked);
    }

    return (
        <>
            <div className="login-box">
            <h1>{!clickRegister ? "로그인 정보를 입력해주세요." : "회원가입 정보를 입력해주세요."}</h1>
            <input type="email" placeholder="E-mail을 입력해 주세요" onChange={setUserEmail} value={userInfo.email} />
            <input type="password" placeholder="비밀번호를 입력해 주세요" onChange={setUserPassword} value={userInfo.password} />
            { signUpMessage }
            <button onClick={onClickButton} className="login-btn" disabled={!isValidInput}>{!clickRegister ? "로그인" : "회원가입"}</button>
            <span onClick={clickToRegister} className="register-button">{!clickRegister ? " 회원가입" : " 로그인"}</span>
            </div>
        </>
        
    )
}

export default Login;