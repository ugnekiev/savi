import { useContext, useState } from 'react';
import Paslauga from '../../contexts/Paslauga';

function Create() {

const [title, setTitle] = useState ('');

const { setCreateData } = useContext(Paslauga);

const add = () => {
  setCreateData({
    title,
  });
  setTitle('');
}

  return (
    <div className="card m-4">
    <h5 className="card-header">Sukurti paslaugą</h5>
    <div className="card-body">
      <div className="mb-3">
        <label className="form-label">Įrašyti pavadinimą</label>
        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <button onClick={add} type="button" className="btn btn-outline-dark">Pridėti</button>
    </div>
  </div>
  );
        }

export default Create;
