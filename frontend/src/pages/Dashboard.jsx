import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:3000/app/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.data.balance);
      });
  }, []);
  return (
    <div className="flex flex-col">
      <Appbar label={user.firstName} />
      <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-56 xl:mx-80 mt-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
