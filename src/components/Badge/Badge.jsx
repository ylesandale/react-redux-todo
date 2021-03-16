/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Badge.scss";

const Badge = ({ color, onClick, className }) => {
  return (
    <i
      onClick={onClick}
      className={classNames("badge", { [`badge--${color}`]: color }, className)}
    ></i>
  );
};

Badge.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Badge;
