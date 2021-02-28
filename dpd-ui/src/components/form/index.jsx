import React from 'react';
import { Card } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import InputMask from 'react-input-mask';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { addPerson } from '../../api/person';
import { useStores } from '../../stores/RootStore';
import Address from '../address';
import * as Texts from '../../constants/texts';

const useStyles = makeStyles({
    root: {
        width: 900,
        display: "flex",
        flexDirection: "column",
    },
    fields: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        maxHeight: 600,
        overflowY: "auto",
    },
    textField: {
        marginTop: "20px",
        marginLeft: "20px",
        marginRight: "20px",
    },
    phoneNumber: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: "20px",
        marginLeft: "20px",
    },
    buttonContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    saveButton: {
        marginTop: "20px",
        marginBottom: "20px",
    },
});

const Form = observer(() => {
    const classes = useStyles();
    const { formData, isFormDataValid, triedToSave, setTriedToSave, resetFormData, updateFormData, addNewPhoneNumber, deletePhoneNumber, addNewAddress, deleteAddress, saved } = useStores();

    const onSave = () => {
        setTriedToSave(true);
        if (isFormDataValid() && !saved) {
            addPerson(createPayload()).then(response => {
                resetFormData();
                setTriedToSave(false);
            }).catch(error => {
            })
        }
    }

    const createPayload = () => {
        const payload = {};
        for (const [key, value] of Object.entries(formData)) {
            if (key !== "addresses" && key !== "phoneNumbers") {
                payload[key] = value.value;
            } else {
                if (key === "phoneNumbers") {
                    payload[key] = value.map(v => v.value);
                } else {
                    const addresses = [];
                    value.forEach(address => {
                        addresses.push({
                            postalCode: address.postalCode.value,
                            city: address.city.value,
                            street: address.street.value,
                            houseNumber: address.houseNumber.value
                        });
                    })
                    payload[key] = addresses;
                }
            }
        }
        return payload;
    }

    return (
        <Card className={classes.root} variant="outlined">
            <div className={classes.fields}>
                <TextField
                    id="textField-name"
                    label={Texts.name}
                    helperText={triedToSave && !formData.name.isValid ? Texts.missingOrInvalidValue : ""}
                    variant="outlined"
                    className={classes.textField}
                    value={formData.name.value}
                    onChange={(event) => {
                        updateFormData("name", event.target.value);
                    }}
                    error={triedToSave && !formData.name.isValid}
                />
                <TextField
                    id="textField-placeOfBirth"
                    label={Texts.placeOfBirth}
                    helperText={triedToSave && !formData.placeOfBirth.isValid ? Texts.missingOrInvalidValue : ""}
                    variant="outlined"
                    className={classes.textField}
                    value={formData.placeOfBirth.value}
                    onChange={(event) => {
                        updateFormData("placeOfBirth", event.target.value);
                    }}
                    error={triedToSave && !formData.placeOfBirth.isValid}
                />
                <TextField
                    id="textField-dateOfBirth"
                    label={Texts.dateOfBirth}
                    helperText={triedToSave && !formData.dateOfBirth.isValid ? Texts.missingOrInvalidValue : ""}
                    type="date"
                    variant="outlined"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={formData.dateOfBirth.value}
                    onChange={(event) => {
                        updateFormData("dateOfBirth", event.target.value);
                    }}
                    error={triedToSave && !formData.dateOfBirth.isValid}
                />
                <TextField
                    id="textField-nameOfMother"
                    label={Texts.motherName}
                    helperText={triedToSave && !formData.motherName.isValid ? Texts.missingOrInvalidValue : ""}
                    variant="outlined"
                    className={classes.textField}
                    value={formData.motherName.value}
                    onChange={(event) => {
                        updateFormData("motherName", event.target.value);
                    }}
                    error={triedToSave && !formData.motherName.isValid}
                />
                <InputMask
                    mask="999 999 999"
                    value={formData.tajNumber.value}
                    onChange={(event) => {
                        updateFormData("tajNumber", event.target.value);
                    }}
                    maskPlaceholder="-"
                >{() =>
                    <TextField
                        id="textField-tajNumber"
                        label={Texts.tajNumber}
                        helperText={triedToSave && !formData.tajNumber.isValid ? Texts.missingOrInvalidValue : ""}
                        variant="outlined"
                        className={classes.textField}
                        error={triedToSave && !formData.tajNumber.isValid}
                    />}
                </InputMask>
                <TextField
                    id="textField-taxIdentifier"
                    label={Texts.taxIdentifier}
                    helperText={triedToSave && !formData.taxIdentifier.isValid ? Texts.missingOrInvalidValue : ""}
                    variant="outlined"
                    className={classes.textField}
                    value={formData.taxIdentifier.value}
                    onChange={(event) => {
                        updateFormData("taxIdentifier", event.target.value);
                    }}
                    error={triedToSave && !formData.taxIdentifier.isValid}
                />
                <TextField
                    id="textField-emailAddress"
                    label={Texts.emailAddress}
                    helperText={triedToSave && !formData.emailAddress.isValid ? Texts.missingOrInvalidValue : ""}
                    variant="outlined"
                    className={classes.textField}
                    value={formData.emailAddress.value}
                    onChange={(event) => {
                        updateFormData("emailAddress", event.target.value);
                    }}
                    error={triedToSave && !formData.emailAddress.isValid}
                />
                {formData.phoneNumbers.map((phoneNumber: any, index: any) => {
                    return <div className={classes.phoneNumber}>
                        <TextField
                            id={`textField-phoneNumber-${index}`}
                            label={Texts.phoneNumber}
                            helperText={triedToSave && !formData.phoneNumbers[index].isValid ? Texts.missingOrInvalidValue : ""}
                            variant="outlined"
                            value={phoneNumber.value}
                            onChange={(event) => {
                                updateFormData("phoneNumbers", event.target.value, index);
                            }}
                            error={triedToSave && !formData.phoneNumbers[index].isValid}
                        />  {index !== 0 ?
                            <IconButton aria-label="delete" onClick={() => deletePhoneNumber(index)}>
                                <DeleteIcon />
                            </IconButton>
                            : <IconButton aria-label="add" onClick={() => addNewPhoneNumber()}>
                                <AddIcon />
                            </IconButton>}
                    </div>
                })}
                {formData.addresses.map((address, index) => {
                    return <Address
                        postalCode={address.postalCode}
                        city={address.city}
                        street={address.street}
                        houseNumber={address.houseNumber}
                        index={index}
                        addNewAddress={addNewAddress}
                        deleteAddress={deleteAddress}
                        updateFormData={updateFormData}
                        triedToSave={triedToSave}
                    />
                })}
            </div>
            <div className={classes.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<Save />}
                    onClick={onSave}
                    className={classes.saveButton}
                >
                    {Texts.save}
                </Button>
            </div>
        </Card>
    )
})

export default Form;
