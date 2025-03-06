import React from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGlobe, FaChevronDown } from 'react-icons/fa';
import { countryCodes } from '../../utils/countryCodeData';

/**
 * Registration form component
 *
 * @param {Object} props - Component props
 * @returns {JSX.Element} Register form component
 */
const RegisterForm = ({
                          formData,
                          handleChange,
                          handleSubmit,
                          showLogin,
                          countryCodeRef,
                          showCountryCodeDropdown,
                          toggleCountryCodeDropdown,
                          handleCountryCodeSelect
                      }) => {
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="name-fields">
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <FaLock className="input-icon" />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <FaLock className="input-icon" />
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="phone-input-container">
                <div ref={countryCodeRef} className="country-code-selector">
                    <div
                        className="country-code-display"
                        onClick={toggleCountryCodeDropdown}
                    >
                        <FaGlobe className="country-code-icon" />
                        <span>{formData.countryCode}</span>
                        <FaChevronDown className="dropdown-icon" />
                    </div>

                    {showCountryCodeDropdown && (
                        <div className="country-code-dropdown">
                            {countryCodes.map((item, index) => (
                                <div
                                    key={index}
                                    className="country-code-option"
                                    onClick={() => handleCountryCodeSelect(item.code)}
                                >
                                    <span className="country-code">{item.code}</span>
                                    <span className="country-name">{item.country}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="phone-input-group">
                    <FaPhone className="phone-input-icon" />
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        placeholder="Phone Number"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <button type="submit" className="auth-button">Register</button>

            <p className="auth-switch">
                Already have an account?
                <span onClick={showLogin}>Sign in</span>
            </p>
        </form>
    );
};

export default RegisterForm;