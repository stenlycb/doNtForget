
import { Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import useMakeRequest from "../hooks/useMakeRequest";
import { URL } from "../services/Create";
import Alert from "./Alert";

const Create = (props) => {

    const params = useParams();

    const [title, setTitle] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [type, setType] = useState('text');
    const [priority, setPriority] = useState(2); // 1 high, 2 medium, 3 low
    const [checkboxes, setChecknboxes] = useState([]);
    const [onSaveMode, setOnSaveMode] = useState(false);
    const [elementLoaded, setElementLoaded] = useState(false);
    const [reqData, makeRequest] = useMakeRequest();

    const [showMessage, setShowMessage] = useState({});

    const reqDataRef = useRef({});

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
        } else if (title === undefined || (title !== undefined && title === "")) {
            setShowMessage({ message: "title is necessary", color: "#ff8e8e", textColor: "black" });
        }

        if (thoughts !== undefined && noteData['title'] !== undefined) {
            noteData['thoughts'] = thoughts;
        }
        if (priority !== undefined && noteData['title'] !== undefined) {
            noteData['priority'] = priority;
        }

        if (type !== undefined && noteData['title'] !== undefined) {
            noteData['type'] = type;
        }

        const request = {
            url: _url,
            method: method,
            data: noteData,
        }

        if (Object.keys(noteData).length > 0) {

            if (method === 'put') {
                noteData['_id'] = params.id;
            }

            const newDate = new Date();
            const date = newDate.getDate();
            const month = newDate.getMonth() + 1;
            const year = newDate.getFullYear();
            noteData['modified'] = `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;

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

        if (type === 'priority') {
            setPriority(e.target.value);
        }

        if (type === 'type') {
            setType(e.target.value);
        }
    }

    /**
     * 
     */
    const loadElementForEdit = async () => {

        // get element
        console.log(params);

        const request = {
            url: `${URL}/${params.id}`,
            method: 'get',
        }

        await makeRequest(request);
        checkDataAndSet();
    }


    /**
     * 
     */
    const checkDataAndSet = () => {

        // set data in fields
        if (reqData !== undefined && Object.keys(reqData).length > 0) {

            setElementLoaded(true);

            if (reqData.title !== undefined) {
                setTitle(reqData.title);
            }
            if (reqData.thoughts !== undefined) {
                setThoughts(reqData.thoughts);
            }
            if (reqData.priority !== undefined) {
                setPriority(reqData.priority);
            }
            if (reqData.type !== undefined) {
                setType(reqData.type);
            }
        }

    }

    /**
     * 
     */
    const messageShown = () => {
        setShowMessage({});
        console.log("messageShown() -> called");
    }

    /**
     * 
     */
    useEffect(() => {

        if (onSaveMode === true && reqData !== undefined && Object.keys(reqData).length > 0) {

            // alert("successful saved");
            // clean form when navigate changed
            if (params.id === undefined) {
                clearFormData();
            }

            if (JSON.stringify(reqData) !== JSON.stringify(reqDataRef.current)) {
                setShowMessage({ message: "success" });
                reqDataRef.current = reqData;
            } else {
                setShowMessage({ message: "already saved", color: "yellow", textColor: "black" });
            }

            console.log(reqData);
        }

        // call api to get data
        if (elementLoaded === false && params.id !== undefined && params.id !== null && params.id !== '') {
            loadElementForEdit();
            setShowMessage({ message: "loading...", color: "blue", textColor: "white", loadingTime: 500 });

        }

    }, [reqData]);



    useEffect(() => {

        // clean form when navigate changed
        if (params.id === undefined) {
            clearFormData();
        }

    }, [params])


    return (
        <>

            {Object.keys(showMessage).length > 0
                ?
                <Alert onReturnMethod={messageShown} data={showMessage} />
                : null
            }

            <form className="create-note-form">
                <Grid item style={{ display: 'inline-flex', margin: '15px 0 0 0', }}>
                    <TextField id="standard-basic" label="Title" variant="standard" placeholder='title...' value={title} onChange={(e) => handleChange(e, "title")} inputProps={{ maxLength: 18 }}
                    />

                    <FormControl variant="standard" style={{ margin: '0 10px' }}>
                        <InputLabel id="note-priority">Priority</InputLabel>
                        <Select labelId="note-priority" id="demo-simple-select" value={priority} label="Priority" onChange={(e) => handleChange(e, "priority")} >
                            <MenuItem value={1}>High</MenuItem>
                            <MenuItem value={2}>Medium</MenuItem>
                            <MenuItem value={3}>Low</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" style={{ margin: '0 10px' }}>
                        <InputLabel id="note-priority">Type</InputLabel>
                        <Select labelId="note-priority" id="demo-simple-select" value={type} label="Type" onChange={(e) => handleChange(e, "type")} >
                            <MenuItem value={"text"}>Text</MenuItem>
                            <MenuItem value={"checkbox"}>Checkbox</MenuItem>
                        </Select>
                    </FormControl>
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
        </>
    )

}


export default Create;