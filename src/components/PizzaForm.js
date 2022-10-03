import React from "react";

function PizzaForm({ id, topping, size, vegetarian, setEditZa, updatePizzas }) {
  function handleChange(e) {
    setEditZa(prevZa => {
      if(e.target.name === 'vegetarian') {
        return {
          ...prevZa,
          [e.target.name]: e.target.value === 'Vegetarian' ? true : false
        }
      } else {
        return {
          ...prevZa,
          [e.target.name]: e.target.value,
        }
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    fetch(`http://localhost:3001/pizzas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        topping,
        size,
        vegetarian,
      })
    })
    .then(r => r.json())
    .then(data => updatePizzas(data))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            onChange={handleChange}
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={topping}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={size} onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              onChange={handleChange}
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={vegetarian ? true : false}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              onChange={handleChange}
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={vegetarian ? false : true}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
