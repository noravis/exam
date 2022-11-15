import { useState } from "react";

function Book({ book, saveVote, saveReserve }) {
  const [vote, setVote] = useState(5);
  const [reserve, setReserve] = useState(false);

  const clickVote = () => {
    saveVote(book.id, vote);
  };

  const clickReserve = () => {
    saveReserve(book.id, reserve);
  };

  return (
    <li className="list-group-item-front">
      <div className="line">
        <span>
          <br></br>
          <img
            src={book.picture}
            alt=""
            className="list-photo-front"
          ></img>{" "}
          <br></br>
        </span>
        <span className="line-title-front">{book.name}</span>
        <br></br>
        <span className="line-author">By (author): {book.author}</span>
        <br></br>
        <span className="line-cat">
          Category:{" "}
          {["children", "drama", "sci-fi", "romance"][book.category - 1]}
        </span>
        <br></br>
        <b>Rating: {(book.sum / book.count || 1).toFixed(2)}</b>
        <br></br>
        <div className="input-box-front">
          <input
            type="number"
            min="1"
            max="10"
            className="input-line-front"
            value={vote}
            onChange={(e) => setVote(e.target.value)}
          ></input>
          <button className="front-button" onClick={clickVote}>
            Vote
          </button>
          <button className="front-button-reserve" onClick={clickReserve}>
            Reserve
          </button>
        </div>
      </div>
    </li>
  );
}

export default Book;
