import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SingleItem.css";

const SingleItem = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/ideas/${id}`)
      .then((res) => res.json())
      .then(setIdea)
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

  if (!idea) return <div className="singleItem-error">Idea not found</div>;

  return (
    <div className="page">
      <div className="singleItem-container">
        <div className="singleItem-card">
          {/* ===== LEFT IMAGE SIDE ===== */}
          <div className="singleItem-imageWrapper">
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

          <div className="singleItem-details">
            <div className="singleItem-options">
              <img src="/general/more.svg" alt="Options" />
            </div>

            <h1 className="singleItem-title">{idea.titre}</h1>
            <p className="singleItem-description">{idea.description}</p>
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
