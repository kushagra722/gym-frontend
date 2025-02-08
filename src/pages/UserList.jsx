import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserList.css";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No token found. Please log in again.");
                return;
            }
            const response = await axios.get("http://localhost:4001/api/v1/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },  
            });
            setUsers(response.data.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No token found. Please log in again.");
                return;
            }

            // Make DELETE request to API
            await axios.delete(`http://localhost:4001/api/v1/admin/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the UI and fetch the latest data
            setAlertMessage("User deleted successfully!");
            fetchUsers();

            // Hide the alert after 3 seconds
            setTimeout(() => setAlertMessage(""), 3000);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleDetails = (user) => {
        navigate("/user-detail", { state: { user } });
    };

    return (
        <div className="user-list-container">
            {alertMessage && <div className="alert success-alert">{alertMessage}</div>}
            <div className="user-list-header">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
                <button className="add-user-btn" onClick={() => navigate("/add-user")}>
                    + Add User
                </button>       
                <button className="add-user-btn" onClick={() => navigate("/dashboard")}>
                     Dashboard
                </button>       
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subscription</th>
                        <th>Amount Paid</th>
                        <th>Discount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .filter(
                            (user) =>
                                user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((user) => (
                            <tr key={user._id}>
                                <td>{`${user.first_name} ${user.last_name}`}</td>
                                <td>{user.email}</td>
                                <td>{user.phone || "N/A"}</td>
                                <td>
                                    {user.user_subscriptions ? (
                                        <>
                                            <strong>Name:</strong> {user.subscription_data.name}
                                            <br />
                                            <strong>Price:</strong> {user.subscription_data.price}
                                            <br />
                                            <strong>End Date:</strong>{" "}
                                            {new Date(user.user_subscriptions.end_date).toLocaleDateString()}
                                        </>
                                    ) : (
                                        "No Subscription"
                                    )}
                                </td>
                                <td>{user.user_subscriptions?.price || "N/A"}</td>
                                <td>{user.user_subscriptions?.discount || "N/A"}</td>
                                <td>
                                    <button className="details-btn" onClick={() => handleDetails(user)}>
                                        Details
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
