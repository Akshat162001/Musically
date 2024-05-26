import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import "./App.css";
function App() {
  const [tracks, setTracks] = useState([]);
  const [keywords, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  
  const getTracks = async () => {
    try {
      setLoading(true);
      let response = await fetch(
        `https://v1.nocodeapi.com/albuspotter162001/spotify/dGTCogqpVnbAIMRX/search?type=track&q=${
          keywords === "" ? "trending" : keywords
        }`
      );
      let convertedData = await response.json();

      if (convertedData.tracks && convertedData.tracks.items) {
        console.log(convertedData.tracks.items);
        setTracks(convertedData.tracks.items);
      } else {
        console.error("Unexpected response structure:", convertedData);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark navbar-expand-lg bg-black">
        <div className="container-fluid">
          <span className="navbar-brand" style={{fontSize:"20px"}}>Musically</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/link">
                  Link
                </a>
              </li>
              
            </ul>
            <form className="d-flex" role="search">
              <input
                value={keywords}
                onChange={(event) => setKeyword(event.target.value)}
                className="form-control me-2 w-75"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={getTracks}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <br />
      <br />
      <div className="container">
        {loading && (
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {!loading && keywords === "" && (
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <h1>Search Your Music.....</h1>
              <a
                href="https://github.com/Akshat162001"
                target="_blank"
                rel="noopener noreferrer"
                className="ms-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FaGithub
                  style={{
                    fontSize: "40px",
                    backgroundColor: "black",
                    color: "white",
                    padding: "1px",
                    borderRadius: "30%"
                  }}
                />
              </a>
            </div>
          </div>
        )}
        <br />
        <div className="row">
          {tracks.map((element) => (
            <div key={element.id} className="col-lg-3 col-md-6 py-2">
              <div className="card">
                <img
                  className="card-img-top"
                  src={element.album.images[0].url}
                  alt={`${element.name} album cover`}
                />
                <div className="card-body">
                  <h5 className="card-title">{element.name}</h5>
                  <p className="card-text">
                    Artist: {element.album.artists[0].name}
                  </p>
                  <p className="card-text">
                    Release date: {element.album.release_date}
                  </p>
                  <audio
                    controls
                    src={element.preview_url}
                    className="w-100"
                  ></audio>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
