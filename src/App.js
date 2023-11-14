// app.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [projectUrls, setProjectUrls] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch('https://api.github.com/users/iameijaz');
        const userData = await userResponse.json();
        setUserData(userData);

        // Replace the following array with the URLs of your projects
        const projects = [
          'https://iameijaz.github.io/spreadsheet_app/',
          'https://iameijaz.github.io/dropbox_uploader/',
          'https://iameijaz.github.io',
          // Add more project URLs as needed
        ];

        setProjectUrls(projects);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">GitHub Profile Page</h1>
        {userData ? (
          <div className="profile-container">
            <img src={userData.avatar_url} alt="Avatar" className="avatar" />
            <h2 className="username">{userData.name}</h2>
            <p className="bio">{userData.bio}</p>
            <div className="stats">
              <p>Followers: {userData.followers}</p>
              <p>Following: {userData.following}</p>
              <p>Public Repositories: {userData.public_repos}</p>
            </div>
            
            <h1 className="blackish">Directories:</h1>
        <table className='blackish borderblack center'>
          <thead>
            <tr>
              <td>Project</td>
              <td>Link</td>
            </tr>
          </thead>
          <tbody>
            {projectUrls.map((url, index) => (
              <tr key={index}>
                <td>Project {index + 1}</td>
                <td>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>

        ) : (
          <p>Loading...</p>
        )}
    <h1>Blacky Area</h1>
      </header>

    </div>
  );
};

export default App;
