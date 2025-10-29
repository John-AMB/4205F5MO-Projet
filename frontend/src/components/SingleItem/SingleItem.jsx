import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SingleItem.css";

const SingleItem = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/ideas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIdea(data);
        setLikes(data.likes || 0);
      })
      .catch(console.error);
  }, [id]);

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

  // ❤️ Like toggle
  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };
  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const comment = {
      id: Date.now(),
      text: newComment,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  if (!idea) return <div className="singleItem-error">Idea not found</div>;

  return (
    <div className="page">
      <div className="singleItem-container">
        <div className="singleItem-card">
          {/* ===== LEFT IMAGE SIDE ===== */}
          <div className="singleItem-imageWrapper">
            {/* ♥️ Like button */}
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

              {/* If there are more than 4 comments, show only the first 4 unless expanded */}
              {comments.length === 0 ? (
                <p className="no-comments">No comments yet.</p>
              ) : (
                <>
                  <div className="comments-list">
                    {" "}
                    {/* <-- THIS is scrollable */}
                    {comments
                      .slice(0, showAllComments ? comments.length : 4)
                      .map((c) => (
                        <div key={c.id} className="comment">
                          {c.text}
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

              {/* Comment input always at bottom */}
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
