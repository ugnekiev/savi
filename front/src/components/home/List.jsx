import { useContext } from "react";
import Home from "../../contexts/Home";
import Line from "./Line";

function List() {

  const { comments } = useContext(Home);

console.log(comments)
  return (
    <div className="card m-4">
      <h5 className="card-header">Komentarų sąrašas</h5>
      <div className="card-body"></div>
      <ul className="list-group">
        {
          comments?.map(c => c.state === 1 ? <Line key={c.id} comment={c} /> : null
          )
        }
      </ul>
    </div>
  );
}
export default List;
