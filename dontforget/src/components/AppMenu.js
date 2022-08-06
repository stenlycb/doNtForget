import { Container, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";


const AppMenu = () => {


    return (

        <Container maxWidth="sm" className="app-menu-container" >
            <Grid>

                <Link to="/">
                    <Button> Home</Button>
                </Link>

                <Link to="/create">
                    <Button>Create</Button>
                </Link>

                <Link to="/notes">
                    <Button>Notes</Button>
                </Link>

            </Grid>
        </Container>
    )

}

export default AppMenu;