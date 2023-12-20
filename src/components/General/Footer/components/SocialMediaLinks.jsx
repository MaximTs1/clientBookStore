import React from "react";
import social_media_data from "../assets/SocialMData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Frontpage.css";

function SocialMediaLinks(props) {
  return (
    <>
      <div className="colz-icon">
        {social_media_data.map((data, index) => {
          return (
            <a
              key={data.index}
              href={data.where_to_go_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={data.icon_class} className="icon-link" />
            </a>
          );
        })}
      </div>
    </>
  );
}

export default SocialMediaLinks;
