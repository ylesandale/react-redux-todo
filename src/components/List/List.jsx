/* eslint-disable no-unused-vars */
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import Badge from "../Badge/Badge";

import "./List.scss";
import removeSvg from "../../assets/img/remove.svg";

const List = ({
  items,
  onVisiblePopup,
  isRemovable,
  onRemoveList,
  onActiveList,
}) => {
  return (
    <ul onClick={onVisiblePopup} className="list">
      {items.map((item) => (
        <li
          key={item.id}
          onClick={!item.addList ? () => onActiveList(item.id) : null}
          className={classNames(item.className, { active: item.active })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>
            {item.name}{" "}
            {item.id !== "main" && item.tasks && ` (${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="Remove icon"
              onClick={() => onRemoveList(item.id)}
            ></img>
          )}
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.array,
  onVisiblePopup: PropTypes.func,
  isRemovable: PropTypes.bool,
  onRemoveList: PropTypes.func,
  onActiveList: PropTypes.func,
};

export default List;
