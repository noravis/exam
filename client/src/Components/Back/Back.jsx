import { useEffect, useState } from "react";
import axios from "axios";
import "../../back.scss";
import Create from "./Create";
import Book from "./Book";
import Modal from "./Modal";
// import CreateDydis from './CreateDydis';
// import DydziaiList from './DydziaiList';
import { Link } from "react-router-dom";
import { authConfig } from "../../Functions/auth.js";

function Back() {
  const [lastUpdate, setLastUpdate] = useState(Date.now()); // state

  const [books, setBooks] = useState([]);

  const [createData, setCreateData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [modalData, setModalData] = useState(null);

  // const [createSizeData, setCreateSizeData] = useState(null);

  const [sizes, setSizes] = useState([]);

  const [deleteSizeId, setDeleteSizeId] = useState(null);

  // useEffect(() => {
  //   axios.get('http://localhost:3003/batu-dydziai')
  //     .then(res => {
  //       console.log(res.data);
  //       setSizes(res.data);
  //     })
  // }, [lastUpdate]);

  // Read
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/books-manager", authConfig())
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      });
  }, [lastUpdate]);

  //Create
  useEffect(() => {
    if (null === createData) {
      return;
    }
    axios
      .post("http://localhost:3003/books-manager", createData)
      .then((res) => {
        console.log(res);
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // useEffect(() => {
  //   if (null === createSizeData) {
  //     return;
  //   }
  //   axios.post('http://localhost:3003/batu-dydziai', createSizeData)
  //     .then(res => {
  //       console.log(res);
  //       setLastUpdate(Date.now());
  //     });

  // }, [createSizeData]);

  //Edit
  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios
      .put("http://localhost:3003/books-manager/" + editData.id, editData)
      .then((res) => {
        console.log(res);
        setLastUpdate(Date.now());
      });
  }, [editData]);

  //Delete
  useEffect(() => {
    if (null === deleteId) {
      return;
    }
    axios
      .delete("http://localhost:3003/books-manager/" + deleteId.id)
      .then((res) => {
        console.log(res);
        setLastUpdate(Date.now());
      });
  }, [deleteId]);

  //Delete SIZE
  // useEffect(() => {
  //   if (null === deleteSizeId) {
  //     return;
  //   }
  //   axios.delete('http://localhost:3003/batu-manager-dydziai/' + deleteSizeId.id,)
  //     .then(res => {
  //       console.log(res);
  //       setLastUpdate(Date.now());
  //     });

  // }, [deleteSizeId])

  // const deleteComment = id => {
  //   axios.delete('http://localhost:3003/batu-delete-comment/' + id,)
  //     .then(res => {
  //       console.log(res);
  //       setLastUpdate(Date.now());
  //     });
  // }

  return (
    <>
      <div className="head">
        <Link className="buttonLogOut" to="/logout">
          Log OUT
        </Link>
      </div>
      <div className="body">
        <Create
          sizes={sizes}
          setCreateData={setCreateData}
          lastUpdate={lastUpdate}
        ></Create>
        {/* <CreateDydis setCreateSizeData={setCreateSizeData}></CreateDydis>
        DydziaiList sizes={sizes} setDeleteSizeId={setDeleteSizeId}></DydziaiList> */}
        <div className="list-container">
          <div className="list-header">
            <h2>Book list</h2>
          </div>
          <div className="list-body">
            <ul className="list">
              {books.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  setDeleteId={setDeleteId}
                  setModalData={setModalData}
                ></Book>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Modal
        sizes={sizes}
        setEditData={setEditData}
        setModalData={setModalData}
        modalData={modalData}
      ></Modal>
    </>
  );
}

export default Back;
