import { useEffect, useState } from "react";
import GalleryItem from "../GalleyItem/GalleryItem";
import "./Gallery.css";

const Gallery = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const backendUrl =
      import.meta.env.REACT_APP_API_URL === "production"
        ? "https://fmmzudwexljnklpqliby.supabase.co"
        : "http://localhost:3001";

    fetch(`${backendUrl}/ideas`)
      .then((res) => res.json())
      .then((data) => setIdeas(data))
      .catch((err) => console.error("❌ Frontend fetch error:", err));
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
