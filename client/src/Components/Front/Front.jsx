import Book from "./Book";
import "../../front.scss";
import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import reducer from "../../Reducers/reducer";
import { getDataFromServer } from "../../Actions";

function Front({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now()); // state
  const [books, dispatchBooks] = useReducer(reducer, []);
  const [search, setSearch] = useState("");
  // const [com, setCom] = useState([])

  // Read
  useEffect(() => {
    axios.get("http://localhost:3003/book-list/" + show).then((res) => {
      console.log(res.data);
      // const t = new Map(); //medziai
      // const c = new Map(); //komentarai
      // res.data.forEach(o => {
      //     t.set(o.id, o);
      //     if (null !== o.cid) {
      //         c.set(o.cid, o);
      //     }
      // });
      // const ar = [];
      // t.forEach(o => ar.push(o));
      // const ar2 = [];
      // c.forEach(o => ar2.push(o));
      // setCom(ar2);
      dispatchBooks(getDataFromServer(res.data));
    });
  }, [show, lastUpdate]);

  const serverSort = (by, dir) => {
    axios
      .get("http://localhost:3003/book-list-sorted/?dir=" + dir + "&by=" + by)
      .then((res) => {
        dispatchBooks(getDataFromServer(res.data));
      });
  };

  const doSearch = (e) => {
    setSearch(e.target.value);
    axios
      .get("http://localhost:3003/book-list-search/?s=" + e.target.value)
      .then((res) => {
        dispatchBooks(getDataFromServer(res.data));
      });
  };

  const saveVote = (id, value) => {
    axios
      .post("http://localhost:3003/book-vote/" + id, { vote: value })
      .then((res) => {
        setLastUpdate(Date.now());
      });
  };

  const saveReserve = (id, value) => {
    axios
      .post("http://localhost:3003/book-reserve/" + id, { reserve: value })
      .then((res) => {
        setLastUpdate(Date.now());
      });
  };

  // const saveComment = (id, value) => {
  //     axios.post('http://localhost:3003/batai-comment/' + id, {comment: value})
  //     .then(res => {
  //         setLastUpdate(Date.now());
  //     });
  // }

  return (
    <>
      <div className="container">
        <nav className="navbar">
          <a className="home" href="/">
            Library
          </a>
          <div className="nav-box">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/children">
              Children
            </Link>
            <Link className="nav-link" to="/drama">
              Drama
            </Link>
            <Link className="nav-link" to="/scifi">
              Sci-fi
            </Link>
            <Link className="nav-link" to="/romance">
              Romance
            </Link>
            <Link className="nav-link" to="/sign-up">
              Sign up
            </Link>
          </div>
        </nav>
        <div className="create-input-box search">
          <input
            type="text"
            className="input-line"
            onChange={doSearch}
            value={search}
          />
          <small className="side-line">search for books</small>
        </div>
      </div>
      <div className="list-body">
        <h2 className="list-header-front"> Books in {show}</h2>
        <ul className="list-front">
          {books.map((book) => (
            <Book saveVote={saveVote} key={book.id} book={book}></Book>
          ))}
        </ul>
      </div>

      <div className="">
        <div className="sorting-box">
          {" "}
          SORT:
          <div className="sort-name-server">
            <span>By name: </span>
            <div className="arrows">
              <svg className="up" onClick={() => serverSort("name", "asc")}>
                <use xlinkHref="#arrow"></use>
              </svg>
              <svg className="down" onClick={() => serverSort("name", "desc")}>
                <use xlinkHref="#arrow"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Front;
