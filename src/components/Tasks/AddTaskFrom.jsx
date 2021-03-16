import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { addTask } from "../../redux/actions/lists";
import { visibleAddForm, unvisibleAddForm } from "../../redux/actions/lists";

import addSvg from "../../assets/img/add.svg";

const AddTaskFrom = ({ list }) => {
  React.useEffect(() => {
    setUnvisibleForm();
  }, [list.id]);

  const dispatch = useDispatch();
  const ref = React.useRef();

  const setVisibleForm = (id) => {
    dispatch(visibleAddForm(id));
  };

  const setUnvisibleForm = () => {
    dispatch(unvisibleAddForm());
  };

  const onAddTask = (id, text) => {
    if (ref.current.value) {
      dispatch(addTask(id, text));
    } else {
      alert("Название задачи не может быть пустым");
    }
    ref.current.value = "";
  };

  return (
    <div key={list.id} className="tasks__form">
      {!list.visibleForm ? (
        <div
          onClick={() => setVisibleForm(list.id)}
          className="tasks__form-new"
        >
          <img src={addSvg} alt="Add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            ref={ref}
            className="field"
            type="text"
            placeholder="Текст задачи"
          />
          <button
            onClick={() => onAddTask(list.id, ref.current.value)}
            className="button"
          >
            {" "}
            Добавить задачу{" "}
          </button>
          <button onClick={setUnvisibleForm} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

AddTaskFrom.propTypes = {
  list: PropTypes.object,
  onAddTask: PropTypes.func,
  key: PropTypes.number,
};

export default AddTaskFrom;
