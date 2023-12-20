import {
  faPhoneFlip,
  faLocationDot,
  faEnvelope,
  faHouse,
  faAddressCard,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

const my_navbar_data = [
  {
    index: 1,
    nav_link: `/`,
    navbar_name: "Home",
    bc: "#00a5ee",
    icon: faAnglesRight,
  },
  {
    index: 2,
    nav_link: `/about`,
    navbar_name: "About",
    icon: faAnglesRight,
  },
  {
    index: 3,
    nav_link: `/tech/#my_skill`,
    navbar_name: "Purchase Information",
    icon: faAnglesRight,
    another_page: true,
  },

  {
    index: 4,
    nav_link: "/#my-work",
    navbar_name: "Legal Information",
    icon: faAnglesRight,
  },
  {
    index: 5,
    nav_link: `/#contact_page`,
    navbar_name: "Contact Me",
    icon: faAnglesRight,
  },
];

export default my_navbar_data;
