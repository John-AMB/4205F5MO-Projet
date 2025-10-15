import { useEffect, useState } from "react";
import GalleryItem from "../GalleyItem/GalleryItem";
import "./Gallery.css";

const Gallery = () => {
  const [ideas, setIdeas] = useState([]);

  const fetchIdeas = () => {
    fetch(`${import.meta.env.VITE_API_URL}/ideas`)
      .then((res) => res.json())
      .then((data) => setIdeas(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div className="gallery">
      {ideas.map((item) => (
        <GalleryItem key={item.id} item={item} refreshIdeas={fetchIdeas} />
      ))}
    </div>
  );
};

export default Gallery;
