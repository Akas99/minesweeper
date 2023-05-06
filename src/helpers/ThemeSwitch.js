
const changeThemeFunction = (dispatch, setToggle, toggle) => {
  if (toggle === false) {
    document.documentElement.setAttribute("data-mode", "dark");
    localStorage.setItem("theme", "dark");
    dispatch(setToggle(true));
  } else {
    document.documentElement.setAttribute("data-mode", "light");
    localStorage.setItem("theme", "light");
    dispatch(setToggle(false));
  }
};

export default changeThemeFunction;
