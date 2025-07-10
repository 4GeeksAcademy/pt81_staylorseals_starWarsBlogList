export const initialStore=()=>{
  return{
    favorites: [],
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  };
};

export default function storeReducer(state, action = {}) {
  switch(action.type) {
    case "TOGGLE_FAVORITE":
      const exists = state.favorites.find(fav => fav.uid ===action.payload.uid);
      return {
        ...state,
        favorites: exists
        ? state.favorites.filter(fav => fav.uid !== action.payload.uid)
        : [...state.favorites, action.payload],
      };

    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      return state;
  }    
}
