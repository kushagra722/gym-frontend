// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const axiosInstance = axios.create({
//     baseURL: "http://35.173.201.89/api/v1", // Your API base URL
// });

// // Axios interceptor for requests
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("accessToken");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Axios interceptor for responses
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Show toast notification
//             toast.error("Session expired. Please log in again.", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });

//             // Remove access token from localStorage
//             localStorage.removeItem("accessToken");

//             // Redirect to login page
//             setTimeout(() => {
//                 window.location.href = "/login"; // Redirect after a delay to show the message
//             }, 3000);
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;
