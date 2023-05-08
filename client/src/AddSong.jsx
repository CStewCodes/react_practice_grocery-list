import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function AddSong() {
    const [data, setData] = useState({});
    const initialForm={
        song_name: '',
        artist: '',
        album: '',
    }
    const [formData, setFormData] =useState(initialForm);

    // Handler for form input changes
    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
    
    const handleSongSubmit = (event) => {
        event.preventDefault();
        const songsURL = "http://localhost:3005/songs";
        const postData = {
            song_name: formData.song_name,
            artist: formData.artist,
            album: formData.album,
        }
        event.preventDefault();
        fetch(songsURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        }).then((response) => response.text())
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error("Error", error);
        })
        setFormData(initialForm);
        
        // setFormData({ songName: '', artist: '', album: '' }
        // ); // Reset the form data
    }
  return (
        <div>
            <form onSubmit={handleSongSubmit}>
                <input 
                type="text" 
                name="song_name" 
                value={formData.song_name} 
                onChange={handleInputChange}
                placeholder="Song Name" 
                id="song_name"
                 />
                <input 
                type="text" 
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                placeholder="Artist"
                />
                <input 
                type="text"
                name='album'
                value={formData.album}
                onChange={handleInputChange}
                placeholder='Album'
                />
                <button type="submit">Add Song</button> 

            </form>  
            <Link to="/songs"><button>Back</button></Link>      
    </div>
  )
}

export default AddSong