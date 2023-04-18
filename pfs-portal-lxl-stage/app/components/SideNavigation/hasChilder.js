export function hasChildren(item) {
  const { subItems: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  // if (openDrawer === false && openDrawer === undefined) {
  //   return false;
  // }

  return true;
}
