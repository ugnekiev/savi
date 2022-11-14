import { useState, useEffect } from "react";
import Create from "./Create";
import axios from 'axios';
import Savivaldybe from "../../contexts/Savivaldybe";
import List from "./List";
import Edit from "./Edit";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now);
    const [createData, setCreateData] = useState(null);
    const [savivaldybe, setSavivaldybe] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [editData, setEditData] = useState(null);


  useEffect(() => {
  axios.get('http://localhost:3003/server/savivaldybes')
  .then(res => {
    setSavivaldybe(res.data);
  })
  }, [lastUpdate]);

//CREATE
  useEffect(() => {
  if(null === createData) {
    return;
  }
  axios.post('http://localhost:3003/server/savivaldybes', createData)
        .then(res => {
          setLastUpdate(Date.now());
    }
    );
},[createData])

//DELETE
useEffect(() => {
  if(null === deleteData) {
    return;
  }
  axios.delete('http://localhost:3003/server/savivaldybes/'+ deleteData.id)
        .then(res => {
          setLastUpdate(Date.now());
    }
    );
},[deleteData])

//EDIT
useEffect(() => {
  if(null === editData) {
    return;
  }
  axios.put('http://localhost:3003/server/savivaldybes/'+ editData.id, editData)
        .then(res => {
          setLastUpdate(Date.now());
    }
    );
},[editData])




  return (
    <Savivaldybe.Provider value={{
        setCreateData,
        savivaldybe,
        setDeleteData,
        modalData, 
        setModalData,
        setEditData

    }}>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Create />
          </div>
          <div className="col-8">
            <List />
          </div>
        </div>
      </div>
      <Edit />
    </Savivaldybe.Provider>
  );
}
export default Main;
