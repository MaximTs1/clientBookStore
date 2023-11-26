import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import AppRoutes from "./AppRoutes";
import Loader from "./components/Loader";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

function App() {
  // const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("http://185.229.226.27:3001/user/login", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
        console.log("User loaded");
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
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
