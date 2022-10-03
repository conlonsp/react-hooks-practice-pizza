import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [editZa, setEditZa] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/pizzas')
    .then(r => r.json())
    .then(data => setPizzas(data))
  }, [])

  function handleClick(id) {
    const foundZa = pizzas.find(pizza => pizza.id === id)
    setEditZa(foundZa)
  }

  function updatePizzas(newPizza) {
    const newPizzaList = pizzas.map(pizza => {
      return pizza.id === newPizza.id ? newPizza : pizza
    })
    setPizzas(newPizzaList)
  }

  return (
    <>
      <Header />
      <PizzaForm
        {...editZa}
        setEditZa={setEditZa}
        updatePizzas={updatePizzas}
      />
      <PizzaList handleClick={handleClick} pizzas={pizzas} />
    </>
  );
}

export default App;
