import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SingleItem.css";

const SingleItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idea, setIdea] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  // Fetch idea, comments and likes
  useEffect(() => {
    if (!id) return;

    const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

    // Fetch idea details
    fetch(`${backendUrl}/ideas/${id}`)
      .then((res) => res.json())
      .then((data) => setIdea(data))
      .catch(console.error);

    // Fetch comments
    fetch(`${backendUrl}/ideas/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch(console.error);

    // Fetch likes count
    fetch(`${backendUrl}/ideas/likes/${id}`)
      .then((res) => res.json())
      .then((data) => setLikes(data.likes))
      .catch(console.error);

    // Check if user liked
    fetch(`${backendUrl}/ideas/likes/${id}/user/1`)
      .then((res) => res.json())
      .then((data) => setLiked(data.liked))
      .catch(() => setLiked(false));
  }, [id]);

  // Handle like toggle
  const handleLike = async () => {
    const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
    try {
      await fetch(`${backendUrl}/ideas/likes/${id}`, {
        method: "POST",
      });

      const likesRes = await fetch(`${backendUrl}/ideas/likes/${id}`);
      const likesData = await likesRes.json();

      setLiked((prev) => !prev);
      setLikes(likesData.likes || 0);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  // Add new comment
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

    try {
      const res = await fetch(`${backendUrl}/ideas/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idee_id: id, content: newComment }),
      });
      const data = await res.json();

      setComments([...comments, data]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding your comment:", err);
    }
  };

  // Download image
  const handleDownload = () => {
    const downloadUrl = idea.photo.replace(
      "/upload/",
      "/upload/fl_attachment/"
    );
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${idea.titre}.jpg`;
    link.click();
  };

  if (!idea) return <div className="singleItem-error">Idea not found</div>;

  return (
    <div className="page">
      <div className="singleItem-container">
        <div className="singleItem-card">
          {/* ===== LEFT IMAGE SIDE ===== */}
          <div className="singleItem-imageWrapper">
            {/* ❤️ Like button */}
            <button
              className={`heart-btn ${liked ? "liked" : ""}`}
              onClick={handleLike}
              title="Like"
            >
              {liked ? "♥️" : "🤍"}
            </button>

            <img
              src={idea.photo}
              alt={idea.titre}
              className="singleItem-image"
            />

            {/* Download button */}
            <a onClick={handleDownload} className="singleItem-openNewTwo">
              <img
                src="/general/download.png"
                alt="Download"
                className="singleItem-openIcon"
              />
            </a>

            {/* Open full size */}
            <a
              href={idea.photo}
              target="_blank"
              rel="noopener noreferrer"
              className="singleItem-openNew"
            >
              <img
                src="/general/resize.png"
                alt="Open full size"
                className="singleItem-openIcon"
              />
            </a>
          </div>

          {/* ===== RIGHT DETAILS SIDE ===== */}
          <div className="singleItem-details">
            <div className="singleItem-options">
              <img src="/general/more.svg" alt="Options" />
            </div>
            <div className="section1">
              <h1 className="singleItem-title">{idea.titre}</h1>
              <p className="singleItem-description">{idea.description}</p>
            </div>
            <div className="like-count">
              <span>
                {likes} {likes === 1 ? "like" : "likes"}
              </span>
            </div>

            {/* ===== COMMENTS SECTION ===== */}
            <div className="comments-section">
              <h3>Comments</h3>

              {comments.length === 0 ? (
                <p className="no-comments">No comments yet.</p>
              ) : (
                <>
                  <div className="comments-list">
                    {comments
                      .slice(0, showAllComments ? comments.length : 4)
                      .map((c) => (
                        <div key={c.id} className="comment">
                          {c.content}
                        </div>
                      ))}
                  </div>

                  {comments.length > 4 && (
                    <button
                      className="toggle-comments-btn"
                      onClick={() => setShowAllComments(!showAllComments)}
                    >
                      {showAllComments
                        ? "Show less ↑"
                        : `View all ${comments.length} comments ↓`}
                    </button>
                  )}
                </>
              )}

              {/* Comment input */}
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  maxLength={45}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Post</button>
              </div>
            </div>
          </div>
        </div>

        <button className="singleItem-backBtn" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
