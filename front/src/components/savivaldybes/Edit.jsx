import { useState, useContext, useEffect, useRef } from 'react';
import Savivaldybe from '../../contexts/Savivaldybe';
import getBase64 from '../../functions/getBase64';


function Edit() {

  const [title, setTitle] = useState('');
  const [photoPrint, setPhotoPrint] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const fileInput = useRef();

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then(photo => setPhotoPrint(photo))
      .catch(_ => {
        // tylim
      })
  }

const { modalData, setModalData, setEditData } = useContext(Savivaldybe);

  const edit = () => {
    setEditData({
      title,
      id: modalData.id,
      deletePhoto: deletePhoto ? 1 : 0,
      image: photoPrint

    })
    //kad po "save" uzsidarytu modalas
    setModalData(null);
    setDeletePhoto(false);

  }

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setTitle(modalData.title);
    setPhotoPrint(modalData.image);
    setDeletePhoto(false);
  }, [modalData])

  if (null === modalData) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Redaguoti savivaldybę</h5>
            <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
          </div>
          <div className="modal-body">
            {/* cia isicopinam CREATE struktura */}
            <div className="card m-4">
          
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Pakeisti pavadinimą</label>
                  <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Pakeisti herbą</label>
                  <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                </div>
                {photoPrint ? <div className='img-bin'>
                  <label htmlFor="image-delete">X</label>
                  <input id="image-delete" type="checkbox"></input>
                  <img src={photoPrint} alt="upload"></img>
                </div> : null}
              </div>
              <div className="modal-footer">
                <button onClick={() => setModalData(null)} type="button" className="btn btn-secondary">Uždaryti</button>
                <button onClick={edit} type="button" className="btn btn-primary">Išsaugoti</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
