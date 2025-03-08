import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes";
import '../Profile.css';

const MyAccount = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("details");
    const [formData, setFormData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleAccountSave = () => {
        alert("Account details saved successfully!");
        setIsEditing(false);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        alert("Password changed successfully!");
        setFormData(prev => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }));
    };

    const handleDeleteAccount = () => {
        alert("Account deleted. Redirecting to homepage...");
        logout();
        navigate(ROUTES.HOME);
    };

    const handleLogoutClick = () => {
        logout();
        navigate(ROUTES.HOME);
    };

    return (
        <div className="profile-layout">
            {/* Main Content */}
            <div className="content">
                <div className="content-header-account">
                    <h2>My Account</h2>
                </div>
                
                <div className="account-submenu">
                    <button 
                        className={activeTab === "details" ? "account-tab active" : "account-tab"}
                        onClick={() => setActiveTab("details")}
                    >
                        Account Details
                    </button>
                    <button 
                        className={activeTab === "password" ? "account-tab active" : "account-tab"}
                        onClick={() => setActiveTab("password")}
                    >
                        Change Password
                    </button>
                    <button 
                        className={activeTab === "delete" ? "account-tab active" : "account-tab"}
                        onClick={() => setActiveTab("delete")}
                    >
                        Delete Account
                    </button>
                </div>
                
                {/* Account Details */}
                {activeTab === "details" && (
                    <div className="card">
                        <div className="card-header">
                            <h3>Account Details</h3>
                            <button className={isEditing ? "btn-secondary" : "btn-primary"} onClick={handleEditToggle}>
                                {isEditing ? "Cancel" : "Edit"}
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="reservation-grid">
                                <div className="reservation-field">
                                    <span className="field-label">First Name</span>
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            name="firstName" 
                                            value={formData.firstName} 
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span className="field-value">{formData.firstName}</span>
                                    )}
                                </div>
                                <div className="reservation-field">
                                    <span className="field-label">Last Name</span>
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            name="lastName" 
                                            value={formData.lastName} 
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span className="field-value">{formData.lastName}</span>
                                    )}
                                </div>
                                <div className="reservation-field">
                                    <span className="field-label">Email</span>
                                    {isEditing ? (
                                        <input 
                                            type="email" 
                                            name="email" 
                                            value={formData.email} 
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span className="field-value">{formData.email}</span>
                                    )}
                                </div>
                                <div className="reservation-field">
                                    <span className="field-label">Phone</span>
                                    {isEditing ? (
                                        <input 
                                            type="tel" 
                                            name="phone" 
                                            value={formData.phone} 
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span className="field-value">{formData.phone}</span>
                                    )}
                                </div>
                            </div>
                            {isEditing && (
                                <div className="card-actions">
                                    <button className="btn-primary" onClick={handleAccountSave}>
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Change Password */}
                {activeTab === "password" && (
                    <div className="card">
                        <div className="card-header">
                            <h3>Change Password</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handlePasswordChange}>
                                <div className="form-group">
                                    <label className="field-label">Current Password</label>
                                    <input 
                                        type="password" 
                                        name="currentPassword" 
                                        value={formData.currentPassword} 
                                        onChange={handleInputChange}
                                        className="edit-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="field-label">New Password</label>
                                    <input 
                                        type="password" 
                                        name="newPassword" 
                                        value={formData.newPassword} 
                                        onChange={handleInputChange}
                                        className="edit-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="field-label">Confirm New Password</label>
                                    <input 
                                        type="password" 
                                        name="confirmPassword" 
                                        value={formData.confirmPassword} 
                                        onChange={handleInputChange}
                                        className="edit-input"
                                        required
                                    />
                                </div>
                                <div className="card-actions">
                                    <button type="submit" className="btn-primary">
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                
                {/* Delete Account */}
                {activeTab === "delete" && (
                    <div className="card">
                        <div className="card-header">
                            <h3>Delete Account</h3>
                        </div>
                        <div className="card-body">
                            {!showDeleteConfirm ? (
                                <div>
                                    <p className="warning-text">Warning: Deleting your account is permanent and cannot be undone. All your data will be removed from our system.</p>
                                    <div className="card-actions">
                                        <button className="btn-danger" onClick={() => setShowDeleteConfirm(true)}>
                                            Delete My Account
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="warning-text">Are you absolutely sure you want to delete your account? This action cannot be undone.</p>
                                    <div className="card-actions">
                                        <button className="btn-danger" onClick={handleDeleteAccount}>
                                            Yes, Delete My Account
                                        </button>
                                        <button className="btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAccount;