import { useState } from "react";
import Layout from "../components/Layout";

import { firebaseClient } from "../firebase/firebaseClient";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.email && data.password) {
      firebaseClient
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((res) => {
          console.log(res);

          setTimeout(() => {
            window.location.href = "/";
          }, 200);
        })
        .catch((err) => {
          window.alert(`User not found - ${err}`);
        });
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="verification__form">
        <div>Login</div>
        <input
          required
          type="email"
          onChange={(e) => {
            setData({ ...data, email: e.currentTarget.value });
          }}
          value={data.email}
          placeholder="Email"
          className="verification__input"
        />
        <input
          required
          type="password"
          onChange={(e) => {
            setData({ ...data, password: e.currentTarget.value });
          }}
          value={data.password}
          placeholder="Password"
          className="verification__input"
        />

        <button className="verification__button" type="submit">
          Login
        </button>
      </form>
    </Layout>
  );
};
export default Login;
