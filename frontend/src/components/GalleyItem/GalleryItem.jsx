import { useEffect, useRef, useState } from "react";
import "./GalleryItem.css";
import UserOptionsPortal from "../UserOptionsPortal/UserOptionsPortal";

const GalleryItem = ({ item, refreshIdeas }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();
  const ref = useRef();
  const [span, setSpan] = useState(0);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.titre);
  const [newDescription, setNewDescription] = useState(item.description);

  useEffect(() => {
    const height = ref.current.clientHeight;
    setSpan(Math.ceil(height / 10));
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

  const deleteIdea = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://your-backend-name.onrender.com";
      const res = await fetch(`${apiUrl}/ideas/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        refreshIdeas(); // Refresh parent list
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://your-backend-name.onrender.com";
      const res = await fetch(
        `${apiUrl}/ideas/${item.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titre: newTitle,
            description: newDescription,
            photo: item.photo,
          }),
        }
      );

      if (res.ok) {
        setEditing(false);
        refreshIdeas(); // Refresh list
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
            style={{ position: "absolute", top: coords.top, left: coords.left }}
          >
            <div className="optionFormat" onClick={() => deleteIdea(item.id)}>
              Delete Pin
            </div>
            <div className="optionFormat" onClick={() => setEditing(true)}>
              Modify Pin
            </div>
          </div>
        </UserOptionsPortal>
      )}

      {editing && (
        <div className="editFormOverlay">
          <form className="editForm" onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="New title"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="New description"
            />
            <div className="editActions">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GalleryItem;
