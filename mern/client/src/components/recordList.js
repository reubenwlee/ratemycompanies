import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
  <tr>
    <td>{props.record.company}</td>
    <td>{props.record.country}</td>
    <td>{props.record.state}</td>
    <td>{props.record.city}</td>
    <td>{props.record.position}</td>
    <td>{props.record.yoe}</td>
    <td>{props.record.base_salary}</td>
    <td>{props.record.total_comp}</td>
    <td>{props.record.rating}</td>
    <td>{props.record.pros}</td>
    <td>{props.record.cons}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >Delete</button>
    </td>
  </tr>
  );
  
  export default function RecordList() {
  const [records, setRecords] = useState([]);
  
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      setRecords(records);
    }
  
    getRecords();
  
    return;
  }, [records.length]);
  
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
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
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