import { useState, useRef } from "react";
import getBase64 from "../../Functions/getBase64";
import "../../create.scss";

function Create({ setCreateData, dydziai }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("1");
  const fileInput = useRef();

  const buttonHandler = () => {
    const file = fileInput.current.files[0];

    if (file) {
      getBase64(file).then((picture) => {
        console.log(picture);
        setCreateData({
          name,
          author,
          category,
          picture,
        });
      });
    } else {
      setCreateData({
        name,
        author,
        category,
        nuotrauka: null,
      });
    }
    setName("");
    setAuthor("");
    setCategory("");
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

  return (
    <div className="create-container">
      <div className="create-header">
        <h2>Add New Book</h2>
      </div>

      <div className="create-body">
        <div className="create-input-box">
          <label className="side-line">Book name</label>
          <input
            type="text"
            className="input-line"
            onChange={(e) => inputHandler(e, "name")}
            value={name}
          />
          {/* <small className="side-line">Add new shoe name here.</small> */}
        </div>

        <div className="create-input-box">
          <label className="side-line">Book author</label>
          <input
            type="text"
            className="input-line"
            onChange={(e) => inputHandler(e, "author")}
            value={author}
          />
          {/* <small className="side-line">Add new shoe name here.</small> */}
        </div>

        <div className="create-input-box">
          <label className="side-line">Book category</label>
          <select
            className="input-line"
            onChange={(e) => inputHandler(e, "category")}
            value={category}
          >
            <option value="1">Children</option>
            <option value="2">Drama</option>
            <option value="3">Sci-fi</option>
            <option value="4">Romance</option>
          </select>
          {/* <small className="side-line">Shoe season.</small> */}
        </div>

        <div className="create-input-box">
          <label className="side-line">Book picture</label>
          <input ref={fileInput} type="file" className="input-line" />
          {/* <small className="side-line">Shoe photo.</small> */}
        </div>
      </div>

      <div className="buttons">
        <button className="create-button" onClick={buttonHandler}>
          Add
        </button>
      </div>
    </div>
  );
}
export default Create;
