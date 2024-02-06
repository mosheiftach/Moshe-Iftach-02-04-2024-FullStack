import { IStoreActions } from "../../enums/enums";

// Action creators
export const addFavorite = () => {
  return IStoreActions.ADD_FAVORITE;
};

export const removeFavorite = () => {
  return IStoreActions.REMOVE_FAVORITE;
};

export const deleteOneFavorite = () => {
  return IStoreActions.DELETE_ONE_FAVORITE;
};
