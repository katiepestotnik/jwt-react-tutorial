import { GlobalCtx } from "../App";
import { useContext, useEffect, useState, useRef } from "react";

const Dashboard = (props) => {
    const { globalState, setGlobalState } = useContext(GlobalCtx);
    const { url, token } = globalState;
    const [notes, setNotes] = useState(null);
    const [updateId, setUpdateId] = useState(null);
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
    const input = useRef(null);
    const update = useRef(null);
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
    const handleUpdate = () => {
        const note = update.current.value
        fetch(url + "/note/" + updateId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`
            },
            body: JSON.stringify({note})
        })
        .then(response=>response.json())
            .then(data => {
                update.current.value = '';
                setUpdateId(null);
                getNotes();
            })
    }
    const handleDelete = (id) => {
        fetch(url + "/note/" + id, {
            method: "DELETE",
            headers: {
                Authorization: `bearer ${token}`
            },
        })
        .then(response=>response.json())
            .then(data => {
                getNotes()
            })
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>New Note</h2>
            <input type="text" name="note" ref={input} />
            <button onClick={handleClick}>Create Note</button>
            <h2>Update Note</h2>
            <input type="text" name="note" ref={update} />
            <button onClick={handleUpdate}>Update Note</button>
            <h2>Notes</h2>
            <ul>
                {notes? notes.map((note) => {
                    return<li
                    key={note._id}><h3>
                            {note.note}</h3>
                        <button onClick={() => {
                            handleDelete(note._id)
                        }}>Delete</button><button onClick={() => {
                            setUpdateId(note._id)
                            update.current.value = note.note;
                        }}>Edit</button>
                    </li>
                }):null}
            </ul>
        </div>
    )
}
export default Dashboard;