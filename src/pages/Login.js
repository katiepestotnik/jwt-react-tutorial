import { GlobalCtx } from "../App";
import { useContext, useState } from "react";

const Login = (props) => {
    const { globalState, setGlobalState } = useContext(GlobalCtx)
    const { url } = globalState
    const blank = {
        username: '',
        password: ''
    }
    const [form, setForm] = useState(blank)
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        const {username, password} = form
        e.preventDefault();
        //signup route
        fetch(`${url}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(response=>response.json())
            .then(data => {
                console.log(data);
                //allows user to refresh page without resigning in
                window.localStorage.setItem("token", JSON.stringify(data));
                setGlobalState({...globalState, token: data.token})
                setForm(blank);
                props.history.push('/')
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={form.username} onChange={handleChange}></input>
                <input type="password" name="password" value={form.password} onChange={handleChange}></input>
                <input type="submit" value="Login"></input>
            </form>
        </div>
    )
}
export default Login;