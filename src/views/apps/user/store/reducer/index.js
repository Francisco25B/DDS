const initialState = {
  allData: [], // Lista global de todos los usuarios
  data: [], // Lista de usuarios paginados
  total: 1, // Total de usuarios
  params: {}, // Parámetros de la API (como paginación)
  selectedUser: null // Inicializa con null cuando no hay usuario seleccionado
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA':
      return { ...state, allData: action.data }
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.total,  // Asegúrate de que este total sea el total de registros
        params: action.params
      }
      

    case 'FETCH_USER':
      console.log('Nuevo selectedUser:', action.payload)
      if (action.payload && action.payload.id) {
        return { ...state, selectedUser: action.payload }
      } else {
        console.error('Datos del usuario faltantes o inválidos:', action.payload)
        return { ...state, selectedUser: null }
      }

    case 'ADD_USER':
      console.log('Nuevo usuario añadido:', action.user)
      return {
        ...state,
        allData: [...state.allData, action.user],
        data: state.params.page === action.page ? [...state.data, action.user] : state.data
      }

    case 'DELETE_USER':
      const updatedAllData = state.allData.filter(user => user.id !== action.id)
      const updatedData = state.data.filter(user => user.id !== action.id)
      let updatedPage = state.params.page
      if (updatedData.length === 0 && updatedPage > 1) {
        updatedPage -= 1
      }
      return {
        ...state,
        allData: updatedAllData,
        data: updatedData,
        params: { ...state.params, page: updatedPage }
      }

    case 'CLEAR_SELECTED_USER':
      return { ...state, selectedUser: null }

    case 'STORE_DATA':
      return {
        ...state,
        allData: action.data.allData,
        data: action.data.data,
        total: action.data.total,
        params: action.data.params
      }

    default:
      return state
      
  }
}

export default users
