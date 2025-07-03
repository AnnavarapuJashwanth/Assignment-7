import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'))?.user;
    if (storedUser) {
      setUser(storedUser);
      setFirstName(storedUser.first_name);
      setMobile(storedUser.mobile);
      setProfileImage(storedUser.profileImage || '');
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      first_name: firstName,
      profileImage,
      mobile
    };
    localStorage.setItem('loggedInUser', JSON.stringify({ user: updatedUser }));
    setUser(updatedUser);
    setEditMode(false);
  };

  if (!user) return <div className="container mt-5">Loading profile...</div>;

  return (
    <div className="container mt-5 profile-page">
      <div className="card shadow p-4">
        <div className="d-flex flex-column align-items-center">
          <img
            src={profileImage || "/default-profile.png"}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          {editMode && (
            <input type="file" accept="image/*" className="form-control mb-3" onChange={handleImageChange} />
          )}

          {editMode ? (
            <>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="form-control mb-2 text-center"
              />
              <input
                type="text"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                className="form-control mb-2 text-center"
              />
              <button className="btn btn-success" onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <h4>{user.first_name} {user.last_name}</h4>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.mobile || "N/A"}</p>
              <button className="btn btn-outline-primary btn-sm" onClick={() => setEditMode(true)}>Edit Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
