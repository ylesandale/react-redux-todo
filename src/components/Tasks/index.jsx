/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { completedTask, removeTask, editTask } from "../../redux/actions/lists";

import Task from "./Task";
import AddTaskFrom from "./AddTaskFrom";

import editSvg from "../../assets/img/edit.svg";
import "./Tasks.scss";

const Tasks = ({ list, onEdit, onAddTask, withoutEmpty }) => {
  const dispatch = useDispatch();

  const onEditList = () => {
    const newTitle = window.prompt("Название спсика", list.name);
    if (newTitle) {
      onEdit(list.id, newTitle);
    }
  };

  const onRemove = (id1, id2) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      dispatch(removeTask(id1, id2));
    }
  };

  const onCompleteTask = (id1, id2) => {
    dispatch(completedTask(id1, id2));
  };

  const onEditTask = (id1, id2, text) => {
    dispatch(editTask(id1, id2, text));
  };

  return (
    <div className="tasks">
      <h2
        className={classNames("tasks__title", {
          [`tasks__title--${list.color}`]: list.color,
        })}
      >
        {list.name}
        <img onClick={onEditList} src={editSvg} alt="Edit icon" />
      </h2>

      <div className="tasks__items">
        {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks &&
          list.tasks.length > 0 &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              list={list}
              onEditList={onEditList}
              onCompleteTask={onCompleteTask}
              onRemoveTask={onRemove}
              onEditTask={onEditTask}
              {...task}
            />
          ))}
        <AddTaskFrom onAddTask={onAddTask} list={list} />
      </div>
    </div>
  );
};

Tasks.propTypes = {
  list: PropTypes.object,
  onEdit: PropTypes.func,
  onAddTask: PropTypes.func,
  withoutEmpty: PropTypes.bool,
};

export default Tasks;
