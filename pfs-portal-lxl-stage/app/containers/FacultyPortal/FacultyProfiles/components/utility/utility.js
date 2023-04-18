export const addRowData = (setArray, infoType) => {
  const user = JSON.parse(localStorage.getItem('userDetails'));
  setArray(prevState => {
    return [
      ...prevState,
      {
        informationId: '',
        contactId: user.ContactId,
        infoType: infoType,
        name: '',
        linkURL: '',
        description: '',
      },
    ];
  });
};

export const handleChangeRelationData = (setState, state, evt, i) => {
  setState(
    state.map((e, index) => {
      if (i == index) {
        return {
          ...e,
          [evt.target.name]: evt.target.value,
        };
      } else {
        return { ...e };
      }
    })
  );
};

export const deleteRowHandleData = (setState, id) => {
  setState(prev => {
    return prev.filter((ab, index) => {
      return ab?.infoId !== id;
    });
  });
};
