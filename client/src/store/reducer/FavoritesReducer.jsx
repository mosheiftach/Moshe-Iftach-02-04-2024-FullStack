//Redux store for the favorites cities
import { IStoreActions } from "../../enums/enums";

let initialState = {
  favorites: [],
};
export function FavoritesReducer(state = initialState, action) {
  switch (action.type) {
    case IStoreActions.ADD_FAVORITE:
      return {
        favorites: [...state.favorites, action.favorites],
      };
    case IStoreActions.REMOVE_FAVORITE:
      return {
        favorites: [],
      };
    case IStoreActions.DELETE_ONE_FAVORITE:
      return {
        favorites: state.favorites.filter(
          (favorite) => +favorite.cityCode.codeHolder !== +action.currentKey
        ),
      };
    default:
      return state;
  }
}
