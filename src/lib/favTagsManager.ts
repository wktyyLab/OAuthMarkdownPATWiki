const keyName = process.env.NEXT_PUBLIC_STORAGE_FAVORITE_TAGS!;

export function getFavList() {
  const favStorage = localStorage.getItem(keyName);
  return favStorage ? (JSON.parse(favStorage) as string[]) : [];
}

export function saveFavList(favorites: string[]) {
  const savingText = JSON.stringify(favorites);
  localStorage.setItem(keyName, savingText);
}

export function hasFavorite(tag: string) {
  const favorites = getFavList();
  return favorites.includes(tag);
}

export function addFavorite(tag: string) {
  const favorites = getFavList();
  const updatedFavorites = [...favorites, tag];
  saveFavList(updatedFavorites);
}

export function removeFavorite(tag: string) {
  const favorites = getFavList();
  const updatedFavorites = favorites.filter((fav) => fav != tag);
  saveFavList(updatedFavorites);
}
