let Utils = {
    handleChangeInput: (e, state, setState) => {
      console.log(e.target.value);
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    },
  };
  export default Utils;