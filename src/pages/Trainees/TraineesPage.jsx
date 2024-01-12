import { useNavigate } from "react-router-dom";
import TraineesViewComp from "../../components/Trainees/TraineesViewComp";

export default function TraineesPage() {

    const navigate = useNavigate();

    return (
        <>
            <h2>Trainess - List</h2>

            <p><button onClick={() => navigate("/trainees/add")}>Add</button></p>

            <TraineesViewComp />
        </>
    )
}