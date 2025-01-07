import { useEffect, useState } from "react";
import axios from "axios";

function CalendarPage() {
  const [entries, setEntries] = useState([]);
  const LOCAL_URL = "http://localhost:5050";

  const getEntries = async () => {
    console.log("in getEntries");
    // fetch calendar entries from the back end also known as the api that i am creating
    // this endpoint is:  /api/calendar
    try {
      const response = await axios.get(`${LOCAL_URL}/api/calendar`);
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
        }}
      >
        {entries.map((entry) => (
          <li>
            {entry.startDate}: {entry.label}
          </li>
        ))}
      </ul>
    );
  };

  const loading = () => {
    return <h3>There dont seem to be any entries</h3>;
  };
  return (
    <>
      <h1>Calendar</h1>
      {entries.length ? loaded() : loading()}
    </>
  );
}

export default CalendarPage;
