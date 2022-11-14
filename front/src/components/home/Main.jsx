import Home from "../../contexts/Home";
import List from "./List";
import { useEffect, useState } from "react";
import axios from "axios";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now);
    const [comment, setComment] = useState('');
    const [savivaldybiu_id, setSavivaldybiu_id] = useState(0);
    const [paslaugu_id, setPaslaugu_id] = useState(0);
    const [savivaldybe, setSavivaldybe] = useState(null);
    const [paslauga, setPaslauga] = useState(null);
    const [createData, setCreateData] = useState(null);

    const [comments, setComments] = useState(null);

    const add = () => {
        setCreateData({
            comment,
            savivaldybiu_id,
            paslaugu_id,

        });
        setComment('');
        setPaslaugu_id(0);
        setSavivaldybiu_id(0);
    }

    //READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/server/komentarai')
            .then(res => {
                console.log(res.data);
                setComments(res.data);
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3003/server/savivaldybes')
            .then(res => {
                setSavivaldybe(res.data);
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3003/server/paslaugos')
            .then(res => {
                setPaslauga(res.data);
            })
    }, []);

    // CREATE
    useEffect(() => {
        if (null === createData) {
            return;
        }
        axios.post('http://localhost:3003/server/komentarai', createData)
            .then(res => {
                setLastUpdate(Date.now());
            }
            );
    }, [createData])

   

    return (
        <Home.Provider value={{
            comments,
            createData,
            lastUpdate
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="card m-4">
                            <h5 className="card-header">Sukurti komentarą</h5>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Savivaldybė</label>
                                    <select className="form-select" value={savivaldybiu_id} onChange={e => setSavivaldybiu_id(e.target.value)}>
                                        <option value={0} disabled>Pasirinkite</option>
                                        {
                                            savivaldybe?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Paslaugų sritis</label>
                                    <select className="form-select" value={paslaugu_id} onChange={e => setPaslaugu_id(e.target.value)}>
                                        <option value={0} disabled>Pasirinkite</option>
                                        {
                                            paslauga?.map(p => <option key={p.id} value={p.id}>{p.title}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Jūsų pasiūlymas, komentaras</label>
                                    <input type="text" className="form-control" value={comment} onChange={e => setComment(e.target.value)} />
                                </div>
                                <button onClick={add} type="button" className="btn btn-outline-dark">Pridėti</button>
                            </div>
                        </div>
                        <List />
                    </div>
                </div>
            </div>
        </Home.Provider>
    );
}


export default Main;