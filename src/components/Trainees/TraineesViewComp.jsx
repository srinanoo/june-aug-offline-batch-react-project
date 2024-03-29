import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function TraineesViewComp() {

    console.log(API_URL, "URL")

    const [traineesList, setTrainessList] = useState([]);

    let navigate = useNavigate();

    const fetchData = () => {
        axios.get(`${API_URL}/api/v1/trainees/readTrainees`)
            .then(response => {
                console.log(response.data.data);
                setTrainessList(response.data.data);
            })
    }

    useEffect(() => {
        fetchData();

        axios.get(`${API_URL}/api/v1/trainees/readSpecificTrainee/65aa50e47f996803a32686a8`)
            .then(res => console.log(res.data, "dafaf"));
    },[]);

    const handleDelete = (e) => {
        console.log(e.target.getAttribute('data-id'));

        let confirmation = confirm("Are you sure you want to delete this Trainee?");
        if (confirmation) {
            axios.delete(
                `${API_URL}/api/v1/trainees/deleteTrainee`, {
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
                    <div>Photo</div>
                    <div>Trainer</div>
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
                                    <img src={v.photo} width={100} />
                            </div>
                            <div>
                                <FetchTrainer id={v.trainer} />
                            </div>
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

function FetchTrainer(props) {
    const [trainer, setTrainer] = useState("");

    useEffect(() => {
        console.log(props.id);
        axios.get(`${API_URL}/api/v1/trainees/readSpecificTrainer/${props.id}`)
            .then(res => {
                console.log(res.data);
                console.log(res.data.data[0]?.name);
                setTrainer(res.data?.data[0]?.name);
            });
    },[]);

    return (
        <>
            {trainer}
        </>
    )
}