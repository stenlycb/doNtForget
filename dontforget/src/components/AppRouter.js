import { Container, Grid } from "@mui/material";
import { Route, Routes } from "react-router";
import AppMenu from "./AppMenu";
import Create from "./Create";
import Home from "./Home";
import Notes from "./Notes";



const AppRouter = () => {

    return (
        <Container maxWidth="lg" className="main-container">
            <Grid container alignItems="center">
                <AppMenu />
            </Grid>

            <Grid container className="app-content">
                <Routes>
                    <Route path="/" element={<Notes />}>Notes</Route>
                    <Route path="/notes" element={<Notes />} >Notes</Route>
                    <Route path="/create" element={<Create />} >Create</Route>
                    <Route path="/edit/:id" element={<Create />} >Create</Route>
                </Routes>
            </Grid>

        </Container>
    )
}


export default AppRouter;