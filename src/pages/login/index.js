import { useState, useEffect } from "react";

const Login = () => {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [resultCount, SetResultCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch(`https://randomuser.me/api/?page=${page}3&results=10&seed=abc`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, [page]);

  const handleChangePagination = (value) => {
    setPage(value === "next" ? page + 1 : page - 1);
  };

  return (
    <div>
      <button onClick={() => handleChangePagination("prev")}>Prev</button>

      <span>page={page}</span>

      <button onClick={() => handleChangePagination("next")}>Next</button>
      <button onClick={()=>setShowModal(!showModal)}>
        {showModal ? 'close Modal' : 'open modal'}
      </button>

      {
          showModal && (
            <div>
              <h2>Modal</h2>
            </div>
          )
        }
    </div>
  );
};

export default Login;
