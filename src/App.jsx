import axios from "axios";
import { useState } from "react";

export default function App() {

  const apiUrl = `https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts`;

  const [formData, setFormData] = useState({
    author: ``,
    title: ``,
    body: ``,
    public: false,
  });

  const [alertMessage, setAlertMessage] = useState(``);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === `checkbox` ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(apiUrl, formData)
      .then(response => {
        console.log(`Dati inviati correttamente: `, response.data);
        setAlertMessage(`Post inviato con successo!`);
      })
      .catch(error => {
        console.log(`Errore durante l'invio dei dati `, error);
        setAlertMessage(`Errore durante l'invio del post!`);
      });
  };



  return (
    <>
      <h1 className="text-center text-white my-4">CREA UN NUOVO POST</h1>

      {alertMessage && <div className="d-flex justify-content-center my-5">{alertMessage}</div>}

      <form className="container d-flex flex-wrap justify-content-between" onSubmit={handleSubmit}>
        <div className="col-4 my-2 w-50">
          <label htmlFor="" className="form-label fw-bold fs-4">Author:</label>
          <input 
            type="text" 
            name="author" 
            onChange={handleChange}
            value={formData.author}
            id="author" 
            className="form-control"
          />
        </div>

        <div className="col-4 my-2 w-50">
          <label htmlFor="" className="form-label fw-bold fs-4">Title:</label>
          <input 
            type="text" 
            name="title" 
            onChange={handleChange}
            value={formData.title}
            id="title" 
            className="form-control"
          />
        </div>

        <div className="col-6 my-2">
          <label htmlFor="" className="form-label fw-bold fs-4">Body:</label>
          <textarea 
            type="text" 
            name="body" 
            onChange={handleChange}
            value={formData.body}
            id="body" 
            className="form-control"
          />
        </div>

        <div className="form-check col-3 mt-5">
          <input 
            type="checkbox" 
            name="public" 
            onChange={handleChange}
            value={formData.public}
            id="public" 
            className="form-check-input fs-2"
          />
          <label htmlFor="" className="form-check-label fw-bold fs-4 mx-3">Public</label>
        </div>

        <button type="submit" className="btn btn-primary text-center px-4 col-4 my-3">Invia</button>
      </form>
    </>
  );
}
