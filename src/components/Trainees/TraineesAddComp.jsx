import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function TraineesAddComp() {

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [active, setActive] = useState(false);
    const [photo, setPhoto] = useState("");
    const [trainer, setTrainer] = useState("");
    
    const [trainers, setTrainers] = useState([]);

    const [errmsg, setErrMsg] = useState("");
    const [successmsg, setSuccessMsg] = useState("");

    console.log(name, age, active);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://june-aug-offline-batch-nodejs-with-mongoose.vercel.app/api/v1/trainees/readTrainers')
            .then(res => setTrainers(res.data.data));
    }, [])

    const handleSubmit = () => {
        // let trainee = {
        //     "name": name,
        //     "age": age,
        //     "active": Boolean(active),
        //     "photo": photo
        // }
        let formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("active", Boolean(active));
        formData.append("photo", photo);
        formData.append("trainer", trainer);

        axios.post('https://june-aug-offline-batch-nodejs-with-mongoose.vercel.app/api/v1/trainees/createTrainee', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
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
            <p><input type="file" onChange={(e) => setPhoto(e.target.files[0])} placeholder="Select Picture" /></p>
            <p>Trainers:
                <select onChange={(e) => setTrainer(e.target.value)}>
                {
                    trainers?.map((v, i) => {
                        return (
                            <option key={i} value={v._id}>{v.name}</option>
                        )
                    })
                }
                </select>
            </p>

            <p><input type="button" value="Add Trainee" onClick={handleSubmit} /></p>
        </>
    )
}
