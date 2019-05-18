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
  schedule: '',
  ingredient: '',
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
      return {
        ...state,
        schedule: action.schedule
      }

    case 'ADD_VENDORINGREDIENT':
      return {
        ...state,
        ingredient: action.ingredient
      }

    case 'ADD_VENDORFOODGROUP':
      return {
        ...state,
        foodGroup: action.foodGroup
      }

    default:
      return state
  }
}
