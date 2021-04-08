import { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import Layout from "../components/Layout";
import { firebaseClient } from "../firebase/firebaseClient";

import "../style/Index.css";

const Index = () => {
  const [data, setData] = useState([]);

  const [userId, setUserId] = useState("");

  const [currentDay, setCurrentDay] = useState(moment());

  const [mode, setMode] = useState("create");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  firebaseClient.auth().onAuthStateChanged((userInfo) => {
    if (userInfo) {
      setUserId(userInfo.uid);
      return;
    }

    if (!userInfo) {
      setUserId("");
      window.location.href = "/login";
    }
  });

  useEffect(() => {
    if (userId) {
      firebaseClient
        .firestore()
        .collection("items")
        .doc(userId)
        .get()
        .then((res) => {
          setData(res?.data()?.data || []);
        })
        .catch(() => {
          setData([]);
        });
    }
  }, [userId]);

  const handleClear = () => {
    setMode("create");
    setAmount("");
    setCategory("");
    setCreatedAt("");
  };

  const checkNameCategory = (nameCategory) => {
    if (/^\d/g.test(nameCategory[0])) {
      return false;
    }
    return true;
  };

  const handleFirestoreAdd = (newData) => {
    firebaseClient.firestore().collection("items").doc(userId).set({
      data: newData,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (amount && category) {
      if (amount > 0 && checkNameCategory(category)) {
        if (mode === "create") {
          if (data.find((elem) => elem.category === category)) {
            const newData = data.map((elem) => {
              if (elem.category === category) {
                return { ...elem, amount: elem.amount + Number(amount) };
              }

              return elem;
            });

            setData(newData);
            handleFirestoreAdd(newData);
          } else {
            const newData = [
              ...data,
              {
                createdAt: Date.now(),
                amount: Number(amount),
                category,
                currentDay: moment(currentDay).format(),
              },
            ];

            setData(newData);
            handleFirestoreAdd(newData);
          }
        }

        if (mode === "edit") {
          const newData = data.map((elem) => {
            if (elem.createdAt === createdAt) {
              return { ...elem, category, amount: Number(amount) };
            }

            return elem;
          });

          setData(newData);
          handleFirestoreAdd(newData);
        }

        handleClear();
      }
    }
  };

  const handleEdit = (createDate) => {
    const dataElem = data.find((elem) => elem.createdAt === createDate);

    setMode("edit");

    setAmount(dataElem.amount);
    setCategory(dataElem.category);
    setCreatedAt(dataElem.createdAt);
  };

  const handleDelete = (categoryName) => {
    handleClear();

    const newData = data.filter((elem) => elem.category !== categoryName);

    setData(newData);
    handleFirestoreAdd(newData);
  };

  const filteredData = data.filter((elem) => {
    return (
      moment(elem.currentDay).format("DD/MM/YYYY") ===
      moment(currentDay).format("DD/MM/YYYY")
    );
  });

  const totalAmount = filteredData
    .reduce((total, elem) => total + elem.amount, 0)
    .toFixed(2);

  return (
    <Layout>
      <div className="tracker">
        <p>{moment(currentDay).format("DD-MM-YYYY")}</p>

        <div className="tracker__block">
          <Calendar
            value={moment(currentDay).toDate()}
            className="tracker__calendar"
            onClickDay={(date) => {
              setCurrentDay(moment(date));
            }}
          />

          <form onSubmit={handleSubmit} className="tracker__form">
            <input
              step="any"
              type="number"
              value={amount}
              required
              placeholder="Spent Amount ($)"
              onChange={(event) => {
                setAmount(event.currentTarget.value);
              }}
            />
            <input
              required
              value={category}
              placeholder="Category"
              onChange={(event) => {
                setCategory(event.currentTarget.value);
              }}
            />

            <button type="submit">
              {mode === "create" ? "Create" : "Edit"} Entry
            </button>
          </form>
        </div>

        <div className="tracker__show">
          {filteredData.map((elem) => {
            return (
              <p key={elem.createdAt}>
                Category - {elem.category}: {Number(elem.amount).toFixed(2)}$
                <button
                  className="tracker__button"
                  onClick={() => handleEdit(elem.createdAt)}
                >
                  Edit
                </button>
                <button
                  className="tracker__button"
                  onClick={() => handleDelete(elem.category)}
                >
                  Delete
                </button>
              </p>
            );
          })}

          <div>Total: ${totalAmount}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
