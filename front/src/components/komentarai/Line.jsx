import { useContext } from "react";
import Komentaras from "../../contexts/Komentaras";


function Line({ comment} ) {

    const { setModalData } = useContext(Komentaras);

console.log(comment)

    return (
        <li className="list-group-item">
            
            <div className="line">
                <div className="line__content">

                    <div className="line__content__title">{comment.komentaras}</div>
                    <div className="home__content__info">
                         {/* <h2>{sav.name}</h2> */}
                    </div>

                </div>
                <div className="line__buttons">
                <button onClick={() => setModalData(comment)}type="button" className="btn btn-outline-primary">Peržiūrėti</button>
                </div>
            </div>
        </li>
    )
}

export default Line;