import { useState, useEffect } from "react";
import Create from "./Create";
import axios from 'axios';
import List from "./List";
import Edit from "./Edit";
import Paslauga from "../../contexts/Paslauga";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now);
    const [createData, setCreateData] = useState(null);
    const [paslaugos, setPaslaugos] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [editData, setEditData] = useState(null);


  useEffect(() => {
  axios.get('http://localhost:3003/server/paslaugos')
  .then(res => {
    setPaslaugos(res.data);
  })
  }, [lastUpdate]);

//CREATE
  useEffect(() => {
  if(null === createData) {
    return;
  }
  axios.post('http://localhost:3003/server/paslaugos', createData)
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
  axios.delete('http://localhost:3003/server/paslaugos/'+ deleteData.id)
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
  axios.put('http://localhost:3003/server/paslaugos/'+ editData.id, editData)
        .then(res => {
          setLastUpdate(Date.now());
    }
    );
},[editData])

  return (
    <Paslauga.Provider value={{
        setCreateData,
        paslaugos,
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
    </Paslauga.Provider>
  );
}
export default Main;
