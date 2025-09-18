import { useState, useRef } from "react";
import "./GalleryItem.css";

const GalleryItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();

  const toggleOptions = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="galleryItem">
      <img src={item.photo} alt={item.title} />

      <div className="overlayIcons">
        <button ref={buttonRef} onClick={toggleOptions}>
          <img src="/general/more.svg" alt="options" />
        </button>
      </div>

      {open && (
        <div className="userOptions">
          <div className="optionFormat">Edit</div>
          <div className="optionFormat">Delete</div>
        </div>
      )}

      <p>{item.title}</p>
    </div>
  );
};

export default GalleryItem;
