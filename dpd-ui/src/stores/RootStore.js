import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import moment from 'moment';
import FieldType from '../enums/FieldType';
import { getPersons, depersonalize } from '../api/person';

export class RootStore {

    addressFields = ["city", "postalCode", "street", "houseNumber"];

    formData = {
        name: { value: "", isValid: false, type: FieldType.TEXT },
        placeOfBirth: { value: "", isValid: false, type: FieldType.TEXT },
        dateOfBirth: { value: moment(new Date()).format("YYYY-MM-DD"), isValid: false, type: FieldType.DATE },
        motherName: { value: "", isValid: false, type: FieldType.TEXT },
        tajNumber: { value: "", isValid: false, type: FieldType.TAJ },
        taxIdentifier: { value: "", isValid: false, type: FieldType.TAX_ID },
        emailAddress: { value: "", isValid: false, type: FieldType.EMAIL },
        phoneNumbers: [{ value: "", isValid: false, type: FieldType.PHONE_NUMBER }],
        addresses: [
            {
                postalCode: { value: "", isValid: false, type: FieldType.POSTAL_CODE },
                city: { value: "", isValid: false, type: FieldType.TEXT },
                street: { value: "", isValid: false, type: FieldType.TEXT },
                houseNumber: { value: "", isValid: false, type: FieldType.HOUSE_NUMBER }
            }
        ],
    };

    saved = true;
    triedToSave = false;

    personalData = [];

    constructor() {
        makeObservable(this, {
            formData: observable,
            saved: observable,
            triedToSave: observable,
            personalData: observable,
            updateFormData: action,
            resetFormData: action,
            addNewPhoneNumber: action,
            deletePhoneNumber: action,
            addNewAddress: action,
            setSaved: action,
            setFieldValidity: action,
            //updatePersonalData: action,
            depersonalizeData: action,
            getPersonalData: action
        })
    }

    getPersonalData = (page, size, setLoading) => {
        setLoading(true);
        getPersons(page, size).then(response => {
            this.personalData = response.data;
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        })
    }

    depersonalizeData = (id, setLoading) => {
        setLoading(true);
        depersonalize(id).then(response => {
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        })
    }

    updateFormData = (field, newValue, index) => {
        const addressFields = ["city", "postalCode", "street", "houseNumber"];
        if (field === "phoneNumbers") {
            this.formData.phoneNumbers[index].value = newValue;
        } else if (addressFields.includes(field)) {
            this.formData.addresses[index][field].value = newValue;
        } else {
            this.formData[field].value = newValue;
        }
        this.setSaved(false);
        const valid = this.isFieldValid(field, index);
        this.setFieldValidity(valid, field, index);
    }

    setTriedToSave = (value) => {
        this.triedToSave = value;
    }

    resetFormData = () => {
        this.formData = {
            name: { value: "", isValid: false, type: FieldType.TEXT },
            placeOfBirth: { value: "", isValid: false, type: FieldType.TEXT },
            dateOfBirth: { value: moment(new Date()).format("YYYY-MM-DD"), isValid: false, type: FieldType.DATE },
            motherName: { value: "", isValid: false, type: FieldType.TEXT },
            tajNumber: { value: "", isValid: false, type: FieldType.TAJ },
            taxIdentifier: { value: "", isValid: false, type: FieldType.TAX_ID },
            emailAddress: { value: "", isValid: false, type: FieldType.EMAIL },
            phoneNumbers: [{ value: "", isValid: false, type: FieldType.PHONE_NUMBER }],
            addresses: [
                {
                    postalCode: { value: "", isValid: false, type: FieldType.POSTAL_CODE },
                    city: { value: "", isValid: false, type: FieldType.TEXT },
                    street: { value: "", isValid: false, type: FieldType.TEXT },
                    houseNumber: { value: "", isValid: false, type: FieldType.HOUSE_NUMBER }
                }
            ],
        };
        this.setSaved(true);
    }

    addNewPhoneNumber = () => {
        this.formData.phoneNumbers.push({ value: "", isValid: false, type: FieldType.PHONE_NUMBER });
        this.setSaved(false);
    }

    deletePhoneNumber = (index) => {
        if (index !== 0) {
            this.formData.phoneNumbers.splice(index, 1);
            this.setSaved(false);
        }
    }

    addNewAddress = () => {
        this.formData.addresses.push(
            {
                postalCode: { value: "", isValid: false, type: FieldType.POSTAL_CODE },
                city: { value: "", isValid: false, type: FieldType.TEXT },
                street: { value: "", isValid: false, type: FieldType.TEXT },
                houseNumber: { value: "", isValid: false, type: FieldType.HOUSE_NUMBER }
            }
        );
        this.setSaved(false);
    }

    deleteAddress = (index) => {
        this.formData.addresses.splice(index, 1);
        this.setSaved(false);
    }

    setSaved = (value) => {
        this.saved = value;
    }

    getFieldTypeAndValueByFieldName = (fieldName, index) => {
        let fieldType;
        let fieldValue;
        if (this.addressFields.includes(fieldName)) {
            fieldType = this.formData["addresses"][index][fieldName].type;
            fieldValue = this.formData["addresses"][index][fieldName].value;
        } else if (fieldName === "phoneNumbers") {
            fieldType = this.formData[fieldName][index].type;
            fieldValue = this.formData[fieldName][index].value;
        } else {
            fieldType = this.formData[fieldName].type;
            fieldValue = this.formData[fieldName].value;
        }

        return { fieldType, fieldValue };

    }

    isDateFromPast = (date) => {
        const currentDate = moment(new Date());
        if (moment(date).isSame(currentDate, "day")) {
            return false;
        }
        if (moment(date).isAfter(currentDate)) {
            return false;
        }
        return true;
    }

    setFieldValidity = (value, fieldName, index) => {
        if (this.addressFields.includes(fieldName)) {
            this.formData["addresses"][index][fieldName].isValid = value;
        } else if (fieldName === "phoneNumbers") {
            this.formData[fieldName][index].isValid = value;
        } else {
            this.formData[fieldName].isValid = value;
        }
    }


    isFieldValid = (fieldName, index) => {
        // https://ui.dev/validate-email-address-javascript/
        const emailValidatorRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const fieldTypeAndValue = this.getFieldTypeAndValueByFieldName(fieldName, index);
        const { fieldType, fieldValue } = fieldTypeAndValue;
        let valid = true;

        switch (fieldType) {
            case FieldType.TEXT:
                valid = (fieldValue && fieldValue.length >= 1);
                break;
            case FieldType.DATE:
                valid = fieldValue && this.isDateFromPast(fieldValue);
                break;
            case FieldType.EMAIL:
                valid = fieldValue && fieldValue.length && emailValidatorRegExp.test(fieldValue);
                break;
            case FieldType.TAJ:
                valid = (fieldValue && fieldValue.length === 11 && !isNaN(fieldValue[0]) && !isNaN(fieldValue[1]) && !isNaN(fieldValue[2]) && !isNaN(fieldValue[4]) && !isNaN(fieldValue[5]) && !isNaN(fieldValue[6]) &&
                    !isNaN(fieldValue[8]) && !isNaN(fieldValue[9]) && !isNaN(fieldValue[10])
                );
                break;
            case FieldType.TAX_ID:
                valid = (fieldValue && fieldValue.length === 10 && /^\d+$/.test(fieldValue));
                break;
            case FieldType.PHONE_NUMBER:
                valid = (fieldValue && (fieldValue.length === 10 || fieldValue.length === 11) && /^\d+$/.test(fieldValue));
                break;
            case FieldType.POSTAL_CODE:
                valid = (fieldValue && /^\d+$/.test(fieldValue) && fieldValue.length >= 4 && fieldValue[0] > 0);
                break;
            case FieldType.HOUSE_NUMBER:
                valid = (fieldValue && fieldValue.length >= 1 && fieldValue[0] >= '1' && fieldValue[0] <= '9');
                break;
            default:
                valid = false;
                break;
        }
        return valid;

    }

    isFormDataValid = () => {
        const formDataValues = Object.values(this.formData);
        for (let i = 0; i < formDataValues.length; i++) {
            if (!Array.isArray(formDataValues[i])) {
                if (!formDataValues[i].isValid) {
                    return false;
                }
            } else {
                const formArray = formDataValues[i];
                for (let j = 0; j < formArray.length; j++) {
                    if (typeof formArray[j] === 'object') {
                        if (!formArray[j]) {
                            return false;
                        }
                    } else {
                        if (!formArray[j].isValid) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
}

export const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

export const useStores = () => React.useContext(StoreContext);

export default { RootStore, StoreContext, StoreProvider };