import React from "react";

import { removeAuthToken } from "@/storage/tokenStorage";
import { listAllUsers } from "@/services/userService";
import { customConsole } from "@/utils/console";

const Dashboard: React.FC = () => {
  const handleLogout = () => {
    removeAuthToken();
    window.location.href = "/login";
  };

  const fetchAllUsers = async () => {
    try {
      const response = await listAllUsers();
      customConsole.log(response.data);
    } catch (error) {
      customConsole.error("Fetch Users", { error });
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={fetchAllUsers}>Fetch Users</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
