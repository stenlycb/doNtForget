import { Button, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MainContext from "../../context/MainContext";
import useMakeRequest from "../../hooks/useMakeRequest";
import { URL_USERS } from "../../services/Create";

const Registration = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const [requestedUsers, makeRequest] = useMakeRequest();
    const { user, updateUser } = useContext(MainContext);

    /**
     * 
     */
    const register = () => {
        if (username !== '' && password !== '' && (password === repassword)) {

            const requestData = {
                url: `${URL_USERS}`,
                method: 'post',
                data: {
                    username: username,
                    password: password,
                }
            };

            makeRequest(requestData);
        }
    }

    /**
     * 
     * @param {*} e 
     * @param {*} type 
     */
    const handleChange = (e, type) => {

        if (type === 'username') {
            setUsername(e.target.value);
        }

        if (type === 'password') {
            setPassword(e.target.value);
        }

        if (type === 'repassword') {
            setRepassword(e.target.value);
        }
    }


    useEffect(() => {

        if (Object.keys(requestedUsers).length > 0 && requestedUsers._id !== undefined && requestedUsers._id !== '') {
            updateUser(requestedUsers);
        }

    }, [requestedUsers]);

    return (
        <form className="create-auth-form">
            <Grid item style={{ display: 'block' }}>

                <TextField style={{ display: 'block' }} id="standard-basic" label="Username" variant="standard" placeholder='username...' value={username}
                    onChange={(e) => handleChange(e, "username")} inputProps={{ maxLength: 18 }} />

                <TextField type={'password'} style={{ display: 'block' }} id="standard-basic" label="Password" variant="standard" placeholder='password...' value={password}
                    onChange={(e) => handleChange(e, "password")} inputProps={{ maxLength: 18 }} />

                <TextField type={'password'} style={{ display: 'block' }} id="standard-basic" label="Repeat password" variant="standard" placeholder='repeat password...' value={repassword}
                    onChange={(e) => handleChange(e, "repassword")} inputProps={{ maxLength: 18 }} />
            </Grid>

            <Grid item>
                <Button onClick={register}>register</Button>
            </Grid>
        </form>
    )

}


export default Registration;