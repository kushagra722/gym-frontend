import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/AddUserPage.css'
const AddUser = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        dob: "",
        phone: "",
        address: "",
        discount: "",
        subscription: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const validateDiscount = (subscriptionId, discountValue) => {
        const selectedSubscription = subscriptions.find((sub) => sub._id === subscriptionId);
        if (selectedSubscription && discountValue) {
            const price = selectedSubscription.price;
            if (Number(discountValue) > price) {
                setError("Discount cannot be greater than the price.");
            } else {
                setError(""); // Clear error if valid
            }
        }
    };
    

    // Fetch subscriptions for the dropdown
    const fetchSubscriptions = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("You are not authorized. Redirecting to login.");
                navigate("/login");
                return;
            }

            const response = await axios.get("http://35.173.201.89/api/v1/subscriptions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSubscriptions(response.data.data); // Assuming subscriptions are in `data.data`
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("You are not authorized. Redirecting to login.");
                navigate("/login");
                return;
            }

            const response = await axios.post(
                "http://35.173.201.89/api/v1/admin/users",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("User added successfully!");
            navigate("/user-list"); // Redirect to the user list page
        } catch (error) {
            console.error("Error adding user:", error);
            setError("Failed to add user. Please check your inputs.");
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    return (
        <div className="add-user-container">
            <h2>Add New User</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleAddUser}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        type="text"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subscription</label>
                    <select
                        name="subscription"
                        value={formData.subscription}
                        onChange={(e) => {
                            handleInputChange(e);
                            validateDiscount(e.target.value, formData.discount); // Call the validate function correctly
                        }}
                        required
                    >
                        <option value="">Select Subscription</option>
                        {subscriptions.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                                {sub.name} -  ₹{sub.price}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Discount</label>
                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={(e) => {
                            handleInputChange(e);
                            validateDiscount(formData.subscription, e.target.value); // Call the validate function correctly
                        }}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>


                <button type="submit" className="submit-btn">
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUser;
