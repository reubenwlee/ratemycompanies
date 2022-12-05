import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
  const [form, setForm] = useState({
    company: "",
    country: "",
    state: "",
    city: "",
    position: "",
    yoe: "",
    base_salary: "",
    total_comp: "",
    rating: "",
    pros: "",
    cons: "",
  });
  const navigate = useNavigate();
  
  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newReview = { ...form };
  
    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  
    setForm({ 
      company: "",
      country: "",
      state: "",
      city: "",
      position: "",
      yoe: "",
      base_salary: "",
      total_comp: "",
      rating: "",
      pros: "",
      cons: ""
    });
    navigate("/");
  }
  
  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Enter Review</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="company"
            value={form.company}
            onChange={(e) => updateForm({ company: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            value={form.country}
            onChange={(e) => updateForm({ country: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            value={form.state}
            onChange={(e) => updateForm({ state: e.target.value })}
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
          <label htmlFor="position">Job Position</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="yoe">Your Years of Experience in this Industry</label>
          <input
            type="text"
            className="form-control"
            id="yoe"
            value={form.yoe}
            onChange={(e) => updateForm({ yoe: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="base_salary">Your yearly base salary</label>
          <input
            type="text"
            className="form-control"
            id="base_salary"
            value={form.base_salary}
            onChange={(e) => updateForm({ base_salary: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="total_comp">Your total compensation including bonuses, stock matching, etc. Note: add additional income to your base salary</label>
          <input
            type="text"
            className="form-control"
            id="total_comp"
            value={form.total_comp}
            onChange={(e) => updateForm({ total_comp: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rate your experience out of 5!</label>
          <input
            type="text"
            className="form-control"
            id="rating"
            value={form.rating}
            onChange={(e) => updateForm({ rating: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pros">Pros: Tell us what was good about your experience:</label>
          <input
            type="text"
            className="form-control"
            id="pros"
            value={form.pros}
            onChange={(e) => updateForm({ pros: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cons">Cons: Tell us what could have been better:</label>
          <input
            type="text"
            className="form-control"
            id="cons"
            value={form.cons}
            onChange={(e) => updateForm({ cons: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Submit my Rating"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}