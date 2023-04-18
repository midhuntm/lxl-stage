import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {TiTick} from "react-icons/ti";
const TableCell = withStyles({
    root: {
        borderBottom: "none",
        fontWeight:"bold"
    }
})(MuiTableCell);

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    }
}));

function createData(student, mark1, mark2, mark3, mark4) {
    return { student, mark1, mark2, mark3, mark4 };
}

const rows = [
    createData('Premkumar', <TiTick style={{color:"#37B24D",height:"20px",width:"20px"}}/>, <TiTick style={{color:"#37B24D",height:"20px",width:"20px"}}/>, <TiTick style={{color:"#37B24D",height:"20px",width:"20px"}}/>, <TiTick style={{color:"#37B24D",height:"20px",width:"20px"}}/>),
    createData('Saravanan', <TiTick style={{color:"#37B24D",height:"20px",width:"20px"}}/>, <TiTick style={{color:"#37B24D",height:"20px",width:"20px"}}/>, '-', '-'),
    createData('Rajkumar', '-', '-', '-', '-')
];

export default function StudentCompletion() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell align="center">Film</TableCell>
                        <TableCell align="center">Fun Activity</TableCell>
                        <TableCell align="center">Action Time</TableCell>
                        <TableCell align="center">Feedback</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.student}>
                            <TableCell component="th" scope="row">
                                {row.student}
                            </TableCell>
                            <TableCell align="center">{row.mark1}</TableCell>
                            <TableCell align="center">{row.mark2}</TableCell>
                            <TableCell align="center">{row.mark3}</TableCell>
                            <TableCell align="center">{row.mark4}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
