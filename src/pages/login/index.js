import { useState } from "react";

const Login = () => {
  // let count = 0;
  const [count, setCount] = useState(0);

  const handleIncrementCount = () => {
    setCount((prevState) => {
      return prevState + 1;
    });

    // setCount((prevState) => {});
    setCount((prevState) => {
      return prevState + 1;
    });

    return (
      <div>
        <button onClick={handleIncrementCount}>{count}</button>
      </div>
    );
  };
};

export default Login;
