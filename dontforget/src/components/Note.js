import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import useMakeRequest from "../hooks/useMakeRequest";
import { URL } from "../services/Create";
import MainContext from "../context/MainContext";
import styleNote from "../css/note.module.css";

const Note = (props) => {

    const { user } = useContext(MainContext);

    const [editElementID, setEditElementID] = useState('');
    const [checkboxes, setCheckboxes] = useState([]);
    const navigate = useNavigate();
    const [reqData, makeRequest] = useMakeRequest();

    /**
     * 
     */
    const prepareIfCheckboxes = () => {

        if (props.type === 'checkbox' && props.thoughts !== undefined && props.thoughts !== '') {

            let _checkBoxes = [];
            const checks = props.thoughts.split("\n");

            if (checks && checks.length > 0) {
                for (const check in checks) {

                    let preparedCheck = {};
                    if (checks[check].indexOf('::') > -1) {

                        const _c = checks[check].split("::");

                        if (_c && _c.length > 0) {
                            preparedCheck["item"] = _c[0];
                            preparedCheck["checked"] = (_c[1] !== undefined && _c[1] === 'true') ? true : false;
                        }
                    } else {
                        preparedCheck["item"] = checks[check];
                        preparedCheck["checked"] = false;
                    }

                    if (Object.keys(preparedCheck).length > 0) {
                        _checkBoxes.push(preparedCheck);
                    }
                }
            }

            if (_checkBoxes.length) {
                setCheckboxes(_checkBoxes);
            }
        }
    }

    /**
     * 
     * @param {*} e 
     * @param {*} item 
     * @param {*} checked 
     */
    const onChangeCheckboxHandle = (e, item, checked) => {

        let checks = [];

        for (const i in checkboxes) {
            const c = { item: checkboxes[i].item, checked: checkboxes[i].checked };

            if (checkboxes[i].item === item) {
                c['checked'] = checked;
            }
            checks.push(c);
        }

        if (checks.length > 0) {
            setCheckboxes(checks);

            let prepareSave = [];
            for (const i in checks) {
                let singleCheck = checks[i].item;
                if (checks[i].checked !== undefined && checks[i].checked === true) {
                    singleCheck = `${singleCheck}::true`;
                }
                prepareSave.push(singleCheck);
            }

            const request = {
                url: `${URL}/${props.id}`,
                method: 'put',
                data: {
                    _id: props.id,
                    title: props.title,
                    thoughts: (prepareSave.join("\n")),
                    priority: props.priority,
                    modified: props.modified,
                    type: props.type,
                    username: user.username,
                },
            }

            makeRequest(request);
        }
    }

    let priorityStyle = 'medium-priority';
    if (props.priority !== undefined) {
        switch (props.priority) {
            case 1:
                priorityStyle = "high-priority";
                break;
            case 3:
                priorityStyle = "low-priority";
                break;
        }
    }

    const onEdit = (e) => {
        if (props.id !== undefined && props.id !== '') {
            setEditElementID(props.id);
        }
    }

    useEffect(() => {

        if (editElementID !== undefined && editElementID !== null && editElementID !== "") {
            navigate(`/edit/${editElementID}`)
        }

        prepareIfCheckboxes();

    }, [editElementID]);

    return (

        <Grid item xs={6} md={3.8} key={props.id} >

            <div className={`paper-${priorityStyle}`}>
                <span style={{ display: 'none' }}>id: {props.id}</span>

                <Grid container direction="row" spacing={0} >

                    <Grid item xs={8} >
                        <div className={styleNote.note_box_title}>{props.title}</div>
                    </Grid>
                    <Grid item xs={2} >
                        <div className={styleNote.note_box_bin1} onClick={onEdit}><Button startIcon={<Edit />} /></div>
                    </Grid>
                    <Grid item xs={2} >
                        <div className={styleNote.note_box_bin1} onClick={() => props.onDeleteMethod(props.id)} ><Button startIcon={<DeleteIcon />} /></div>
                    </Grid>

                    <div className={styleNote.note_modified}>{props.modified}</div>

                </Grid>

                {props.type === 'text' && checkboxes.length === 0 ?
                    <div className="paper-content">
                        <textarea disabled={true} defaultValue={props.thoughts}></textarea>
                    </div>
                    : null}

                {checkboxes.map((item, index) => (
                    <div style={{ marginLeft: '70px' }} key={index}>
                        <FormControlLabel
                            control={<Checkbox checked={item.checked} onChange={(e) => onChangeCheckboxHandle(e, item.item, !item.checked)} />}
                            label={item.item}
                        />
                    </div>
                ))}
            </div>

        </Grid>

    )

}


export default Note;