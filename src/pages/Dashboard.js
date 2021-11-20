import { GlobalCtx } from "../App";
import { useContext, useEffect, useState, useRef } from "react";

const Dashboard = (props) => {
    const { globalState, setGlobalState } = useContext(GlobalCtx);
    const { url, token } = globalState;
    const [notes, setNotes] = useState(null);
    const getNotes = async() => {
        const response = await fetch(url + "/note/", {
            method: 'get',
            headers: {
                Authorization: "bearer " + token
            }
        })
        const data = await response.json()
        setNotes(data);
    }
    useEffect(() => {
        getNotes()
    }, []);
    //pulling from dom
    const input = useRef(null)
    const handleClick = () => {
        console.log(input)
        const note = input.current.value
        fetch(url + "/note/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`
            },
            body: JSON.stringify({note})
        })
        .then(response=>response.json())
            .then(data => {
                input.current.value = ''
                getNotes()
            })
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>New Note</h2>
            <input type="text" name="note" ref={input} />
            <button onClick={handleClick}>Create Note</button>
            <h2>Notes</h2>
            <ul>
                {notes? notes.map((note) => {
                    return<li
                    key={note._id}>
                    {note.note}
                    </li>
                }):null}
            </ul>
        </div>
    )
}
export default Dashboard;