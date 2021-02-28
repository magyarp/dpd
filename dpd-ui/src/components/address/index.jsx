import React from 'react';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import * as Texts from '../../constants/texts';

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: "20px",
    },
    textField: {
        marginLeft: "20px",
        marginRight: "20px",
    },
    formButton: {
        marginTop: "20px",
        marginBottom: "20px",
    }
});


const Address = observer((props) => {
    const classes = useStyles();
    const { deleteAddress, addNewAddress, index, postalCode, city, street, houseNumber, updateFormData, triedToSave } = props;

    return <div className={classes.root}>
        <TextField
            id={`textField-address-postalCode-${index}`}
            label={Texts.postalCode}
            helperText={triedToSave && !postalCode.isValid ? Texts.missingOrInvalidValue : ""}
            variant="outlined"
            className={classes.textField}
            value={postalCode.value}
            onChange={(event) => {
                updateFormData("postalCode", event.target.value, index);
            }}
            error={triedToSave && !postalCode.isValid}
        />
        <TextField
            id={`textField-address-city-${index}`}
            label={Texts.city}
            helperText={triedToSave && !city.isValid ? Texts.missingOrInvalidValue : ""}
            variant="outlined"
            className={classes.textField}
            value={city.value}
            onChange={(event) => {
                updateFormData("city", event.target.value, index);
            }}
            error={triedToSave && !city.isValid}
        />
        <TextField
            id={`textField-address-street-${index}`}
            label={Texts.street}
            helperText={triedToSave && !street.isValid ? Texts.missingOrInvalidValue : ""}
            variant="outlined"
            className={classes.textField}
            value={street.value}
            onChange={(event) => {
                updateFormData("street", event.target.value, index);
            }}
            error={triedToSave && !street.isValid}
        />
        <TextField
            id={`textField-address-houseNumber-${index}`}
            label={Texts.houseNumber}
            helperText={triedToSave && !houseNumber.isValid ? Texts.missingOrInvalidValue : ""}
            variant="outlined"
            className={classes.textField}
            value={houseNumber.value}
            onChange={(event) => {
                updateFormData("houseNumber", event.target.value, index);
            }}
            error={triedToSave && !houseNumber.isValid}
        />
        {index !== 0 ?
            <IconButton aria-label="delete" onClick={() => deleteAddress(index)}>
                <DeleteIcon />
            </IconButton>
            :
            <IconButton aria-label="add" onClick={() => addNewAddress()}>
                <AddIcon />
            </IconButton>
        }
    </div>
})

export default Address;