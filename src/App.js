import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components/General";
import AppRoutes from "./AppRoutes";
import Loader from "./components/FromOtherProjects/Loader";

export const GeneralContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      setLoading(true);

      fetch("http://185.229.226.27:3001/user/login", {
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
          console.log("data", data);
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
    }
  }, []);

  return (
    <GeneralContext.Provider value={{ setLoading, setUser, user }}>
      {
        <Router>
          <Navbar />
          <Sidebar />
          <AppRoutes />
          <Footer />
        </Router>
      }
      {loading && <Loader />}
    </GeneralContext.Provider>
  );
}

export default App;
