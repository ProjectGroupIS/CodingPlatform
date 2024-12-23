
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/users/rahulbhargavrgk")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProfileData(data.message[0]); // Assuming the profile data is in message[0]
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handleSolveProblemClick = () => {
    navigate("/selection-page");
  };

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>

      {/* Profile Image */}
      <div className="profile-image-container">
        <img
          src={profileData.photo}
          alt="Profile"
          className="profile-image"
        />
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <div className="profile-item">
          <strong>Name:</strong> <span>{profileData.name}</span>
        </div>
        <div className="profile-item">
          <strong>Username:</strong> <span>{profileData.userID}</span>
        </div>
        <div className="profile-item">
          <strong>Email:</strong> <span>{profileData.email}</span>
        </div>
        <div className="profile-item">
          <strong>Rating:</strong> <span>{profileData.rating}</span>
        </div>
        <div className="profile-item">
          <strong>Problems Solved:</strong> <span>{profileData.questionsSolved.length}</span>
        </div>
      </div>

      <button className="solve-button" onClick={handleSolveProblemClick}>
        Solve a Problem
      </button>
    </div>
  );
};

export default ProfilePage;