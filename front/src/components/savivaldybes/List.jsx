import { useContext } from "react";
import Savivaldybe from "../../contexts/Savivaldybe";
import Line from "./Line";

function List() {

  const { savivaldybe } = useContext(Savivaldybe);
console.log(savivaldybe)
  return (
    <div className="card m-4">
      <h5 className="card-header">Savivaldybių sąrašas</h5>
      <div className="card-body"></div>
      <ul className="list-group">
        {
          savivaldybe?.map(s => <Line key={s.id} sav={s} />
          )
        }
      </ul>
    </div>
  );
}
export default List;
