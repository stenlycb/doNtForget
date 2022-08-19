import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MainContext from "../context/MainContext";
import useMakeRequest from "../hooks/useMakeRequest";
import { URL } from "../services/Create";
import Note from "./Note";
import styleNote from "../css/note.module.css";

const Notes = () => {

    const { user } = useContext(MainContext);

    const [notes, setNotes] = useState([]);
    const [requestCalled, setRequestCalled] = useState(false);
    const [notesReq, makeRequest] = useMakeRequest();

    /**
     * 
     */
    const getNotes = async () => {

        const reqData = {
            url: URL,
            method: 'get',
        }

        await makeRequest(reqData);
    }

    /**
     * 
     * @param {*} id 
     */
    const onDeleteChild = async (id) => {

        console.log(`onDelete: ${id}`);
        console.log(notes);

        const reqData = {
            url: `${URL}/${id}`,
            method: 'delete',
        }

        await makeRequest(reqData);
        getNotes();
    }

    /**
     * 
     */
    useEffect(() => {

        // call once and mark it 
        if (!requestCalled) {
            getNotes();
            setRequestCalled(state => !state);
        }

        if (notesReq !== undefined && Object.keys(notesReq).length > 0) {

            let _notes = [];
            for (const i in notesReq) {
                if (notesReq[i].username === user.username) {
                    console.log(i, notesReq[i]);
                    _notes.push(notesReq[i]);
                }
            }
            setNotes(_notes);
        } else if (notesReq !== undefined && Object.keys(notesReq).length === 0 && notes.length > 0) {
            setNotes([]);
        }

    }, [notesReq]);


    return (

        <div className={styleNote.notes_box}>
            <h3>Notes</h3>

            <Grid container direction="row" justifyContent="center"
                alignItems="center" spacing={0}>

                {notes && Object.keys(notes).length > 0
                    ?
                    notes.map((element, index) => {
                        return <Note key={element._id} id={element._id}
                            title={element.title}
                            thoughts={element.thoughts}
                            priority={element.priority}
                            type={element.type}
                            modified={element.modified}
                            onDeleteMethod={onDeleteChild}
                        />
                    })

                    : <div>Loading... (or empty)</div>
                }

            </Grid>
        </div>

    )

}


export default Notes;