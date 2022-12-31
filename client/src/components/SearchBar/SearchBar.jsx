import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokeNames } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokeNames(name));
    setName("");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.search}>
        <input
          value={name}
          type="text"
          placeholder="Search"
          onChange={(e) => handleInputChange(e)}
          className={styles.searchTerm}
        />
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className={styles.searchButton}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
