import { Button, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Note = (props) => {

    const [editElementID, setEditElementID] = useState('');

    const navigate = useNavigate();

    const onEdit = (e) => {

        if (props.id !== undefined && props.id !== '') {
            setEditElementID(props.id);
        }
    }

    useEffect(() => {

        if (editElementID !== undefined && editElementID !== null && editElementID !== "") {
            navigate(`/edit/${editElementID}`)
        }

    }, [editElementID]);

    return (

        <Grid item xs={6} md={3.8} key={props.id} >

            <div className="paper">
                <span style={{ display: 'none' }}>id: {props.id}</span>

                <Grid container direction="row" spacing={0} >

                    <Grid item xs={8} >
                        <div className="note-box-title">{props.title}</div>
                    </Grid>
                    <Grid item xs={2} >
                        <div className="note-box-bin1" onClick={onEdit}><Button startIcon={<BorderColorIcon />} /></div>
                    </Grid>
                    <Grid item xs={2} >
                        <div className="note-box-bin1" onClick={() => props.onDeleteMethod(props.id)} ><Button startIcon={<DeleteIcon />} /></div>
                    </Grid>

                </Grid>

                <div className="paper-content">
                    <textarea disabled={true} defaultValue={props.thoughts}></textarea>
                </div>
            </div>

        </Grid>

    )

}


export default Note;