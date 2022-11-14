import { useContext } from "react";
import Komentaras from "../../contexts/Komentaras";
import Line from "./Line";

function List() {

  const { comments } = useContext(Komentaras);
console.log(comments)
  return (
    <div className="card m-4">
      <h5 className="card-header">Komentarai</h5>
      <div className="card-body"></div>
      <ul className="list-group">
        {
          comments?.map(s => s.state === 0 ? <Line key={s.id} comment={s}/> : null
          )
        }
      </ul>
    </div>
  );
}
export default List;
