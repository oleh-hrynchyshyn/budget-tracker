import { useState } from "react";

import { firebaseClient } from "./firebaseClient";

const useAuth = () => {
  const [user, setUser] = useState(null);

  firebaseClient.auth().onAuthStateChanged((userInfo) => {
    if (userInfo) {
      setUser(userInfo);
    }

    if (!userInfo) {
      setUser(null);
    }
  });

  return { user };
};

export default useAuth;
