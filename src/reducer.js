function reducer(state = { movie: "", theatre: "", time: "" }, action) {
  switch (action.type) {
    case "SELECT_MOVIE":
      return {
        ...state,
        movie: action.payload
      };
    case "SELECT_THEATRE":
      return {
        ...state,
        theatre: action.payload
      };
    case "SELECT_TIME":
      return {
        ...state,
        time: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
