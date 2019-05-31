export const addPosition = (position) => dispatch => {
  dispatch({
    type: 'ADD_POSITION',
    position
  })
}

export const addName = (name) => dispatch => {
  dispatch({
    type: 'ADD_NAME',
    name
  })
}

export const addEmail = (email) => dispatch => {
  dispatch({
    type: 'ADD_EMAIL',
    email
  })
}

export const addPassword = (password) => dispatch => {
  dispatch({
    type: 'ADD_PASSWORD',
    password
  })
}

export const addPhone = (phone) => dispatch => {
  dispatch({
    type: 'ADD_PHONE',
    phone
  })
}

export const addCountry = (country) => dispatch => {
  dispatch({
    type: 'ADD_COUNTRY',
    country
  })
}

export const addOrganization = (organization) => dispatch => {
  dispatch({
    type: 'ADD_ORGANIZATION',
    organization
  })
}

export const addTask = (task) => dispatch => {
  dispatch({
    type: 'ADD_TASK',
    task
  })
}

export const changeIsLogin = (isLoggedIn) => dispatch => {
  dispatch({
    type: 'CHANGE_ISLOGIN',
    isLoggedIn
  })
}

export const resetStoreUser = () => dispatch => {
  dispatch({
    type: 'RESET_STOREUSER',
  })
}