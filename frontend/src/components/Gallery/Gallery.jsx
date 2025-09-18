import GalleryItem from "../GalleyItem/GalleryItem";
import ideas from "../../data/ideas.json";
import "./Gallery.css";

const Gallery = () => {
  return (
    <div className="gallery">
      {ideas.map((item, index) => (
        <GalleryItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Gallery;
