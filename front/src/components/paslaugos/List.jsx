import { useContext } from "react";
import Paslauga from "../../contexts/Paslauga";
import Line from "./Line";

function List() {

  const { paslaugos } = useContext(Paslauga);

  return (
    <div className="card m-4">
      <h5 className="card-header">Paslaugų sąrašas</h5>
      <div className="card-body"></div>
      <ul className="list-group">
        {
          paslaugos?.map(s => <Line key={s.id} paslauga={s} />
          )
        }
      </ul>
    </div>
  );
}
export default List;
