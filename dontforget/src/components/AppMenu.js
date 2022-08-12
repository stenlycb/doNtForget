import { Container, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";


const AppMenu = () => {


    return (

        <Container maxWidth="sm" className="app-menu-container" >
            <Grid>
                <Link style={{ textDecoration: 'none' }} to="/notes">
                    <Button variant="contained" className="app-route-menu">Notes</Button>
                </Link>

                <Link style={{ textDecoration: 'none' }} to="/create">
                    <Button variant="contained" className="app-route-menu">Create</Button>
                </Link>

            </Grid>
        </Container>
    )

}

export default AppMenu;