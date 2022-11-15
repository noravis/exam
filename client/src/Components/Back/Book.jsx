function Batas({ book, setDeleteId, setModalData, deleteComment }) {
  return (
    <li className="list-item">
      <div className="line">
        <span>
          <br></br>
          <img src={book.picture} alt="" className="list-photo"></img> <br></br>
        </span>
        <span className="line-title">{book.name}</span>
        <br></br>
        <span className="line-title">{book.author}</span>
        <br></br>
        <span>
          {["children", "drama", "sci-fi", "romance"][book.category - 1]}
        </span>
        <br></br>
      </div>
      <div className="buttons">
        <button className="list-button" onClick={() => setModalData(book)}>
          Edit
        </button>
        <button
          className="list-button"
          onClick={() => setDeleteId({ id: book.id })}
        >
          Delete
        </button>
      </div>

      {/* <ul className="list-group mt-4">
                    {
                        // tree.comments => 'kdkjfs,skjdfgidsu,dsugfid'
                        // tree.cid => '2,8,7'
                        
                        
                        book.comments ? book.comments.slice(0, -5).split('-^o^-,').map((c, i) => (
                            <li className="list-group-item" key={i}>
                                {c}
                                <div>
                                <button type="button" onClick={() => deleteComment(batas.cid.split(',')[i])} className="btn btn-outline-danger mt-3">Delete</button>
                                </div>
                            </li>
                        )) : null
                    }
            </ul> */}
    </li>
  );
}

export default Batas;
