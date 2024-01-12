import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function TraineesViewComp() {

    const [traineesList, setTrainessList] = useState([]);

    let navigate = useNavigate();

    const fetchData = () => {
        axios.get('http://localhost:5000/api/v1/trainees/readTrainees')
            .then(response => {
                // console.log(response.data.data);
                setTrainessList(response.data.data);
            })
    }

    useEffect(() => {
        fetchData();
    },[]);

    const handleDelete = (e) => {
        console.log(e.target.getAttribute('data-id'));

        let confirmation = confirm("Are you sure you want to delete this Trainee?");
        if (confirmation) {
            axios.delete(
                'http://localhost:5000/api/v1/trainees/deleteTrainee', {
                    data: {id: e.target.getAttribute('data-id')}})
                    .then(response => {
                        console.log(response)
                        if(response.data.msg !== "") {
                            alert(response.data.msg);
                            fetchData();
                        }
                    });
        }
    }

    return (
        <>
            <div>
                <div className="flex header">
                    <div>ID</div>
                    <div>Name</div>
                    <div>Age</div>
                    <div>Active</div>
                    <div>Actions</div>
                </div>
            {
                traineesList?.map((v, i) => {
                    return (
                        <div key={i} className="flex columns">
                            <div>{v._id}</div>
                            <div>{v.name}</div>
                            <div>{v.age}</div>
                            <div>{v.active?.toString()}</div>
                            <div>
                                <button onClick={() => navigate(`/trainees/edit/${v._id}`)}>Edit</button> / <button data-id={v._id} onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </>
    )
}