import { useEffect, useState, useRef } from "react";
import getBase64 from "../../Functions/getBase64.js";
import "../../modal.scss";

function Modal({ setModalData, modalData, setEditData, dydziai }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("1");
  const [id, setId] = useState("0");
  const [remove, setRemove] = useState(false);
  const fileInput = useRef();

  const buttonHandler = () => {
    const file = fileInput.current.files[0];

    if (file) {
      getBase64(file).then((picture) => {
        console.log(picture);
        setEditData({
          name,
          author,
          category,
          id,
          picture,
          del: remove ? 1 : 0,
        });
        setModalData(null);
        setRemove(false);
      });
    } else {
      setEditData({
        name,
        author,
        category,
        id,
        picture: "",
        del: remove ? 1 : 0,
      });
      setModalData(null);
      setRemove(false);
    }
  };

  const inputHandler = (e, which) => {
    switch (which) {
      case "name":
        setName(e.target.value);
        break;
      case "author":
        setAuthor(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      default:
    }
  };

  useEffect(() => {
    if (modalData === null) {
      setName("");
      setAuthor("");
      setCategory(1);
    } else {
      setName(modalData.name);
      setAuthor(modalData.author);
      setCategory(modalData.sezonas);

      // setDydis(dydziai.filter((s) => s.size === modalData.dydis)[0].id);
      setId(modalData.id);
    }
  }, [modalData]);

  if (modalData === null) {
    return null;
  }

  return (
    <div className="modal-bg">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Modal title</h2>
          <button className="close" onClick={() => setModalData(null)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-input-box">
            <label className="modal-side-line">Book name</label>
            <input
              type="text"
              className="modal-line"
              onChange={(e) => inputHandler(e, "name")}
              value={name}
            />
            {/* <small className="modal-side-line">
                    Add new tree name here.
                  </small> */}
          </div>

          <div className="modal-input-box">
            <label className="modal-side-line">Book author</label>
            <input
              type="text"
              className="modal-line"
              onChange={(e) => inputHandler(e, "author")}
              value={author}
            />
            {/* <small className="modal-side-line">
                    Add new tree name here.
                  </small> */}
          </div>

          <div className="modal-input-box">
            <label className="modal-side-line">Book category</label>
            <select
              className="modal-line"
              onChange={(e) => inputHandler(e, "category")}
              value={category}
            >
              <option value="1">Children</option>
              <option value="2">Drama</option>
              <option value="3">Sci-fi</option>
              <option value="4">Roamnce</option>
            </select>
          </div>

          <div className="modal-input-box">
            <label className="modal-side-line">Picture</label>
            <input ref={fileInput} type="file" className="modal-line" />
          </div>

          <div className="checkbox-box">
            <div className="checkbox">
              {modalData.picture ? (
                <img className="photo" src={modalData.picture} alt=""></img>
              ) : null}
            </div>
            <input
              type="checkbox"
              className="checkbox"
              onChange={() => setRemove((r) => !r)}
              checked={remove}
            />
            <label className="label">Delete Photo</label>
          </div>
        </div>

        <div className="buttons">
          <button className="modal-button" onClick={buttonHandler}>
            Save
          </button>
          <button className="modal-button" onClick={() => setModalData(null)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
