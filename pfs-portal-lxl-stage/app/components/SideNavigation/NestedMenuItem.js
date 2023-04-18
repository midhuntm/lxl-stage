import React, { useState, useRef, useImperativeHandle, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowRight from '@material-ui/icons/ArrowRight';
import clsx from 'clsx';
import {
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const TRANSPARENT = 'rgba(0,0,0,0)';
const useMenuItemStyles = makeStyles(theme => ({
  root: props => ({
    // backgroundColor: props.open ? theme.palette.action.hover : TRANSPARENT,
    '&:hover': {
      backgroundColor: theme.palette.KenColors.sideNavBackgroundSecondary,
    },
    color: '#fff',
  }),
  icon: {
    color: theme.palette.KenColors.kenWhite,
    fontSize: 14,
  },
  list: {
    padding: 0,
    margin: 0,
    width: '100%',
  },
  active: {
    backgroundColor: theme.palette.KenColors.sideNavBackgroundSecondary,
  },
  header: {
    padding: '8px 16px',
    color: theme.palette.KenColors.kenWhite,
    fontSize: '14px',
    fontWeight: 600,
  },
}));

const NestedMenuItem = React.forwardRef(function NestedMenuItem(props, ref) {
  const {
    parentMenuOpen,
    PaperProps,
    icon,
    index,
    header,
    component = 'div',
    label,
    rightIcon = <ArrowRight />,
    children,
    className,
    tabIndex: tabIndexProp,
    MenuProps = {},
    ContainerProps: ContainerPropsProp = {},
    ...MenuItemProps
  } = props;
  const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;
  const menuItemRef = useRef(null);
  useImperativeHandle(ref, () => menuItemRef.current);

  const containerRef = useRef(null);
  useImperativeHandle(containerRefProp, () => containerRef.current);

  const menuContainerRef = useRef(null);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleMouseEnter = event => {
    setIsSubMenuOpen(true);
    isScrollable();
    if (ContainerProps?.onMouseEnter) {
      ContainerProps.onMouseEnter(event);
    }
  };

  const handleMouseLeave = event => {
    setIsSubMenuOpen(false);
    isScrollable();
    if (ContainerProps?.onMouseLeave) {
      ContainerProps.onMouseLeave(event);
    }
  };

  const isScrollable = () => {
    let div = document.getElementsByName(`menuItem`);
    let i;
    for (i = 0; i < div.length; i++) {
      if (div[i]) {
        let hs = div[i].scrollWidth > div[i].clientWidth;
        let vs = div[i].scrollHeight > div[i].clientHeight;
        if (hs || vs) {
          div[i].style.pointerEvents = 'auto';
        }
      }
    }
  };

  // Check if any immediate children are active
  const isSubmenuFocused = () => {
    const active = containerRef?.current?.ownerDocument?.activeElement;
    if (Array.isArray(menuContainerRef?.current?.children)) {
      for (const child of menuContainerRef?.current?.children) {
        if (child === active) {
          return true;
        }
      }
    }

    return false;
  };

  const handleFocus = event => {
    if (event.target === containerRef?.current) {
      setIsSubMenuOpen(true);
    }

    if (ContainerProps?.onFocus) {
      ContainerProps.onFocus(event);
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      return;
    }

    if (isSubmenuFocused()) {
      event.stopPropagation();
    }

    const active = containerRef.current?.ownerDocument?.activeElement;

    if (event.key === 'ArrowLeft' && isSubmenuFocused()) {
      containerRef.current?.focus();
    }

    if (
      event.key === 'ArrowRight' &&
      event.target === containerRef?.current &&
      event.target === active
    ) {
      const firstChild = menuContainerRef.current?.children[0];
      firstChild?.focus();
    }
  };

  const open = isSubMenuOpen && parentMenuOpen;

  const menuItemClasses = useMenuItemStyles({ open });

  // Root element must have a `tabIndex` attribute for keyboard navigation
  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  useEffect(() => {
    isScrollable();
  }, [props]);

  return (
    <>
      <div
        {...ContainerProps}
        ref={containerRef}
        onFocus={handleFocus}
        tabIndex={tabIndex}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        id={'parentElement' + tabIndex}
      >
        <MenuItem
          {...MenuItemProps}
          className={clsx(menuItemClasses.root, className, {
            [menuItemClasses.active]: open,
          })}
          ref={menuItemRef}
        >
          <List classes={{ root: menuItemClasses.list }}>
            <ListItem button>
              <ListItemIcon className={menuItemClasses.icon}>
                {icon}
              </ListItemIcon>

              <ListItemText primary={label} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <ArrowForwardIosIcon
                    fontSize="small"
                    className={menuItemClasses.icon}
                  />
                </IconButton>{' '}
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </MenuItem>

        <Menu
          // Set pointer events to 'none' to prevent the invisible Popover div
          // from capturing events for clicks and hovers
          style={{ pointerEvents: 'none' }}
          anchorEl={menuItemRef.current}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'left',
            horizontal: 'top',
          }}
          open={open}
          //   open={
          //     label?.toLowerCase().trim() == 'setup' ||
          //     label?.toLowerCase().trim() == 'masters'
          //       ? true
          //       : open
          //   }
          autoFocus={false}
          disableAutoFocus
          disableEnforceFocus
          onClose={() => {
            setIsSubMenuOpen(false);
          }}
          PaperProps={{
            ...PaperProps,
            name: `menuItem`,
          }}
        >
          <Typography variant="body1" className={menuItemClasses.header}>
            {header}
          </Typography>
          <div ref={menuContainerRef} style={{ pointerEvents: 'auto' }}>
            {children}
          </div>
        </Menu>
      </div>
    </>
  );
});

export default NestedMenuItem;
