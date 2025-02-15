import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './googlesignin.css';

const GoogleSignIn = () => {
    const navigate = useNavigate();
    const clientId = "615792488052-6jgum24ql77c48n2ii4ssnq9advtb6ra.apps.googleusercontent.com"; // Replace with your actual Client ID
    const decodeJWT = (token) => {
        const base64Url = token.split('.')[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
        );
        return JSON.parse(jsonPayload);
      };
    const onSuccess = async (credentialResponse) => {
        try {
            console.log("Login Success!", credentialResponse);

            // Extracting user information from the credential response
            const { credential } = credentialResponse;
            console.log(decodeJWT(credential))
            const payload = { emailId: decodeJWT(credential).email };

            // Sending the token to the backend for user login
            const response = await axios.post("https://short-url-app-vet9.onrender.com/user/login", payload);
            console.log("User saved successfully: ", response.data);

            // Navigate to the short URL generator page upon successful login
            navigate("/short-url-generator"); 
        } catch (error) {
            console.error("Error saving user: ", error.response?.data || error.message);
            alert("An error occurred while signing in. Please try again.");
        }
    };

    const onFailure = () => {
        console.error("Login Failed!");
        alert("Google Sign-In failed. Please try again.");
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="container">
                <div className="card">
                    <h1>Sign In</h1>
                    <p>Welcome! Please sign in with Google to continue.</p>
                    <div className="google-login">
                        <GoogleLogin
                            onSuccess={onSuccess}
                            onError={onFailure}
                            text="signin_with"
                            shape="pill"
                        />
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleSignIn;
