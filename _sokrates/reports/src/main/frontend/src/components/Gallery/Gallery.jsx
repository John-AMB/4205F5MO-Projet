import { useEffect, useState } from "react";
import GalleryItem from "../GalleyItem/GalleryItem";
import "./Gallery.css";
import Header from "../Header/Header";
const Gallery = () => {
  const [ideas, setIdeas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchIdeas = () => {
    fetch(`${import.meta.env.VITE_API_URL}/ideas`)
      .then((res) => res.json())
      .then((data) => setIdeas(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchIdeas();
  }, []);
  const filteredIdeas = ideas.filter(
    (idea) =>
      idea.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <Header onSearchChange={setSearchTerm} />
      <div className="gallery">
        {filteredIdeas.length > 0 ? (
          filteredIdeas.map((item) => (
            <GalleryItem key={item.id} item={item} refreshIdeas={fetchIdeas} />
          ))
        ) : (
          <p className="noResults">No results found :(</p>
        )}
      </div>
    </>
  );
};

export default Gallery;
