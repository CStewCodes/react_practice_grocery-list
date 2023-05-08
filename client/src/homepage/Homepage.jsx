import React, { useState } from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddSong from "../AddSong";

function Homepage() {
  //set state for the 'Add a song' form
  const [showForm, setShowForm] = useState(true);
  //handler for the 'Add a song' button
  const handleAddSongClick = () => {
    setShowForm(true);
  };
  //handler for the form submission
  const handleFormSubmit = (formData) => {
    //hide the form
    setShowForm(false);
  };
  return (
    <>
      <Header />
      <Content
        showForm={
          !showForm ? (
            <button onClick={handleAddSongClick}> Add a Song </button>
          ) : (
            <AddSong onSubmit={handleFormSubmit} />
          )
        }
      />

      <Footer />
    </>
  );
}

export default Homepage;
