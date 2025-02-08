import React from "react";
import Card from "../components/Card";

const AdminPage = () => {
  const subscriptions = [
    { id: 1, name: "John Doe", status: "Active", expiry: "2024-12-31" },
    { id: 2, name: "Jane Smith", status: "Expired", expiry: "2024-10-01" },
  ];

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        {subscriptions.map((sub) => (
          <Card key={sub.id} name={sub.name} status={sub.status} expiry={sub.expiry} />
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
