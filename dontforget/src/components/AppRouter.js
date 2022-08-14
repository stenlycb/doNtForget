import { Container, Grid } from "@mui/material";
import { useContext } from "react";
import { Route, Routes } from "react-router";
import MainContext from "../context/MainContext";
import AppMenu from "./AppMenu";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import Create from "./Create";
import Home from "./Home";
import Notes from "./Notes";

// check login and redirect


const AppRouter = () => {

    const { user } = useContext(MainContext);

    return (
        <Container maxWidth="lg" className="main-container">

            {Object.keys(user).length > 0 ?
                <>
                    <Grid container alignItems="center">
                        <AppMenu />
                    </Grid>

                    <Grid container className="app-content">
                        <Routes>
                            <Route path="/notes" element={<Notes />} >Notes</Route>
                            <Route path="/create" element={<Create />} >Create</Route>
                            <Route path="/edit/:id" element={<Create />} >Create</Route>
                        </Routes>
                    </Grid>
                </>
                :
                <Grid container className="app-content">
                    <Routes>
                        <Route path="*" element={<Login />}>Login</Route>
                        <Route path="/" element={<Login />}>Login</Route>
                        <Route path="/login" element={<Login />}>Login</Route>
                        <Route path="/registration" element={<Registration />} >Registration</Route>
                    </Routes>
                </Grid>
            }

        </Container >
    )
}


export default AppRouter;