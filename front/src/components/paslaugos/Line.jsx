import { useContext } from "react";
import Paslauga from "../../contexts/Paslauga";

function Line({ paslauga }) {

    const { paslaugos, setDeleteData, setModalData } = useContext(Paslauga);

console.log(paslauga)
    return (
        <li className="list-group-item">
            
            <div className="line">
                <div className="line__content">

                    <div className="line__content__title">{paslauga.title}</div>

                </div>
                <div className="line__buttons">
                <button onClick={() => setModalData(paslaugos)}type="button" className="btn btn-outline-primary">Pakeisti</button>
                <button onClick={() => setDeleteData(paslaugos)} type="button" className="btn btn-outline-danger">Trinti</button>
                </div>
            </div>
        </li>
    )
}

export default Line;