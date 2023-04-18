import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';

import moment from 'moment';

import MessageIcon from '../../../assets/icons/message_icon.svg';
import KenPopover from '../../../components/KenPopover';
import KenInputField from '../../KenInputField';
import KenButton from '../../KenButton';
import { useTranslation } from 'react-i18next';
import KenLoader from '../../KenLoader';
import { KEY_USER_TYPE } from '../../../utils/constants';
import {
  getParentDetails,
  getUserDetails,
} from '../../../utils/helpers/storageHelper';

const useCommentCellStyles = makeStyles(theme => ({
  popoverContent: {
    minWidth: 250,
    maxWidth: 300,
    maxHeight: 300,
  },
  replyWrap: {
    position: 'relative',
  },
}));

// Sample comments: {
//   name: 'Chandar Mohan',
//   createdAt: '12-05-2021',
//   comment:
//     'Parents type their general remark related to any of the concerns related.',
// },
function CommentsCell({
  value,
  children,
  comments = [],
  replyEnabled = true,
  onSubmit,
  loading = false,
  replyComment,
}) {
  const [anchorEl, setAnchorEl] = React.useState();
  const [reply, setReply] = React.useState(replyComment);

  React.useEffect(() => {
    setReply();
  }, [replyComment]);

  const commentRef = React.useRef();
  const classes = useCommentCellStyles();
  const { t } = useTranslation();
  const user = getUserDetails();
  const parent = getParentDetails();

  const dismissPopover = () => {
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    console.log('Reply Submit: ', reply);
    onSubmit(reply, comments);
  };

  return (
    <Box>
      {children || value}
      {comments.length > 0 ? (
        <img
          aria-label="query-icon"
          onClick={() => {
            console.log('query icon clicked');
            setAnchorEl(commentRef.current);
          }}
          src={MessageIcon}
          style={{ cursor: 'pointer' }}
          ref={commentRef}
        />
      ) : null}

      <KenPopover open={anchorEl} anchorEl={anchorEl} onClose={dismissPopover}>
        <Box p={2} className={classes.popoverContent}>
          {comments.map(comment => (
            <CommentComp {...comment} user={user} parent={parent} />
          ))}
          {replyEnabled ? (
            <Box className={classes.replyWrap} pb={1}>
              <KenLoader loading={loading} />
              <KenInputField
                label={'Reply Query'}
                optionalLabel={false}
                rows={4}
                multiline={true}
                value={reply}
                onChange={({ target = {} }) => {
                  console.log(
                    'CommentCell: comment value change ',
                    target.value
                  );
                  setReply(target.value);
                }}
                style={{ fontSize: 12 }}
              />

              <Box display="flex" justifyContent="flex-end" my={1}>
                <KenButton onClick={dismissPopover} variant="secondary">
                  {t('labels:Cancel')}
                </KenButton>

                <KenButton
                  onClick={handleSubmit}
                  variant="primary"
                  style={{ marginLeft: 8 }}
                >
                  {t('labels:Submit')}
                </KenButton>
              </Box>
            </Box>
          ) : null}
        </Box>
      </KenPopover>
    </Box>
  );
}

CommentsCell.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentsCell;

const useCommentStyles = makeStyles(theme => ({
  name: {
    color: theme.palette.KenColors.tertiaryBlue502,
    fontSize: 14,
  },
  dateComment: {
    color: theme.palette.KenColors.neutral100,
    fontSize: 12,
  },
  date: {
    marginLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'flex-end',
  },
}));

const CommentComp = ({ ContactName, UpdatedOn, Comment, user, parent }) => {
  const classes = useCommentStyles();
  return (
    <Box mb={1.5}>
      <Box display="flex" mb={0.5}>
        <Typography className={classes.name}>
          {ContactName
            ? ContactName
            : user?.Type === KEY_USER_TYPE?.faculty
            ? user?.Name
            : parent?.Name}
        </Typography>
        <Typography
          className={{ [classes.dateComment]: true, [classes.date]: true }}
        >
          {UpdatedOn ? moment(UpdatedOn).format('DD-MM-YYYY') : ''}
        </Typography>
      </Box>
      <Typography className={classes.dateComment}>{Comment}</Typography>
    </Box>
  );
};
