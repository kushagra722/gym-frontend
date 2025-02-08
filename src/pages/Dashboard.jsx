import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        usersRegisteredThisMonth: 0,
        usersExpiringThisMonth: []
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get("http://localhost:4001/api/v1/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDashboardData(response.data.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-brand">Dashboard</div>
                <div className="navbar-links">
                    <button className="nav-btn" onClick={() => navigate("/user-list")}>
                        Users List
                    </button>
                    <button className="nav-btn logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="dashboard-main">
                <h1>Welcome to the Dashboard</h1>
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <h3>Total Active Users</h3>
                        <p>{dashboardData.totalUsers}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Users Registered This Month</h3>
                        <p>{dashboardData.usersRegisteredThisMonth}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Users Expiring This Month</h3>
                        <p>{dashboardData.usersExpiringThisMonth.length}</p>
                    </div>
                </div>

                <div className="expiring-users-list">
                    <h2>Expiring Users</h2>
                    {dashboardData.usersExpiringThisMonth.length > 0 ? (
                        <ul>
                            {dashboardData.usersExpiringThisMonth.map((user) => (
                                <li key={user._id}>
                                    <p><strong>Name:</strong> {user.user_info.first_name} {user.user_info.last_name}</p>
                                    <p><strong>Email:</strong> {user.user_info.email}</p>
                                    <p><strong>Phone:</strong> {user.user_info.phone}</p>
                                    <p><strong>Subscription End Date:</strong> {new Date(user.subscription_end_date).toLocaleDateString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users expiring this month.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
