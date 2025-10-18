import React, { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({ name: "", age: "", gender: "" });
  const [people, setPeople] = useState([]);

  const backendURL = "https://production-deploy-1.onrender.com"; // e.g. from Render

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const payload = {
    name: form.name,
    age: Number(form.age),  // convert to number
    gender: form.gender
  };

  await fetch(`${backendURL}/api/person`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  setForm({ name: "", age: "", gender: "" });
  fetchPeople();
};


  const fetchPeople = async () => {
    const res = await fetch(`${backendURL}/api/person`);
    const data = await res.json();
    setPeople(data);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>👤 Person Form</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} required type="number" />
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Save</button>
      </form>

      <h2>📋 People List</h2>
      <ul>
        {people.map((p) => (
          <li key={p._id}>{p.name} — {p.age} — {p.gender}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
