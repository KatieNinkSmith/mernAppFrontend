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
  const [entryUpdate, setEntryUpdate] = useState("");
  const [entryType, setEntryType] = useState("");
  // edit
  const [editFormId, setEditFormId] = useState();
  const [editedForm, setEditedForm] = useState({
    entryDate: current,
    entryType: "",
    description: "",
  });

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
    let addedEntry = {};
    try {
      const response = await axios.post(`${LOCAL_URL}/api/braindump`, newEntry);
      addedEntry = response.data;
    } catch (err) {
      error = true;
      console.log(err);
    } finally {
      if (error) {
        setEntryUpdate("there was an error");
      } else {
        setEntryUpdate(
          `Successfully Added ${addedEntry.entryType} - ${addedEntry.description}`
        );
      }
    }
  };

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(`${LOCAL_URL}/api/braindump/${id}`);
      console.log(response);
      setEntryUpdate(`Successfully deleted entry: ${id}`);
    } catch (err) {
      console.error(err);
      setEntryUpdate("delete failed");
    }
  };

  const editEntry = async (id) => {
    try {
      const response = await axios.put(
        `${LOCAL_URL}/api/braindump/${id}`,
        editedForm
      );
      console.log(response);
      setEntryUpdate(`Successfully updated entry: ${id}`);
    } catch (err) {
      console.error(err);
      setEntryUpdate("edit failed");
    }
  };

  const handleEdit = (date, type, description, id) => {
    console.log(date, type, description, id); // *** all data is pulled
    setEditFormId(id); // *** id is not getting set here
    console.log("this is the edit id:", editFormId);
    // edited form data
    setEditedForm({
      entryDate: date,
      entryType: type,
      description: description,
    });

    console.log(editedForm); // *** type and description are not getting pulled down,
  };

  const cancelEdit = () => {
    setEditFormId(null); // Clear the edit form state
    setEditedForm({ entryDate: current, entryType: "", description: "" }); // Reset the form
  };

  const handleDelete = (e, id) => {
    console.log(`deleting... entry:`);
    deleteEntry(id);
    // add in function delete entry
    console.log(e, id);
  };

  useEffect(() => {
    getEntries();
  }, [entryUpdate]);

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
        {entries.map((entry, index) => (
          <li key={index}>
            {editFormId === entry._id ? (
              <>
                <>
                  <input
                    type="date"
                    name="entryDate"
                    required
                    onChange={handleEditChange}
                    value={editedForm.entryDate}
                  />
                  <label>
                    Choose the Entry Type
                    <select
                      name="entryType"
                      value={editedForm.entryType}
                      onChange={handleEditChange}
                    >
                      <option value="None"> </option>
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
                    onChange={handleEditChange}
                    value={editedForm.description}
                  />
                  <button onClick={(e) => editEntry(e, entry._id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              </>
            ) : (
              <>
                {entry.entryDate}: {entry.entryType} : {entry.description}
                <button
                  onClick={(e) =>
                    handleEdit(
                      entry.entryDate,
                      entry.entryType,
                      entry.description,
                      entry._id
                    )
                  }
                >
                  Edit
                </button>
              </>
            )}

            <button onClick={(e) => handleDelete(e, entry._id)}>Delete</button>
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
      entryType: entryType || "None",
      description: formData.description,
    };
    addEntry(newEntry);
    console.log(newEntry);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // This function is called when the user changes any input field (date, type, description)
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    // Update only the field that changed (keeping others intact)
    setEditedForm((prevForm) => ({
      ...prevForm, // Keep the previous values intact
      [name]: value, // Update the specific field that changed
    }));
  };

  const handleTypeSelect = (e) => {
    setEntryType(e.target.value);
  };

  const loading = () => {
    return <h3>There dont seem to be any entries</h3>;
  };

  return (
    <>
      <h1>Brain Dump</h1>
      <ol>
        CRUD
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
              <select value={entryType} onChange={handleTypeSelect}>
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
          <p>{entryUpdate}</p>
        </div>
        <div>{entries.length ? loaded() : loading()}</div>
      </div>
    </>
  );
}

export default BrainDumpPage;
