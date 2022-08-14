import { Container, Grid, Button } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../context/MainContext";


const AppMenu = () => {

    const { user, updateUser } = useContext(MainContext);

    return (

        <Container maxWidth="sm" className="app-menu-container" >
            <Grid>
                <Link style={{ textDecoration: 'none' }} to="/notes">
                    <Button variant="contained" className="app-route-menu">Notes</Button>
                </Link>

                <Link style={{ textDecoration: 'none' }} to="/create">
                    <Button variant="contained" className="app-route-menu">Create</Button>
                </Link>

                <Button className="app-route-menu" onClick={() => updateUser({ logout: true })}>{`logout [${user.username}]`}</Button>

            </Grid>
        </Container>
    )

}

export default AppMenu;