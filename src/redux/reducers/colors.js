import * as types from "../constants";

const initialState = [
  { id: 1, hex: "#C9D1D3", name: "grey", selectedColor: true },
  { id: 2, hex: "#42B883", name: "green", selectedColor: false },
  { id: 3, hex: "#64C4ED", name: "blue", selectedColor: false },
  { id: 4, hex: "#FFBBCC", name: "pink", selectedColor: false },
  { id: 5, hex: "#B6E6BD", name: "lime", selectedColor: false },
  { id: 6, hex: "#C355F5", name: "purple", selectedColor: false },
  { id: 7, hex: "#110133", name: "black", selectedColor: false },
  { id: 8, hex: "#FF6464", name: "red", selectedColor: false },
];

const colors = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_COLOR:
      return state
        .map((color) =>
          color.selectedColor ? { ...color, selectedColor: false } : color
        )
        .map((color) =>
          color.id === action.id ? { ...color, selectedColor: true } : color
        );

    default:
      return state;
  }
};

export default colors;
