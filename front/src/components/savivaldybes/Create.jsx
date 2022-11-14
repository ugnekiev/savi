import { useContext, useState, useRef } from 'react';
import Savivaldybe from '../../contexts/Savivaldybe';
import getBase64 from '../../functions/getBase64';


function Create() {

const [title, setTitle] = useState ('');

const fileInput = useRef();
const [photoPrint, setPhotoPrint] = useState(null);

const { setCreateData } = useContext(Savivaldybe);

const doPhoto = () => {
  getBase64(fileInput.current.files[0])
    .then(photo => setPhotoPrint(photo))
    .catch(_ => {
      // tylim
    })
}

const add = () => {
  setCreateData({
    title,
    image: photoPrint
    
  });
  setTitle('');
  setPhotoPrint(null);
  fileInput.current.value = null;
}


  return (
    <div className="card m-4">
    <h5 className="card-header">Sukurti svaivaldybę</h5>
    <div className="card-body">
      <div className="mb-3">
        <label className="form-label">Įrašyti pavadinimą</label>
        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Pridėti herbą</label>
        <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
      </div>
      {photoPrint ? <div className='img-bin'>
        <label htmlFor="image-delete">X</label>
        <input id="image-delete" type="checkbox"></input>
        <img src={photoPrint} alt="upload"></img>
      </div> : null}
      <button onClick={add} type="button" className="btn btn-outline-dark">Pridėti</button>
    </div>
  </div>
  );
        }

export default Create;
