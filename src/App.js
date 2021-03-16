import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";

import {
  removeList,
  activeList,
  editList,
  addTask,
} from "./redux/actions/lists";
import AddList from "./components/AddList/AddList";
import List from "./components/List/List";
import Tasks from "./components/Tasks/index";

function App() {
  const dispatch = useDispatch();
  const colors = useSelector(({ colors }) => colors);
  const lists = useSelector(({ lists }) =>
    lists.map((list) => {
      if (!list.icon) {
        list.color = colors.filter(
          (color) => color.id === list.colorId
        )[0].name;
      }
      return list;
    })
  );
  let history = useHistory();

  const onRemove = (id) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      dispatch(removeList(id));
    }
  };

  const onActive = React.useCallback((id) => {
    if (id) {
      dispatch(activeList(id));
    }
    if (id === "main") {
      history.push("/");
    } else {
      history.push(`/lists/${id}`);
    }
    console.log("render");
  }, []);

  const onEdit = (id, name) => {
    dispatch(editList(id, name));
    if (id === "main") {
      onActive("main");
    }
  };

  const onAddTask = (id, text) => {
    dispatch(addTask(id, text));
  };

  React.useEffect(() => {
    onActive("main");
  }, [lists.length]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          onActiveList={onActive}
          items={lists}
          isRemovable={true}
          onRemoveList={onRemove}
        />
        <AddList colors={colors} />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {lists
            .filter((list) => list.id !== "main")
            .map((list) => (
              <Tasks
                key={list.id}
                onAddTask={onAddTask}
                onEdit={onEdit}
                list={list}
                withoutEmpty
              />
            ))}
        </Route>
        <Route path="/lists/:id">
          {lists
            .filter((list) => list.active === true && list.id !== "main")
            .map((list) => (
              <Tasks
                key={list.id}
                onAddTask={onAddTask}
                onEdit={onEdit}
                list={list}
              />
            ))}
        </Route>
      </div>
    </div>
  );
}

export default App;
