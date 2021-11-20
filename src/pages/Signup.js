import { GlobalCtx } from "../App";
import { useContext, useState } from "react";

const Signup = (props) => {
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
        fetch(`${url}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(response=>response.json())
            .then(data => {
                console.log(data);
                setForm(blank);
                props.history.push('/login')
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={form.username} onChange={handleChange}></input>
                <input type="password" name="password" value={form.password} onChange={handleChange}></input>
                <input type="submit" value="signup"></input>
            </form>
        </div>
    )
}
export default Signup;