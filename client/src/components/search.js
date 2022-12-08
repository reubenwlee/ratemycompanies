import React, { useState } from "react";
// import { useNavigate } from "react-router";
 
const Record = (props) => (
  <tr>
    <td>{props.record.position}</td>
    <td>{props.record.yoe}</td>
    <td>{props.record.base_salary}</td>
    <td>{props.record.total_comp}</td>
    <td>{props.record.rating}</td>
    <td>{props.record.pros}</td>
    <td>{props.record.cons}</td>
  </tr>
);
  
export default function Search() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    company: "",
    city: "",
  });
  // const navigate = useNavigate();

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const searchInput = {
      company: form.company,
      city: form.city,
    };
    console.log(searchInput)

    // This will send a post request to update the data in the database.
    const response = await fetch(`http://localhost:5000/record/match/`+ new URLSearchParams({
      company: form.company,
      city: form.city,
  }));
    const records = await response.json();
    console.log(records)
    setRecords(records);
    // navigate("/search");
  }
  
  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  
  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Search for Reviews:</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            className="form-control"
            id="company"
            value={form.company}
            onChange={(e) => updateForm({ company: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={form.city}
            onChange={(e) => updateForm({ city: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Search"
            className="btn btn-primary"
          />
        </div>
      </form>

      <h3>Results</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Position</th>
            <th>YOE</th>
            <th>Base Salary</th>
            <th>Total Comp</th>
            <th>Rating</th>
            <th>Pros</th>
            <th>Cons</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}