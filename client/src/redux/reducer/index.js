const initialState = {
  pokemons: [],
  allpokemons: [],
  detail: [],
  types: [],
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
          : allPokemons.filter((el) => {
              if (el.types.includes(action.payload)) return el;
            });
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
    case "FILTER_BY_ATTACK":
      let arr =
        action.payload === "asce"
          ? state.allpokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.allpokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      console.log(arr);
      return {
        ...state,
        pokemons: [...arr],
      };
    case "GET_POKENAMES":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "POST_POKEMON":
      return {
        ...state,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "Unmount":
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
