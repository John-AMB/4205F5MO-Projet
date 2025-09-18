const GalleryItem = () => {
  return (
    <div className="galleryItem" style={{ gridRowEnd: `span ${span}` }}>
      <img ref={ref} src={item.photo} alt={item.title} />

      <div className="overlayIcons">
        <button ref={}>
          <img src="/general/more.svg" alt="options" />
        </button>
      </div>
    </div>
  );
};
export default GalleryItem;
