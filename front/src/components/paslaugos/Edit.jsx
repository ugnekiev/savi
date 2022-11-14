import { useState, useContext, useEffect } from 'react';
import Paslauga from '../../contexts/Paslauga';

function Edit() {

  const [title, setTitle] = useState('');


  const { modalData, setModalData, setEditData } = useContext(Paslauga);

  const save = () => {
    setEditData({
      title,
      id: modalData.id,
    })
    //kad po "save" uzsidarytu modalas
    setModalData(null);
  }

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setTitle(modalData.title);
  }, [modalData])

  if (null === modalData) {
    return null;
  }


  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Redaguoti paslaugas</h5>
            <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
          </div>
          <div className="modal-body">
            {/* cia isicopinam CREATE struktura */}
            <div className="card m-4">
              <h5 className="card-header">Pakeisti paslaugą</h5>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Pakeisti pavadinimą</label>
                  <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setModalData(null)} type="button" className="btn btn-secondary">Uždaryti</button>
              <button onClick={save} type="button" className="btn btn-primary">Išsaugoti</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
