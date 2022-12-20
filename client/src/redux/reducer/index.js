const initialState = {
  pokemons: [],
  allpokemons: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allpokemons: action.payload,
      };
    case "FILTER_BY_TYPE":
      const allPokemons = state.allpokemons;
      const typeFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((el) => el.types == action.payload);
      console.log(action.payload);
      return {
        ...state,
        pokemons: typeFiltered,
      };
    case "FILTER_BY_CREATION":
      const allPokes = state.allpokemons;
      const createdFilter =
        action.payload === "inDB"
          ? allPokes.filter((el) => el.inDB)
          : allPokes.filter((el) => !el.inDB);
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allpokemons : createdFilter,
      };
    case "FILTER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.allpokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allpokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArr,
      };
    default:
      return state;
  }
}

export default rootReducer;
