import { useEffect, useRef, useState } from "react";
import "./GalleryItem.css";
import UserOptionsPortal from "../UserOptionsPortal/UserOptionsPortal";

const GalleryItem = ({ item }) => {
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

  // 🗑️ Delete recipe
  const deleteRecette = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/ideas/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.reload();
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ✏️ Edit recipe (show form)
  const handleEditClick = () => {
    setEditing(true);
    setOpen(false);
  };

  // ✅ Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/ideas/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titre: newTitle,
          description: newDescription,
          photo: item.photo,
        }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error(error);
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
              Delete Pin
            </div>
            <div className="optionFormat" onClick={handleEditClick}>
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
