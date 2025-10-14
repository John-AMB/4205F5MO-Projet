// src/components/Gallery/Gallery.jsx
import GalleryItem from "../GalleyItem/GalleryItem";
import "./Gallery.css";
import { useEffect, useState } from "react";

const Gallery = () => {
  const [ideas, setIdeas] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch(`${API_URL}/ideas`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setIdeas(data);
      } catch (err) {
        console.error("Failed to fetch ideas:", err);
      }
    };

    fetchIdeas();
  }, [API_URL]);

  if (ideas.length === 0) {
    return <p className="gallery-empty">No ideas yet.</p>;
  }

  return (
    <div className="gallery">
      {ideas.map((item) => (
        <GalleryItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Gallery;
