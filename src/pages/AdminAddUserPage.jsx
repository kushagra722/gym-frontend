import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/AdminAddUserPage.module.css";

const AdminAddUserPage = () => {
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/users", userDetails);
      setMessage("User added successfully!");
      setUserDetails({ name: "", email: "" });
    } catch (err) {
      setMessage("Failed to add user.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New User</h1>
      <form className={styles.form} onSubmit={handleAddUser}>
        
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userDetails.name}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={userDetails.email}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Add User
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default AdminAddUserPage;
