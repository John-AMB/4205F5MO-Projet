import { useEffect, useRef, useState } from "react";
import "./GalleryItem.css";

const GalleryItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();
  const ref = useRef();
  const [span, setSpan] = useState(0);

  useEffect(() => {
    const height = ref.current.clientHeight;
    const spanRows = Math.ceil(height / 10);
    setSpan(spanRows);
  }, []);

  return (
    <div className="galleryItem" style={{ gridRowEnd: `span ${span}` }}>
      <img ref={ref} src={item.photo} alt={item.titre} />
      <div className="overlayIcons">
        <button ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>
          <img src="/general/more.svg" alt="options" />
        </button>
      </div>

      {open && (
        <div className="userOptions">
          <div className="optionFormat">Edit</div>
          <div className="optionFormat">Delete</div>
        </div>
      )}
    </div>
  );
};

export default GalleryItem;
