import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokeNames } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokeNames(name));
    setName("");
  };

  return (
    <div>
      <input
        value={name}
        type="text"
        placeholder="Search"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
