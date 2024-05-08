import React, { useContext } from "react";

const FavoriteContext = React.createContext();

export const FavoriteProvider = ({ children }) => {
  const isFavorite = async (id, user, setUser) => {
    id = id.toString();
    const isAlreadyFavorite = user.likedBooks?.includes(id);
    const updatedLikedBooks = isAlreadyFavorite
      ? user.likedBooks.filter((favoriteId) => favoriteId !== id)
      : [...user.likedBooks, id];
    const dataToUpdate = {
      likedBooks: updatedLikedBooks,
    };
    try {
      const response = await fetch(
        `https://ariellasv-api.onrender.com/user/update-likedBooks/${user.customId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify(dataToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating user");
      }

      const updatedUser = await response.json();
      setUser((user) => ({ ...user, likedBooks: updatedUser.likedBooks }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <FavoriteContext.Provider value={{ isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
export const useFavoriteContext = () => {
  return useContext(FavoriteContext);
};
