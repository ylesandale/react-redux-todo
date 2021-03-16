import * as types from "../constants";

const initialState = [
  {
    id: "main",
    active: true,
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
          fill="black"
        />
      </svg>
    ),
    name: "Все задачи",
    tasks: [],
    mainList: true,
  },
  {
    id: 1,
    name: "Покупки",
    colorId: 5,
    active: false,
    isRemovable: true,
    visibleForm: false,
    tasks: [
      { id: 1, listId: 1, text: "Купить молоко", completed: false },
      { id: 2, listId: 1, text: "Купить хлеб", completed: false },
    ],
  },
  {
    id: 2,
    name: "Фронтенд",
    colorId: 4,
    active: false,
    isRemovable: true,
    tasks: [
      { id: 1, listId: 2, text: "Изучить JavaScript", completed: true },
      {
        id: 2,
        listId: 2,
        text: "Изучить паттерны проектирования",
        completed: true,
      },
      {
        id: 3,
        listId: 2,
        text: "ReactJS Hooks (useState, useReducer, useEffect и т.д.)",
        completed: false,
      },
      {
        id: 4,
        listId: 2,
        text: "Redux (redux-observable, redux-saga)",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    name: "Фильмы и сериалы",
    colorId: 3,
    active: false,
    visibleForm: false,
    isRemovable: true,
    tasks: [{ id: 1, listId: 3, text: "Настоящий детектив", completed: false }],
  },
  {
    id: 4,
    name: "Книги",
    colorId: 2,
    active: false,
    visibleForm: false,
    isRemovable: true,
    tasks: [
      { id: 1, listId: 4, text: "1984", completed: false },
      { id: 2, listId: 4, text: "Мастер и Мааргарита", completed: false },
      { id: 3, listId: 4, text: "Над пропастью во ржи", completed: true },
    ],
  },
  {
    id: 5,
    name: "Личное",
    colorId: 1,
    active: false,
    visibleForm: false,
    isRemovable: true,
    tasks: [],
  },
];

const lists = (state = initialState, action) => {
  let nextListid = state[state.length - 1].id + 1;
  switch (action.type) {
    case types.ADD_LIST:
      return [
        ...state,
        {
          id: nextListid,
          name: action.name,
          active: false,
          isRemovable: true,
          colorId: action.color,
          visibleForm: false,
          tasks: [],
        },
      ];

    case types.REMOVE_LIST:
      return state.filter((list) => list.id !== action.id);

    case types.SET_ACTIVE_LIST:
      return state
        .map((list) => (list.active ? { ...list, active: false } : list))
        .map((list) =>
          list.id === action.id ? { ...list, active: true } : list
        );

    case types.EDIT_LIST:
      return state.map((list) =>
        list.id === action.id ? { ...list, name: action.name } : list
      );

    case types.ADD_TASK:
      return state.map((list) =>
        list.id === action.id
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                {
                  id: list.tasks.length + 1,
                  listId: list.id,
                  text: action.text,
                  completed: false,
                },
              ],
            }
          : list
      );

    case types.REMOVE_TASK:
      return state.map((list) =>
        list.id === action.id1
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== action.id2),
            }
          : list
      );

    case types.EDIT_TASK:
      return state.map((list) =>
        list.id === action.id1
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === action.id2 ? { ...task, text: action.text } : task
              ),
            }
          : list
      );

    case types.SET_COMLETED_TASK:
      return state.map((list) =>
        list.id === action.id1
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === action.id2
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : list
      );

    case types.SET_VISIBLE_FORM:
      return state
        .map((list) =>
          list.visibleForm ? { ...list, visibleForm: false } : list
        )
        .map((list) =>
          list.id === action.id ? { ...list, visibleForm: true } : list
        );

    case types.SET_UNVISIBLE_FORM:
      return state.map((list) =>
        list.visibleForm ? { ...list, visibleForm: false } : list
      );

    default:
      return state;
  }
};

export default lists;
