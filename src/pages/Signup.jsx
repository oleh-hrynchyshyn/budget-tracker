import { useState } from "react";
import Layout from "../components/Layout";

import { firebaseClient } from "../firebase/firebaseClient";

const Singup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.email && data.password) {
      firebaseClient
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((res) => {
          setTimeout(() => {
            window.location.href = "/login";
          }, 200);
        })
        .catch((err) => {
          window.alert(`Sign up Failed - ${err}`);
        });
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="verification__form">
        <div>Sing up</div>
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
          Sing up
        </button>
      </form>
    </Layout>
  );
};
export default Singup;
