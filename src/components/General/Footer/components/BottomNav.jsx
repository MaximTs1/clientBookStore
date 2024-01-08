import React from "react";
import "./BottomNav.css";
import SocialMediaLinks from "./SocialMediaLinks";
import my_navbar_data from "../assets/NavData";
import { HashLink } from "react-router-hash-link";
import personal_info_data from "../assets/AboutIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../../assets/logo.jpeg";

const BottomNav = () => {
  return (
    <>
      <div className="bottom_nav_container">
        <div className="bottom_nav_section">
          <div className="bot_nav_left">
            <div className="bot_left_header">
              <HashLink
                to="/admin/login"
                style={{ textDecoration: "none", color: "#fff" }}
              ></HashLink>
            </div>
            <div className="bot_middle_info">
              <img
                src={logo}
                alt="Ariella Books"
                style={{ width: "300px", height: "auto" }}
              />
              <p className="basic_info">
                Thank you for visiting and checking out my books collection 😊
                <br></br>
                For any question, don`t hesitate and contact me for anything!
              </p>
            </div>
            {/* <div>
              <Githubcomp
                href="https://github.com/ganraj21"
                shadow="#482e87 0px 0px 13px"
              />
            </div> */}
          </div>
          <div className="bot_nav_middle">
            <div className="bot_middle_header">
              <h3>Quick Links</h3>
            </div>
            {/* <div className="bot_nav">
              {my_navbar_data.map((data, index) => {
                return (
                  <a
                    key={index}
                    href={data.nav_link}
                    style={{ textDecoration: "none" }}
                  >
                    <FontAwesomeIcon
                      icon={data.icon}
                      style={{
                        color: "grey",
                        transition: "all 0.3s",
                        fontSize: "1.3rem",
                      }}
                    />
                    <p style={{ transition: "color 0.3s", fontSize: "1rem" }}>
                      {data.navbar_name}
                    </p>
                  </a>
                );
              })}
            </div>  */}

            <div className="bot_nav">
              {my_navbar_data.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <HashLink
                      to={data.nav_link}
                      scroll={(el) => el.scrollIntoView({ behavior: "smooth" })}
                    >
                      <FontAwesomeIcon
                        icon={data.icon}
                        style={{
                          color: "grey",
                          transition: "all 0.3s",
                          fontSize: "1.3rem",
                        }}
                      />
                      <p style={{ transition: "color 0.3s", fontSize: "1rem" }}>
                        {data.navbar_name}
                      </p>
                    </HashLink>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="bot_nav_right">
            <div className="bot_right_header">
              <h3>Contact Info</h3>
            </div>
            <div className="bot_contact_info">
              {personal_info_data.map((data, index) => {
                return (
                  <div className="bot_cdiv" key={index}>
                    {data.section_two.map((e, i) => {
                      return (
                        <div className="contact_me_here" key={`${index}-${i}`}>
                          <FontAwesomeIcon
                            icon={e.icon}
                            style={{ color: e.ic_color }}
                          />
                          <p>{e.data_value}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <SocialMediaLinks style={{ gap: "15px", display: "flex" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
