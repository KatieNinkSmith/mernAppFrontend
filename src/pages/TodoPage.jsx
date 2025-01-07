import { useEffect, useState } from "react";
import axios from "axios";

function TodoPage() {
  const [entries, setEntries] = useState([]);
  const LOCAL_URL = "http://localhost:5050";

  const getEntries = async () => {
    console.log("in getEntries");
    // fetch todos entries from the back end also known as the api that i am creating
    // this endpoint is:  /api/todos
    try {
      const response = await axios.get(`${LOCAL_URL}/api/todos`);
      console.log(response.data);
      setEntries(response.data);
    } catch (err) {
      console.err(err);
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
          width: "max-content",
        }}
      >
        {entries.map((entry) => (
          <li>
            {entry.text}: {entry.completed ? <>DONE</> : <>____ </>}:{" "}
            {entry.due}
          </li>
        ))}
      </ul>
    );
  };

  const loading = () => {
    return <h3>There dont seem to be any entries</h3>;
  };

  return (
    <div>
      <h1>Todo</h1>
      {entries.length ? loaded() : loading()}
    </div>
  );
}

export default TodoPage;
