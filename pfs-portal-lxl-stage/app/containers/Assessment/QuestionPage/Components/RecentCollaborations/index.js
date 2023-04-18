import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Avatar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(theme => ({
    collaboratTitle: {
        fontWeight: 600,
        fontSize: 12,
        color: theme.palette.KenColors.neutral900
    },
    recentWrapper: {
        height: 200,
        overflowY: 'auto',
        marginTop: 14
    },
    optionBox: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingRight: 15,
        borderBottom: '0.408676px solid #E3E3E3',
        height: 60
    },
    avatarBox: {
        display: 'flex',
        alignItems: "center",
        fontSize: 14,
        color: theme.palette.KenColors.neutral900
    },
    recentOptionListAvatar: {
        backgroundColor: theme.palette.KenColors.neutral100,
        width: 24,
        height: 24,
        fontSize: 14,
        marginRight: 8,
        left: 0
    },
}));

export default function RecentCollaorations(props) {
    const { posts, onhandleAddItem } = props;
    console.log("posts", posts);
    const classes = useStyles();
    const { t } = useTranslation();
    const onAddItem = (item) => {
        onhandleAddItem(item)
    }
    return (
        <Box>
            <Typography className={classes.collaboratTitle}>{t('labels:Recent_collaborations')}</Typography>
            <Grid className={classes.recentWrapper + ' ' + 'scrollbar-cus'}>
                {posts.map((item, idx) => {
                    return (
                        <Box className={classes.optionBox}>
                            <Grid className={classes.avatarBox}>
                                <Avatar alt="user" className={classes.recentOptionListAvatar}>{item?.label.charAt(0)}
                                </Avatar>
                                {item.label}
                            </Grid>
                            <Box>
                                <Typography onClick={() => onAddItem(item)} className='add-teacher' style={{ fontSize: 14, cursor: 'pointer', position: 'relative' }}>Add</Typography>
                            </Box>
                        </Box>)
                })}
            </Grid>
        </Box>
    )
}
