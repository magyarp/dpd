import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import * as Texts from '../../constants/texts';


const Menu = () => {

    const history = useHistory();
    const [selectedTab, setSelectedTab] = useState(0);

    const useStyles = makeStyles({
        root: {
            marginBottom: "20px",
        },
    });

    const classes = useStyles();

    return (
        <Paper className={classes.root} square>
            <Tabs
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, value) => {
                    setSelectedTab(value);
                    history.push(value === 0 ? "/form" : "/browse-data");
                }}
            >
                <Tab label={Texts.addDataTab} />
                <Tab label={Texts.browseModifyDataTab} />
            </Tabs>
        </Paper>
    )
}

export default Menu;