import ideas from "../../../public/ideas.json";

const Gallery = () => {
  return (
    <div className="gallery">
      {ideas.map((item, index) => (
        <div key={index} className="galleryItem">
          <img src={item.photo} alt={item.title} />
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
