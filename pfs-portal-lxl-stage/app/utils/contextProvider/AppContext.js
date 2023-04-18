import React from 'react';

import { defineRulesFor } from '../rbac/config';

const AppContext = React.createContext({});

const reducer = function(state, action) {
  console.log('Context reducer: ', action, state);

  switch (action.type) {
    case 'updateConfig':
      return {
        ...state,
        config: { ...(state?.config || {}), ...(action.value || {}) },
      };

    // Details of the user logged in
    case 'updateUserDetails': {
      const userDetails = action?.value;
      if (userDetails?.Type && state?.config) {
        // On Updating user update permissions as well
        // Get roles frm roles array of userDetails
        const roles = userDetails?.Roles?.filter(
          (x, i, a) => a.indexOf(x) == i
        ).map(r => r.Role);
        defineRulesFor(state.config, [userDetails.Type, ...(roles || [])]);
        // set flags for personas among student, parent, faculty

        return {
          ...state,
          userDetails: action.value,
        };
      } else {
        return state;
      }
    }

    // Details of the student for parent/student personas
    case 'updateActiveStudent': {
      return {
        ...state,
        activeStudent: action?.value,
      };
    }

    case 'updateSideNavigation': {
      return {
        ...state,
        sideNavigation: action?.value,
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
export const AppContextProvider = ({ children, initValue }) => {
  // const []
  // const [state, setState] = React.useState({ default: 'dd' });
  // const dispatch = val => {
  //   setState(val);
  // };
  const [state, dispatch] = React.useReducer(reducer, {
    config: null,
    userDetails: null,
    activeStudent: null,
    sideNavigation: null,
  });
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext within provider');
  }
  return context;
};
export default AppContext;
