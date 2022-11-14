import { useContext } from "react";
import Savivaldybe from "../../contexts/Savivaldybe";



function Line({ sav }) {

    const{ savivaldybe, setDeleteData, setModalData } = useContext(Savivaldybe);

// console.log(sav)
    return (
        <li className="list-group-item">
            
            <div className="line">
                <div className="line__content">
                <div className="line__content__info">
                        {sav.image ? <div className='img-bin'>
                            <img src={sav.image} alt={sav.name}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">{sav.name}</div>

                </div>
                <div className="line__buttons">
                <button onClick={() => setModalData(savivaldybe)}type="button" className="btn btn-outline-primary">Pakeisti</button>
                <button onClick={() => setDeleteData(savivaldybe)} type="button" className="btn btn-outline-danger">Trinti</button>
                </div>
            </div>
        </li>
    )
}

export default Line;