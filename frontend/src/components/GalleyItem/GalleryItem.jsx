import { useEffect, useRef, useState } from "react";
import "./GalleryItem.css";
import UserOptionsPortal from "../UserOptionsPortal/UserOptionsPortal";
import EditIdeaPortal from "../EditIdeaPortal/EditIdeaPortal";
import { useNavigate } from "react-router-dom";
const GalleryItem = ({ item, refreshIdeas }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();
  const ref = useRef();
  const [span, setSpan] = useState(0);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [editing, setEditing] = useState(false);
  const [closing, setClosing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.titre);
  const [newDescription, setNewDescription] = useState(item.description);

  const optionsRef = useRef();
  const editRef = useRef();

  useEffect(() => {
    const height = ref.current.clientHeight;
    setSpan(Math.ceil(height / 10));
  }, []);

  // Handle outside click for user options
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Handle outside click for edit form
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editRef.current && !editRef.current.contains(e.target)) {
        closeEditPortal();
      }
    };
    if (editing) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editing]);

  // Open/close options
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

  // Delete idea
  const deleteIdea = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ideas/${id}`, {
        method: "DELETE",
      });

      if (res.ok) refreshIdeas();
      else console.error("Delete failed");
    } catch (err) {
      console.error(err);
    }
  };

  // Update idea
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/ideas/${item.id}`,
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
        closeEditPortal();
        refreshIdeas();
      } else console.error("Update failed");
    } catch (err) {
      console.error(err);
    }
  };

  // Close portal with animation
  const closeEditPortal = () => {
    setClosing(true);
    setTimeout(() => {
      setEditing(false);
      setClosing(false);
    }, 300); // match CSS animation duration
  };

  return (
    <div className="galleryItem" style={{ gridRowEnd: `span ${span}` }}>
      <img
        ref={ref}
        src={item.photo}
        alt={item.titre}
        onClick={() => navigate(`/idea/${item.id}`)}
      />

      <div className="overlayIcons">
        <button ref={buttonRef} onClick={toggleOptions}>
          <img src="/general/more.svg" alt="options" />
        </button>
      </div>

      {open && (
        <UserOptionsPortal>
          <div
            ref={optionsRef}
            className="userOptions"
            style={{
              position: "absolute",
              top: coords.top,
              left: coords.left,
            }}
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
        <EditIdeaPortal>
          <div
            className={`pageDimmer ${closing ? "fadeOut" : "fadeIn"}`}
            onClick={closeEditPortal}
          ></div>
          <div
            ref={editRef}
            className={`editFormOverlay ${closing ? "slideOut" : "slideIn"}`}
          >
            <h2>Modify idea</h2>
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
                <button type="button" onClick={closeEditPortal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </EditIdeaPortal>
      )}
    </div>
  );
};

export default GalleryItem;
