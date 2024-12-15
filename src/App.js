import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Sidebar } from "./components/General";
import Footer from "./components/General/Footer/Footer";
import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";
import Loader from "./components/FromOtherProjects/Loader";
import Snackbar from "./components/FromOtherProjects/Snackbar";
import "./App.css";

export const GeneralContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const snackbar = (text) => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(""), 3 * 1000);
  };

  useEffect(() => {
    if (localStorage.token) {
      fetch("http://localhost:3001/user/login", {
        credentials: "include",
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.text().then((x) => {
              throw new Error(x);
            });
          }
        })
        .then((data) => {
          setUser(data);
          snackbar(`Logged in ! Welcome !`);
        })
        .catch((err) => {})
        .finally(() => {});
    } else {
    }
  }, []);

  return (
    <GeneralContext.Provider value={{ setLoading, setUser, user, snackbar }}>
      {
        <Router>
          <Navbar />
          <Sidebar />
          {user ? <AuthRoutes /> : <AppRoutes />}
          <Footer />
        </Router>
      }
      {loading && <Loader />}
      {snackbarText && <Snackbar text={snackbarText} />}
    </GeneralContext.Provider>
  );
}

export default App;
