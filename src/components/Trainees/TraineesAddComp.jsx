import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function TraineesAddComp() {

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [active, setActive] = useState(false);

    const [errmsg, setErrMsg] = useState("");
    const [successmsg, setSuccessMsg] = useState("");

    console.log(name, age, active);
    const navigate = useNavigate();

    const handleSubmit = () => {
        let trainee = {
            "name": name,
            "age": age,
            "active": Boolean(active)
        }
        axios.post('http://localhost:5000/api/v1/trainees/createTrainee', trainee)
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
            <h3>Trainees - Add</h3>

            <div className="danger">{errmsg}</div>
            {/* <div className="success">{successmsg}</div> */}

            <p><input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" /></p>
            <p><input type="text" onChange={(e) => setAge(e.target.value)} placeholder="Enter your Age" /></p>
            <p><input type="text" onChange={(e) => setActive(e.target.value)} placeholder="Enter your Status" /></p>

            <p><input type="button" value="Add Trainee" onClick={handleSubmit} /></p>
        </>
    )
}