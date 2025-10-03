import GalleryItem from "../GalleyItem/GalleryItem";
import "./Gallery.css";
import { useEffect, useState } from "react";
const Gallery = () => {
  const [ideas, setIdeas] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/ideas")
      .then((res) => res.json())
      .then((data) => setIdeas(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="gallery">
      {ideas.map((item) => (
        <GalleryItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Gallery;
