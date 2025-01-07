import { useEffect, useState } from "react";
import axios from "axios";

function BrainDumpPage() {
  const current = new Date();

  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    entryDate: current,
    entryType: "",
    description: "",
  });
  const [update, setUpdate] = useState("");
  const [entType, setEntType] = useState("");

  const LOCAL_URL = "http://localhost:5050";

  const getEntries = async () => {
    console.log("in getEntries");
    // fetch brain dump entries from the back end also known as the api that i am creating
    // this endpoint is:  /api/braindump
    try {
      const response = await axios.get(`${LOCAL_URL}/api/braindump`);
      console.log(response.data);
      setEntries(response.data);
    } catch (err) {
      console.err(err);
    }
  };

  const addEntry = async (newEntry) => {
    let error = false;

    try {
      const response = await axios.post(`${LOCAL_URL}/api/braindump`, newEntry);
    } catch (err) {
      error = true;
      console.error(err);
    } finally {
      if (error) {
        setUpdate("there was an error");
      } else {
        // once i actually implement the post route in my backend, i will show the added entry
        setUpdate("successfully added");
      }
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  const loaded = () => {
    return (
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
          margin: "50px",
        }}
      >
        {entries.map((entry) => (
          <li>
            {entry.entryDate}: {entry.type}: {entry.description}
          </li>
        ))}
      </ul>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newEntry = {};
    console.log("in handleSubmit");
    // send the post request to the back end
    console.log(formData);
    newEntry = {
      entryDate: formData.entryDate,
      enrtyType: entType,
      description: formData.description,
    };
    addEntry(newEntry);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeSelct = (e) => {
    setEntType(e.target.value);
  };

  const loading = () => {
    return <h3>There dont seem to be any entries</h3>;
  };

  return (
    <>
      <h1>Brain Dump</h1>
      <ol>
        {" "}
        CRUD
        <li>Create - for to add new entry</li>
        <li>Read - show all (which is have), the rest is future work</li>
        <li>Update - from to edit a specific entry</li>
        <li>Delete - button to delete an entry</li>
      </ol>
      <div style={{ display: "flex", margin: "50px" }}>
        <div>
          <h3>Add a new entry</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              name="entryDate"
              required
              onChange={handleChange}
              value={formData.entryDate}
            />
            <label>
              Choose the entry Type
              <select value={entType} onChange={handleTypeSelct}>
                <option value="None"></option>
                <option value="ToDo">To Do</option>
                <option value="Idea">Idea</option>
                <option value="Appt">Appt</option>
                <option value="Sched">Sched</option>
                <option value="List">List</option>
              </select>
            </label>
            <input
              type="text"
              name="description"
              required
              onChange={handleChange}
              value={formData.Description}
            />
            <input type="submit" value="Add a new entry" />
          </form>
          <p>{update}</p>
        </div>
        <div>{entries.length ? loaded() : loading()}</div>
      </div>
    </>
  );
}

export default BrainDumpPage;
