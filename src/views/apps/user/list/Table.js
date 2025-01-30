import { Fragment, useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { FaPlus } from 'react-icons/fa'
import { columns } from './columns'
import { getAllData, getData } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <Label for='rows-per-page'>Mostrar</Label>
            <CustomInput
              className='form-control mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{
                width: '5rem',
                padding: '0 0.8rem',
                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
              }}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
            </CustomInput>

            <Label for='rows-per-page'>Entradas</Label>
          </div>
        </Col>
        <Col xl='6' className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'>
          <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
            <Label className='mb-0' for='search-invoice'></Label>
            <Input
              id='search-invoice'
              className='ml-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
              placeholder="Buscar... "
            />
          </div>
          <Button.Ripple color='primary' onClick={toggleSidebar}>
            <FaPlus size={18} className='mr-50' /> 
            Nuevo Usuario
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Selecciona Rol' })
  const [currentStatus, setCurrentStatus] = useState({ value: 1, label: 'Selecciona Estado', number: 1 })

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Realiza la consulta cada vez que haya un cambio en la paginación o en los filtros.
  useEffect(() => {
    dispatch(getData({
      page: currentPage,
      perPage: rowsPerPage,
      tipo_usuario_id: currentRole.value,
      status: currentStatus.value,
      q: searchTerm
    }))
  }, [dispatch, currentPage, rowsPerPage, currentRole, currentStatus, searchTerm])

  const handleFilter = val => {
    setSearchTerm(val)
    setCurrentPage(1) // Reset page to 1 when search term changes
    dispatch(
      getData({
        page: 1,
        perPage: rowsPerPage,
        tipo_usuario_id: currentRole.value,
        status: currentStatus.value,
        q: val
      })
    )
  }

  const handlePerPage = e => {
    setRowsPerPage(Number(e.target.value)) // Make sure it's a number
    setCurrentPage(1) // Reset the page to 1 when changing perPage
  }

  const handlePageChange = (page) => {
    setCurrentPage(page.selected + 1)  // Actualiza la página actual en el estado
    const params = {
      page: page.selected + 1,   // Número de página
      perPage: rowsPerPage      // Elementos por página
      // Otros parámetros de búsqueda si es necesario
    }
    dispatch(getData(params))  // Vuelve a hacer la solicitud con los nuevos parámetros
  }
  
  const dataToRender = () => {
    if (store.data && Array.isArray(store.data)) {
      return store.data
    } else if (store.allData && Array.isArray(store.allData.data)) {
      return store.allData.data
    } else {
      return []
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filtro de Búsqueda</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                options={[ 
                  { value: '', label: 'Todos' },
                  { value: 1, label: 'Cliente' },
                  { value: 2, label: 'Administrador' },
                  { value: 3, label: 'Proveedor' }
                ]}
                value={currentRole}
                onChange={data => setCurrentRole(data)}
              />
            </Col>
            <Col md='4'>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                options={[
                  { value: 1, label: 'Activo' },
                  { value: '', label: 'Todos' },
                  { value: 0, label: 'Inactivo' }
                ]}
                value={currentStatus}
                onChange={data => setCurrentStatus(data)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
      <DataTable
  noHeader
  pagination
  subHeader
  responsive
  paginationServer
  columns={columns}
  sortIcon={<ChevronDown />}
  className='react-dataTable'
  paginationComponent={() => (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      pageCount={Math.ceil(store.total / rowsPerPage)}
      activeClassName='active'
      forcePage={currentPage - 1}
      onPageChange={handlePageChange}
      containerClassName={'pagination react-paginate justify-content-center'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      disabledClassName={'disabled'}
    />
  )}
  data={dataToRender()}
  subHeaderComponent={
    <CustomHeader
      toggleSidebar={toggleSidebar}
      handlePerPage={handlePerPage}
      rowsPerPage={rowsPerPage}
      searchTerm={searchTerm}
      handleFilter={handleFilter}
    />
  }
  noDataComponent={
    <div className="no-data-container">
      No hay registros para mostrar
    </div>
  }
/>

      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default UsersList
