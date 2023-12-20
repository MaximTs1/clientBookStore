import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: (
      <>
        The mission is simple: to provide exceptional sales experiences and
        top-notch customer service. <br />
        Im committed to helping you find the perfect products and ensuring your
        satisfaction every step of the way. <br />
        Join me on this journey, and let me exceed your expectations.
      </>
    ),
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "After book sales launch, im planning to expand my items to rare and untique pazzels and different art items.",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];

export const products_url = "http://185.229.226.27:3001/api/get-books";

export const single_product_url = `https://185.229.226.27:3001/api/book/?id=`;
