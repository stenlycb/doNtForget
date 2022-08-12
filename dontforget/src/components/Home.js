import { useEffect } from "react";
import { useNavigate } from "react-router";

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {

        navigate("/notes");

    });

}

export default Home;