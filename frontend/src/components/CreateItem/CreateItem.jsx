const CreateItem = () => {
  return (
    <div className="container-form">
      <img src="../../../public/general/logo.png" alt="Logo" />
      <div>
        <h1>add</h1>
      </div>
      <form className="form">
        <div className="input-field">
          <h3>title</h3>
          <input id="title" type="text" name="title" required />
        </div>
        <div className="input-field">
          <h3>description</h3>
          <textarea name="description" required />
        </div>
        <div className="input-field">
          <input type="file" name="photo" />
        </div>
        <div className="btn-container">
          <button className="btn">save</button>
        </div>
      </form>
    </div>
  );
};
export default CreateItem;
