const initialState = {
  operatorName: '',
  date: '',
  country: '',
  vendorName: '',
  picture: '',
  licenseNumber: '',
  licensePicture: '',
  phone: '',
  email: '',
  location: [],
  schedule: [],
  ingredient: [],
  foodGroup: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_OPERATORNAME':
      return {
        ...state,
        operatorName: action.operatorName
      }

    case 'ADD_DATE':
      return {
        ...state,
        date: action.date
      }

    case 'ADD_VENDORCOUNTRY':
      return {
        ...state,
        country: action.country
      }

    case 'ADD_VENDORNAME':
      return {
        ...state,
        vendorName: action.vendorName
      }

    case 'ADD_VENDORPICTURE':
      return {
        ...state,
        picture: action.picture
      }

    case 'ADD_LICENSENUMBER':
      return {
        ...state,
        licenseNumber: action.licenseNumber
      }

    case 'ADD_LICENSEPICTURE':
      return {
        ...state,
        licensePicture: action.licensePicture
      }

    case 'ADD_VENDORPHONE':
      return {
        ...state,
        phone: action.phone
      }

    case 'ADD_VENDOREMAIL':
      return {
        ...state,
        email: action.email
      }

    case 'ADD_VENDORLOCATION':
      const locations = [...state.location];
      locations[action.location.index] = action.location.address;
      return {
        ...state,
        location: locations,
      }

    case 'DELETE_VENDORLOCATION':
      const businessLocations = state.location.filter((item, indexState) =>
        indexState !== action.index
      );
      return {
        ...state,
        location: businessLocations,
      }

    case 'ADD_VENDORSCHEDULE':
      const scheduleVendor = [...state.schedule];
      scheduleVendor[action.schedule.index] = action.schedule.data;
      return {
        ...state,
        schedule: scheduleVendor
      }

    case 'DELETE_VENDORSCHEDULE':
      const businessSchedule = state.schedule.filter((item, indexState) =>
        indexState !== action.index
      );
      return {
        ...state,
        schedule: businessSchedule,
      }

    case 'ADD_VENDORINGREDIENT':
      const ingredientVendor = [...state.ingredient];
      ingredientVendor[action.ingredient.index] = action.ingredient.data;
      return {
        ...state,
        ingredient: ingredientVendor
      }

    case 'DELETE_VENDORINGREDIENT':
      const ingredientSourceVendor = state.ingredient.filter((item, indexState) =>
        indexState !== action.index
      );
      return {
        ...state,
        ingredient: ingredientSourceVendor,
      }

    case 'ADD_VENDORFOODGROUP':
      return {
        ...state,
        foodGroup: action.foodGroup
      }

    case 'RESET_STOREVENDOR':
      return {
        operatorName: '',
        date: '',
        country: '',
        vendorName: '',
        picture: '',
        licenseNumber: '',
        licensePicture: '',
        phone: '',
        email: '',
        location: [],
        schedule: [],
        ingredient: [],
        foodGroup: ''
      }

    default:
      return state
  }
}
