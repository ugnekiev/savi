import { useState, useContext, useEffect } from 'react';
import Komentaras from '../../contexts/Komentaras';

function Edit() {

  // const [comment, setComment] = useState ('');

  const { modalData, setModalData, setEditData, setDeleteData } = useContext(Komentaras);

  const save = () => {
    setEditData({
      state: 1,
      id: modalData.id,
    })
    //kad po "save" uzsidarytu modalas
    setModalData(null);
  }

  const del = () => {
    setDeleteData(
      modalData
    )
    //kad po "save" uzsidarytu modalas
    setModalData(null);
  }

  if (null === modalData) {
    return null;
  }



  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Patvirtinti / Trinti komentarus</h5>
            <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
          </div>
          <div className="modal-body">
            {/* cia isicopinam CREATE struktura */}
            <div className="mb-3">
              <label className="form-label">Jūsų pasiūlymas, komentaras</label>
              <input type="text" className="form-control" value={modalData.komentaras} readOnly/>
            </div>
            <div className="home__buttons">
            <button onClick={del} type="button" className="btn btn-secondary">Ištrinti</button>
            <button onClick={save} type="button" className="btn btn-primary">Patvirtinti</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Edit;
