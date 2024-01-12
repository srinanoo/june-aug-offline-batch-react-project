import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function TraineesEditComp() {

    let id = location.pathname.replace("/trainees/edit/", "");
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [active, setActive] = useState(false);

    const [errmsg, setErrMsg] = useState("");
    const [successmsg, setSuccessMsg] = useState("");

    console.log(name, age, active);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(
            `http://localhost:5000/api/v1/trainees/readSpecificTrainee/${id}`
            ).then(response => {
                // console.log(response, "response")
                if(response.data.data.length > 0) {
                    // console.log(response.data.data[0].name[0], "name");
                    setName(response.data.data[0].name[0]);
                    setAge(response.data.data[0].age);
                    setActive(response.data.data[0].active);
                }
            });
    },[]);

    const handleSubmit = () => {
        let trainee = {
            "id": id,
            "name": name,
            "age": age,
            "active": Boolean(active)
        }
        axios.put('http://localhost:5000/api/v1/trainees/updateTrainee', trainee)
            .then(response => {
                console.log(response)
                if(response.data.error!="") (setErrMsg(response.data.error), setSuccessMsg(""));
                else if(response.data.msg!="") {
                    // (setSuccessMsg(response.data.msg), setErrMsg(""))
                    alert(response.data.msg);
                    navigate("/trainees");
                };
            });
    }

    return (
        <>
            <h3>Trainees - Edit</h3>

            <div className="danger">{errmsg}</div>
            {/* <div className="success">{successmsg}</div> */}

            <p><input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" value={name} /></p>
            <p><input type="text" onChange={(e) => setAge(e.target.value)} placeholder="Enter your Age" value={age} /></p>
            <p><input type="text" onChange={(e) => setActive(e.target.value)} placeholder="Enter your Status" value={active} /></p>

            <p><input type="button" value="Update Trainee" onClick={handleSubmit} /></p>
        </>
    )
}