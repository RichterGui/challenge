import React, { useState, useEffect } from "react";

const DisplayData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/search-data")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const displayDataStyle = {
    backgroundColor: "#f5f5dc",
    padding: "15px",
  };

  return (
    <div style={{ ...scrollableContainerStyle, ...displayDataStyle }}>
      <h2>Data List</h2>
      <div style={scrollableContentStyle}>
        {data.map((item, index) => (
          <JsonItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const JsonItem = ({ item }) => {
  return (
    <div style={jsonItemStyle}>
      <p>ID: {item._id}</p>
      <p>Localidade: {item.localidade}</p>
      <p>Frequencia: {item.frequencia}</p>
      <p>Keyword: {item.keyword}</p>
      {item.scrapResult && item.scrapResult.length > 0 ? (
        <ScrapResultList scrapResults={item.scrapResult} />
      ) : (
        <p>No Scrap Results</p>
      )}
    </div>
  );
};

const ScrapResultList = ({ scrapResults }) => {
  const quotes = scrapResults.split("|");

  const listStyle = {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "4px",
  };

  return (
    <div style={listStyle}>
      <p>Scrap Results:</p>
      <ul>
        {quotes.map((quote, index) => (
          <li key={index}>{quote}</li>
        ))}
      </ul>
    </div>
  );
};

const scrollableContainerStyle = {
  height: "400px",
  overflowY: "auto",
};

const scrollableContentStyle = {
  padding: "10px",
};

const jsonItemStyle = {
  marginBottom: "20px",
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "4px",
};

export default DisplayData;
