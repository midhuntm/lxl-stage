import React from 'react';

function KenIcon({
  variant = 'small',
  icon: Icon,
  styles = {},
  iconType = '',
}) {
  const getStyles = () => {
    switch (variant) {
      case 'extraSmall':
        return { fontSize: '8px' };
      case 'medium':
        return { fontSize: '24px' };
      case 'large':
        return { fontSize: '32px' };

      default:
        return { fontSize: '16px' };
    }
  };

  const getImgStyles = () => {
    switch (variant) {
      case 'extraSmall':
        return { height: '25px', width: '25px' };
      case 'medium':
        return { height: '30px', width: '30px' };
      case 'large':
        return { height: '50px', width: '50px' };

      default:
        return { height: '40px', width: '40px' };
    }
  };

  return (
    <>
      {iconType === 'img' ? (
        <img src={Icon} style={{ ...getImgStyles(), ...styles }} />
      ) : (
        <Icon style={{ ...getStyles(), ...styles }} />
      )}
    </>
  );
}
export default KenIcon;
