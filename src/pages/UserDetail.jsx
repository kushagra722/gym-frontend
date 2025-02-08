import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/UserDetail.css";

const UserDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state;

    return (
        <div className="user-detail-container">
            <button className="back-btn" onClick={() => navigate("/user-list")}>
                Back to User List
            </button>

            <div className="user-detail-card">
                <h2>User Details</h2>
                <div className="user-info">
                    <p><strong>Name:</strong> {`${user.first_name} ${user.last_name}`}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                    <p><strong>Subscription:</strong> {user.user_subscriptions ? (
                        <>
                            <strong>Name:</strong> {user.subscription_data.name}
                            <br />
                            <strong>Price:</strong> {user.subscription_data.price}
                            <br />
                            <strong>End Date:</strong> {new Date(user.user_subscriptions.end_date).toLocaleDateString()}
                        </>
                    ) : (
                        "No Subscription"
                    )}</p>
                    <p><strong>Amount Paid:</strong> {user.user_subscriptions?.price || "N/A"}</p>
                    <p><strong>Discount:</strong> {user.user_subscriptions?.discount || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
