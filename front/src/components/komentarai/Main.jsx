import { useState, useEffect } from "react";
import axios from 'axios';
import List from "./List";
import Komentaras from "../../contexts/Komentaras";
import Edit from "./Edit";

function Main() {

  const [lastUpdate, setLastUpdate] = useState(Date.now);
  const [comments, setComments] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  const [savivaldybes, setSavivaldybes] = useState(null);
  const [paslaugos, setPaslaugos] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:3003/server/komentarai')
      .then(res => {
        console.log(res.data);
        setComments(res.data);
      })
  }, [lastUpdate]);

  useEffect(() => {
    axios.get('http://localhost:3003/server/savivaldybes')
      .then(res => {
        setSavivaldybes(res.data);
      })
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3003/server/paslaugos')
      .then(res => {
        setPaslaugos(res.data);
      })
  }, []);

  //DELETE (admin komentarus)
  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    axios.delete('http://localhost:3003/server/komentarai/' + deleteData.id)
      .then(res => {
        setLastUpdate(Date.now());
      }
      );
  }, [deleteData])

  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios.put('http://localhost:3003/server/komentarai/' + editData.id, editData)
      .then(res => {
        setLastUpdate(Date.now());
      }
      );
  }, [editData])

  return (
    <Komentaras.Provider value={{
      comments,
      setDeleteData,
      savivaldybes,
      paslaugos,
      modalData,
      setModalData,
      setEditData
    }}>
      <div className="container">
        <div className="row justify-content-center">
        
          <div className="col-8">
            <List />
          </div>
        </div>
      </div>
      <Edit />
    </Komentaras.Provider>
  );
}
export default Main;
