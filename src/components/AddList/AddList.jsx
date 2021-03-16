import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import List from "../List/List";
import Badge from "../Badge/Badge";

import { setSelectedColor } from "../../redux/actions/colors";
import { AddLists } from "../../redux/actions/lists";
import { setVisiblePopup } from "../../redux/actions/popup";

import closeSvg from "../../assets/img/close.svg";
import "./AddList.scss";

const AddList = ({ colors }) => {
  const dispatch = useDispatch();
  const visiblePopup = useSelector(({ popup }) => popup.visiblePopup);
  const ref = React.useRef("");

  const onSelectColor = (id) => {
    dispatch(setSelectedColor(id));
  };

  const onVisiblePopup = () => {
    dispatch(setVisiblePopup());
    onSelectColor(1);
  };

  const onAddList = (name, color) => {
    dispatch(AddLists(name, color));
  };

  const toggleAddList = () => {
    const color = colors.filter((color) => color.selectedColor)[0];
    if (ref.current.value) {
      onAddList(ref.current.value, color.id);
    } else {
      alert("Название списка не может быть пустым");
    }
    ref.current.value = "";
    onSelectColor(1);
  };

  return (
    <div className="add-list">
      <List
        onVisiblePopup={onVisiblePopup}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="list__add-button"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить список",
            addList: true,
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onVisiblePopup}
            src={closeSvg}
            alt="Close button"
            className="add-list__popup-close-btn"
          />
          <input
            ref={ref}
            className="field"
            type="text"
            placeholder="Название списка"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => onSelectColor(color.id)}
                key={color.id}
                color={color.name}
                className={color.selectedColor && "active"}
              />
            ))}
          </div>
          <button onClick={toggleAddList} className="button">
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

AddList.propTypes = {
  colors: PropTypes.array,
  onSelectColor: PropTypes.func,
};

export default AddList;
