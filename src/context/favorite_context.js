export const isFavorite = async (id, user, setUser) => {
  const isAlreadyFavorite = user.likedBooks?.includes(id);
  const updatedLikedBooks = isAlreadyFavorite
    ? user.likedBooks.filter((favoriteId) => favoriteId !== id)
    : [...user.likedBooks, id];
  const dataToUpdate = {
    likedBooks: updatedLikedBooks,
  };
  try {
    const response = await fetch(
      `http://185.229.226.27:3001/user/update-likedBooks/${user.customId}`,
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
