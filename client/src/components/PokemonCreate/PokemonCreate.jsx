import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PC.module.css";

const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "This space must be filled";
  } else if (!input.life) {
    errors.life = "This space must be filled";
  } else if (!input.attack) {
    errors.attack = "This space must be filled";
  } else if (!input.defense) {
    errors.defense = "This space must be filled";
  } else if (!input.speed) {
    errors.speed = "This space must be filled";
  } else if (!input.weight) {
    errors.weight = "This space must be filled";
  } else if (!input.height) {
    errors.height = "This space must be filled";
  } else if (!input.types) {
    errors.types = "You must choose at least one type";
  }
  return errors;
};
const PokemonCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    img: "",
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postPokemon(input));
    alert("Pokemon created");
    setInput({
      name: "",
      life: "",
      attack: "",
      defense: "",
      speed: "",
      weight: "",
      height: "",
      img: "",
      types: [],
    });
    history.push("/home");
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== e),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <Link to="/home">
          <button className={styles.button}>Home</button>
        </Link>
        <h1>Create your Pokemon</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label>Life:</label>
            <input
              type="number"
              value={input.life}
              name="life"
              onChange={handleChange}
            />
            {errors.life && <p>{errors.life}</p>}
          </div>
          <div>
            <label>Attack:</label>
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={handleChange}
            />
            {errors.attack && <p>{errors.attack}</p>}
          </div>
          <div>
            <label>Defense:</label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={handleChange}
            />
            {errors.defense && <p>{errors.defense}</p>}
          </div>
          <div>
            <label>Speed:</label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={handleChange}
            />
            {errors.speed && <p>{errors.speed}</p>}
          </div>
          <div>
            <label>Weight:</label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={handleChange}
            />
            {errors.weight && <p>{errors.weight}</p>}
          </div>
          <div>
            <label>Height:</label>
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={handleChange}
            />
            {errors.height && <p>{errors.height}</p>}
          </div>
          <div>
            <label>Image:</label>
            <input
              type="text"
              value={input.img}
              name="img"
              onChange={handleChange}
            />
          </div>
          <select onChange={handleSelect}>
            <option selected disabled>
              Types
            </option>
            {types.map((t) => (
              <option value={t.name}>{t.name}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={
              !input.name ||
              !input.life ||
              !input.attack ||
              !input.defense ||
              !input.height ||
              !input.weight ||
              !input.speed ||
              !input.types.length
            }
          >
            Create Pokemon
          </button>
        </form>
        {input.types.map((t) => (
          <div>
            <p>{t}</p>
            <button onClick={() => handleDelete(t)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCreate;
