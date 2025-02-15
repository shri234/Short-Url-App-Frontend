import React, { useState } from "react";
import axios from "axios";
import './shorturlgenerator.css';

const ShortUrlGenerator = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customShortUrl, setCustomShortUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    try {
      setError(""); // Clear previous error
      const response = await axios.post("https://short-url-app-vet9.onrender.com/api/shorten", {
        longUrl,
        customShortUrl: customShortUrl || undefined,
      });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Short URL Generator</h1>
        <p className="text-gray-600 mb-6 text-center">Enter a long URL to create a short URL instantly.</p>

        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          className="w-full mb-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          value={customShortUrl}
          onChange={(e) => setCustomShortUrl(e.target.value)}
          placeholder="Custom short URL (optional)"
          className="w-full mb-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleGenerate}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Generate Short URL
        </button>

        {shortUrl && (
    <div className="mt-6 p-4 bg-green-50 border border-green-400 rounded-lg text-green-800">
        <p className="font-semibold">Short URL:</p>
        <a
            href={`https://short-url-app-vet9.onrender.com/api/shorten?shortUrl=${encodeURIComponent(shortUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
        >
            {shortUrl}
        </a>
    </div>
)}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-400 rounded-lg text-red-800">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortUrlGenerator;
