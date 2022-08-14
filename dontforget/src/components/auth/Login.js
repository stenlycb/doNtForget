import { Button, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MainContext from "../../context/MainContext";
import useMakeRequest from "../../hooks/useMakeRequest";
import { URL_USERS } from "../../services/Create";

const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [gotoRegister, setGotoRegister] = useState(false);

    const [requestedUsers, makeRequest] = useMakeRequest();
    const { user, updateUser } = useContext(MainContext);

    const navigate = useNavigate();

    /**
     * 
     */
    const login = () => {
        if (username !== '' && password !== '') {
            makeRequest({ url: `${URL_USERS}` });
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
    }


    useEffect(() => {

        if (Object.keys(requestedUsers).length > 0) {

            for (const i in requestedUsers) {
                if (requestedUsers[i].username === username && requestedUsers[i].password === password) {
                    updateUser(requestedUsers[i]);
                    setUsername('');
                    setPassword('');
                }
            }
        }

    }, [requestedUsers]);

    useEffect(() => {

        if (gotoRegister === true) {
            navigate('/registration');
        }

    }, [gotoRegister]);

    return (
        <form className="create-auth-form">
            <Grid item style={{ display: 'block' }}>

                <TextField style={{ display: 'block' }} id="standard-basic" label="Username" variant="standard" placeholder='username...' value={username}
                    onChange={(e) => handleChange(e, "username")} inputProps={{ maxLength: 18 }} />

                <TextField style={{ display: 'block' }} id="standard-basic" label="Password" variant="standard" placeholder='password...' value={password}
                    onChange={(e) => handleChange(e, "password")} inputProps={{ maxLength: 18 }} />
            </Grid>

            <Grid item>
                <Button onClick={login}>login</Button>
                <Button onClick={() => setGotoRegister(true)}>Registration</Button>
            </Grid>
        </form>
    )

}


export default Login;