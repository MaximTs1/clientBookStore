import {
  faPhoneFlip,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
const personal_info_data = [
  {
    // index: 1,
    // section_one: [
    //   {
    //     index: 1,
    //     data_type: "Age",
    //     data_value: "20",
    //   },
    //   {
    //     index: 2,
    //     data_type: "Gender",
    //     data_value: "male",
    //   },
    //   {
    //     index: 3,
    //     data_type: "Languages",
    //     data_value: "Marathi/Hindi/English",
    //   },
    // ],
    section_two: [
      {
        index: 1,
        data_type: "Phone",
        data_value: "054-7540666",
        icon: faPhoneFlip,
        ic_color: "#e64a19",
      },
      {
        index: 2,
        data_type: "Email",
        data_value: "ariella196161@gmail.com",
        icon: faEnvelope,
        ic_color: "#00838F",
      },
      {
        index: 3,
        data_type: "Address",
        data_value: "Jerusalen 17, Qiryat Ono, Israel",
        icon: faLocationDot,
        ic_color: "rgb(34 119 0)",
      },
    ],
  },
];

export default personal_info_data;
