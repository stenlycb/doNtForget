
import { Button, TextField, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import useMakeRequest from "../hooks/useMakeRequest";
import { URL } from "../services/Create";

const Create = (props) => {

    const params = useParams();

    const [title, setTitle] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [date, setDate] = useState('');
    const [onSaveMode, setOnSaveMode] = useState(false);
    const [elementLoaded, setElementLoaded] = useState(false);
    const [reqData, makeRequest] = useMakeRequest();


    const clearFormData = () => {
        setTitle('');
        setThoughts('');
    }

    /**
     * 
     */
    const save = async () => {

        let noteData = {};
        let method = 'post';
        let _url = URL;

        // onEditMode
        if (params.id !== undefined && params.id !== null && params.id !== '') {
            method = 'put';
            _url += `/${params.id}`;
        }

        if (title !== undefined && title !== "") {
            noteData['title'] = title;
        }
        if (thoughts !== undefined && noteData['title'] !== undefined) {
            noteData['thoughts'] = thoughts;
        }

        const request = {
            url: _url,
            method: method,
            data: noteData,
        }

        if (Object.keys(noteData).length > 0) {
            setOnSaveMode(true);
            await makeRequest(request);
        }
    }

    /**
     * 
     * @param {*} e 
     * @param {*} type 
     */
    const handleChange = (e, type) => {

        if (type === 'title') {
            setTitle(e.target.value);
        }

        if (type === 'thoughts') {
            setThoughts(e.target.value);
        }
    }


    const loadElementForEdit = async () => {

        // get element
        console.log(params);

        const request = {
            url: URL,
            method: 'get',
        }

        await makeRequest(request);
        checkDataAndSet();
    }


    const checkDataAndSet = () => {


        // set data in fields
        if (reqData[params.id] !== undefined && Object.keys(reqData[params.id]).length > 0) {

            setElementLoaded(true);

            if (reqData[params.id].title !== undefined) {
                setTitle(reqData[params.id].title);
            }

            if (reqData[params.id].thoughts !== undefined) {
                setThoughts(reqData[params.id].thoughts);
            }
        }

    }

    /**
     * 
     */
    useEffect(() => {

        if (onSaveMode === true && reqData !== undefined && Object.keys(reqData).length > 0) {

            // alert("successful saved");
            clearFormData();
        }

        // call api to get data
        if (elementLoaded === false && params.id !== undefined && params.id !== null && params.id !== '') {
            loadElementForEdit();
        }

    }, [reqData]);


    return (

        <form className="create-note-form">
            <Grid item>
                <TextField id="standard-basic" label="Title" variant="standard" placeholder='title...' value={title} onChange={(e) => handleChange(e, "title")} />
            </Grid>
            <Grid item sx={{ maringTop: '10px' }}>
                <label htmlFor="note-thoughts"></label>
                <textarea id="note-thoughts" placeholder='My thoughts...' value={thoughts} onChange={(e) => handleChange(e, "thoughts")}></textarea>
            </Grid>
            <Grid item>
                <Button onClick={clearFormData}>Clear</Button>
                <Button onClick={save}>Save</Button>
            </Grid>
        </form>
    )

}


export default Create;