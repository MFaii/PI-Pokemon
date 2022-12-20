import React from "react";

const Pag = ({ pokemonsPerPage, allPokemons, paginado }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="number" key={number}>
              <a onClick={() => paginado(number)}>{number}</a>;
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pag;
