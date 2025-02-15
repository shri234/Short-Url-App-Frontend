import React, { useEffect, useState } from "react";
import axios from "axios";
import "./shorturllist.css";
import { useNavigate } from "react-router-dom";

const ShortUrlsList = () => {
  const [shortUrls, setShortUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShortUrls = async () => {
      try {
        const response = await axios.get("https://short-url-app-vet9.onrender.com/api/shortUrls");
        setShortUrls(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch short URLs.");
        setLoading(false);
      }
    };

    fetchShortUrls();
  }, []);

  if (loading) {
    return <div className="message">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
    
      {shortUrls.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shortUrls.map((url) => (
              <tr key={url._id}>
                <td>{url.shortUrl}</td>
                <td>
                  <a
                    href={`https://short-url-app-vet9.onrender.com/api/shorten?shortUrl=${encodeURIComponent(
                      url.shortUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="message">No short URLs found.</p>
      )}
        {/* <div className="table-header"> */}
        {/* <h1 className="table-title">Short URLs List</h1> */}
        <button
          className="navigate-button"
          onClick={() => navigate("/short-url-generator")}
        >
          Create ShortUrl
        </button>
      {/* </div> */}
    </div>
  );
};

export default ShortUrlsList;
