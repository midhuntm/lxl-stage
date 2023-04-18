import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { authorizer } from './config';

const ProtectedComponent = ({ children, feature, action }) => {
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    if (feature && action) {
      authorizer
        .can(feature, action)
        .then(shouldRender => {
          console.log('ProtectedComponent: ', feature, action, shouldRender);
          setRender(shouldRender);
        })
        .catch(er => {
          console.error(
            'ProtectedComponent: Error authorizing: ',
            feature,
            action,
            error
          );
        });
    } else {
      setRender(true);
    }
  }, [action, feature]);

  return <>{render ? children : null}</>;
};

ProtectedComponent.prototype = {
  children: PropTypes.node.isRequired,
  action: PropTypes.string.isRequired,
  feature: PropTypes.string.isRequired,
};
export default ProtectedComponent;
