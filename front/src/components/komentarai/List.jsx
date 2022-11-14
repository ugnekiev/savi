import { useContext } from "react";
import Komentaras from "../../contexts/Komentaras";
import Line from "./Line";

function List() {

  const { comments } = useContext(Komentaras);
console.log('dsg', comments)
  return (
    <div className="card m-4">
      <h5 className="card-header">Komentarai</h5>
      <div className="card-body"></div>
      <ul className="list-group">
        {
          comments?.map(s =>  <Line key={s.id} comment={s}/> 
          )
        }
      </ul>
    </div>
  );
}
export default List;
