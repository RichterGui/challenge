import React, { useState } from "react";

const SearchForm = () => {
  const initialFormData = {
    localidade: "",
    frequencia: "daily",
    keyword: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);

        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputContainerStyle}>
        <label htmlFor="localidade" style={labelStyle}>
          Localidade:
        </label>
        <input
          type="text"
          id="localidade"
          name="localidade"
          value={formData.localidade}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label htmlFor="frequencia" style={labelStyle}>
          Frequencia:
        </label>
        <select
          id="frequencia"
          name="frequencia"
          value={formData.frequencia}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div style={inputContainerStyle}>
        <label htmlFor="keyword" style={labelStyle}>
          Keyword:
        </label>
        <input
          type="text"
          id="keyword"
          name="keyword"
          value={formData.keyword}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <button type="submit" style={submitButtonStyle}>
        Submit
      </button>
    </form>
  );
};

// Styles
const formStyle = {
  maxWidth: "400px",
  margin: "auto",
};

const inputContainerStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  color: "white",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const submitButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginBottom: "3rem",
};

export default SearchForm;
