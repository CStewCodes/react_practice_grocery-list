import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Content = () => {
  //declare state
  const [items, setItems] = useState([]);

  const songsURL = "http://localhost:3005/songs";

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    // localStorage.setItem("playlist", JSON.stringify(listItems));
    // delete fetch
    fetch(`${songsURL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .catch((err) => {
        res.status(500).send(err.message);
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(songsURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      });
  }, []);

  return (
    <main>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <div              >
                <h3>Song: {item.song_name}</h3>
                <p>Artist: {item.artist}</p>
                <p>Album: {item.album}</p>
              </div>
              <FaTrashAlt
                onClick={() => handleDelete(item.id)}
                role="button"
                tabIndex="0"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty. Bummer!</p>
      )}
      <Link to="/add-song"><button>Add a Song</button></Link>
      
    </main>
  );
};

export default Content;
