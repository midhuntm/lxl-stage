import { Grid, InputBase, makeStyles, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import KenRadioGroup from '../KenRadioGroup';
import KenCheckboxGroup from '../KenCheckboxGroup';

const useStyles = makeStyles(theme => ({
  formGroup: {
    flexDirection: 'column',
  },
  formControlLabelRoot: {
    marginLeft: '-8px',
  },
  searchBarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    border: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    borderRadius: '3px',
    marginBottom: '5px',
  },
  checkListSection: {
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '10px',
      background: theme.palette.KenColors.scrollbarColor,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      backgroundColor: `${theme.palette.KenColors.neutral103}`,
    },
  },
}));

const SearchableCheckList = props => {
  const {
    isSearchEnabled = false,
    searchTextValue = '',
    type,
    name,
    value, // for checkbox an array of values to be checked, for radio buttons a single string value to be selected
    options, // an array of Objects({label: "", value: ""})
    handleChange,
    isSearchCaseSensitive = false,
    checkSectionStyleClass,
  } = props;

  const classes = useStyles();

  const [checkListItems, setCheckListItems] = useState([]);
  const [searchText, setSearchText] = useState(searchTextValue);

  useEffect(() => {
    let tempList = [...options];
    if (tempList.length) {
      if (searchText.length && isSearchEnabled) {
        tempList = tempList.filter(check => {
          return isSearchCaseSensitive
            ? check.label.includes(searchText)
            : check.label.toLowerCase().includes(searchText.toLowerCase());
        });

        tempList = tempList.map(option => ({
          ...option,
          label: getHighlightedText(
            option.label,
            searchText,
            isSearchCaseSensitive
          ),
        }));
      }
    }

    setCheckListItems(tempList);
  }, [options, searchText]);

  const theme = useTheme();
  return (
    <>
      <Grid container data-testid="checklist-container">
        {isSearchEnabled && (
          <Grid item xs={12} data-testid="search-bar">
            <div className={classes.searchBarContainer}>
              <SearchIcon
                style={{ color: theme.palette.KenColors.neutral100 }}
              />
              <InputBase
                size="small"
                placeholder="Search"
                inputProps={{ 'data-testid': 'search-input' }}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
          </Grid>
        )}

        <Grid
          item
          xs={12}
          className={`${classes.checkListSection} ${checkSectionStyleClass}`}
        >
          {type === 'checkbox' ? (
            <span data-testid="checkbox-group">
              <KenCheckboxGroup
                value={value}
                options={checkListItems}
                onChange={handleChange}
              />
            </span>
          ) : null}
          {type === 'radio' ? (
            <span data-testid="radio-group">
              <KenRadioGroup
                name={name}
                label={''}
                value={value}
                options={checkListItems}
                onChange={handleChange}
                row={false}
                classOverrides={{
                  formControlLabelRoot: classes.formControlLabelRoot,
                }}
              />
            </span>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

const getHighlightedText = (text, highlight, isSearchCaseSensitive) => {
  if (highlight && highlight.length) {
    let strArr = [];
    let tempText;
    if (isSearchCaseSensitive) {
      tempText = text;
    } else {
      tempText = text.toLowerCase();
      highlight = highlight.toLowerCase();
    }

    let index = 0;
    let startIndex = 0;
    while (index !== -1) {
      index = tempText.indexOf(highlight, startIndex);
      if (index !== -1) {
        strArr.push(text.substring(startIndex, index));
        strArr.push(text.substring(index, index + highlight.length));
      } else {
        strArr.push(text.substring(startIndex, text.length));
      }
      startIndex = index + highlight.length;
    }
    return (
      <>
        {strArr.map(item => {
          if (
            (isSearchCaseSensitive === false &&
              item.toLowerCase() === highlight.toLowerCase()) ||
            (isSearchCaseSensitive === true && item === highlight)
          ) {
            return <b>{item}</b>;
          } else {
            return <>{item}</>;
          }
        })}
      </>
    );
  } else {
    return text;
  }
};

export default SearchableCheckList;
