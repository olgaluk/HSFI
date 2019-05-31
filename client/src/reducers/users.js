const initialState = {
  isLoggedIn: false,
  position: '',
  name: '',
  email: '',
  password: '',
  phone: '',
  country: '',
  organization: '',
  task: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POSITION':
      return {
        ...state,
        position: action.position
      }

    case 'ADD_NAME':
      return {
        ...state,
        name: action.name
      }

    case 'ADD_EMAIL':
      return {
        ...state,
        email: action.email
      }

    case 'ADD_PASSWORD':
      return {
        ...state,
        password: action.password
      }

    case 'ADD_PHONE':
      return {
        ...state,
        phone: action.phone
      }

    case 'ADD_COUNTRY':
      return {
        ...state,
        country: action.country
      }

    case 'ADD_ORGANIZATION':
      return {
        ...state,
        organization: action.organization
      }

    case 'ADD_TASK':
      return {
        ...state,
        task: action.task
      }

    case 'CHANGE_ISLOGIN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      }

    case 'RESET_STOREUSER':
      return {
        ...state,
        position: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        country: '',
        organization: '',
        task: ''
      }

    default:
      return state
  }
}
