import * as types from "../constants";
export const AddLists = (name, color) => ({
  type: types.ADD_LIST,
  name,
  color,
});

export const removeList = (id) => ({
  type: types.REMOVE_LIST,
  id,
});

export const activeList = (id) => ({
  type: types.SET_ACTIVE_LIST,
  id,
});

export const editList = (id, name) => ({
  type: types.EDIT_LIST,
  id,
  name,
});

export const addTask = (id, text) => ({
  type: types.ADD_TASK,
  id,
  text,
});

export const removeTask = (id1, id2) => ({
  type: types.REMOVE_TASK,
  id1,
  id2,
});

export const editTask = (id1, id2, text) => ({
  type: types.EDIT_TASK,
  id1,
  id2,
  text,
});

export const completedTask = (id1, id2) => ({
  type: types.SET_COMLETED_TASK,
  id1,
  id2,
});

export const visibleAddForm = (id) => ({
  type: types.SET_VISIBLE_FORM,
  id,
});

export const unvisibleAddForm = () => ({
  type: types.SET_UNVISIBLE_FORM,
});
