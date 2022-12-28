import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faBookmark,
  faUser,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Footer() {
  const footerStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    padding: "16px",
    backgroundColor: "#252525",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    boxShadow: "rgb(255 255 255 / 85%) 0px 8px 5px 7px",
  };

  return (
    <footer style={footerStyle}>
      <NavLink to="/Dashboard/home">
        <FontAwesomeIcon icon={faHome} />
      </NavLink>{" "}
      <NavLink to="/Dashboard/message">
        <FontAwesomeIcon icon={faEnvelope} />
      </NavLink>{" "}
      <NavLink to="/Dashboard/home">
        <FontAwesomeIcon icon={faBookmark} />
      </NavLink>
      <NavLink to="/Dashboard/profile">
        <FontAwesomeIcon icon={faUser} />
      </NavLink>{" "}
      <NavLink to="/Dashboard/home">
        <FontAwesomeIcon icon={faCog} />
      </NavLink>
    </footer>
  );
}
export default Footer;
