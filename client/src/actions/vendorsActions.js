import * as types from '../constants/ActionTypes';

export const addOperatorName = (operatorName) => dispatch => {
  dispatch({
    type: types.ADD_OPERATORNAME,
    operatorName
  })
}

export const addDate = (date) => dispatch => {
  dispatch({
    type: types.ADD_DATE,
    date
  })
}

export const addVendorCountry = (country) => dispatch => {
  dispatch({
    type: types.ADD_VENDORCOUNTRY,
    country
  })
}

export const addVendorName = (vendorName) => dispatch => {
  dispatch({
    type: types.ADD_VENDORNAME,
    vendorName
  })
}

export const addVendorPicture = (picture) => dispatch => {
  dispatch({
    type: types.ADD_VENDORPICTURE,
    picture
  })
}

export const addLicenseNumber = (licenseNumber) => dispatch => {
  dispatch({
    type: types.ADD_LICENSENUMBER,
    licenseNumber
  })
}

export const addLicensePicture = (licensePicture) => dispatch => {
  dispatch({
    type: types.ADD_LICENSEPICTURE,
    licensePicture
  })
}

export const addVendorPhone = (phone) => dispatch => {
  dispatch({
    type: types.ADD_VENDORPHONE,
    phone
  })
}

export const addVendorEmail = (email) => dispatch => {
  dispatch({
    type: types.ADD_VENDOREMAIL,
    email
  })
}

export const addVendorLocation = (location) => dispatch => {
  dispatch({
    type: types.ADD_VENDORLOCATION,
    location
  })
}

export const deleteVendorLocation = (index) => dispatch => {
  dispatch({
    type: types.DELETE_VENDORLOCATION,
    index
  })
}

export const addVendorSchedule = (schedule) => dispatch => {
  dispatch({
    type: types.ADD_VENDORSCHEDULE,
    schedule
  })
}

export const addVendorIngredient = (ingredient) => dispatch => {
  dispatch({
    type: types.ADD_VENDORINGREDIENT,
    ingredient
  })
}

export const addVendorFoodGroup = (foodGroup) => dispatch => {
  dispatch({
    type: types.ADD_VENDORFOODGROUP,
    foodGroup
  })
}

export const resetStoreVendor = () => dispatch => {
  dispatch({
    type: types.RESET_STOREVENDOR
  })
}