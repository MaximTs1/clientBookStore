import React, { useContext, useState, useEffect } from "react";
import { useFilterContext } from "../../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";
import axios from "axios";
import { GeneralContext } from "../../App";
import { useProductsContext } from "../../context/products_context";

const FavoriteProductList = () => {
  const { grid_view } = useFilterContext();
  const { user } = useContext(GeneralContext);

  // State to store the products
  const [idOfFavoriteProducts, setIdOfFavoriteProducts] = useState([]);

  const { products: allProducts } = useProductsContext();

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://185.229.226.27:3001/user/get-favorite-books/${
            user && user.customId
          }`,
          {
            headers: {
              Authorization: localStorage.token,
            },
          }
        );
        setIdOfFavoriteProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Call the function
    fetchProducts();
  }, [user && user.customId]);

  const favoriteProducts = allProducts.filter((product) =>
    idOfFavoriteProducts.includes(String(product.customId))
  );

  if (favoriteProducts.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search.
      </h5>
    );
  }

  if (grid_view === false) {
    return <ListView products={favoriteProducts} />;
  }
  return <GridView products={favoriteProducts} />;
};

export default FavoriteProductList;
