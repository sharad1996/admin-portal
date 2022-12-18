import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import { fetchApi } from "../apis";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const getUser = async (token) => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetchApi(`auth/${token}`, options);
    if (response) {
      setUser(response);
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      {user ? (
        user?.isAdmin ? (
          <AdminPage />
        ) : (
          <UserPage userId={user?.id} />
        )
      ) : null}
    </div>
  );
};

export default Dashboard;
