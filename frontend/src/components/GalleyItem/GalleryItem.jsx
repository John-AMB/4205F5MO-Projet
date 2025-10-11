import { useEffect, useRef, useState } from "react";
import "./GalleryItem.css";
import UserOptionsPortal from "../UserOptionsPortal/UserOptionsPortal";
const GalleryItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();
  const ref = useRef();
  const [span, setSpan] = useState(0);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  useEffect(() => {
    const height = ref.current.clientHeight;
    const spanRows = Math.ceil(height / 10);
    setSpan(spanRows);
  }, []);
  const toggleOptions = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + rect.height + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
    setOpen((prev) => !prev);
  };
  const deleteRecette = async () => {};
  const handleEditClick = () => {};
  return (
    <div className="galleryItem" style={{ gridRowEnd: `span ${span}` }}>
      <img ref={ref} src={item.photo} alt={item.titre} />
      <div className="overlayIcons">
        <button ref={buttonRef} onClick={toggleOptions}>
          <img src="/general/more.svg" alt="options" />
        </button>
      </div>

      {open && (
        <UserOptionsPortal>
          <div
            className="userOptions"
            style={{
              position: "absolute",
              top: coords.top,
              left: coords.left,
            }}
          >
            <div
              className="optionFormat"
              onClick={() => deleteRecette(item.id)}
            >
              delete Pin
            </div>
            <div className="optionFormat" onClick={handleEditClick}>
              modify Pin
            </div>
          </div>
        </UserOptionsPortal>
      )}
    </div>
  );
};

export default GalleryItem;
