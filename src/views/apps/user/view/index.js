import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardText, CustomInput, Collapse, Button, CardBody } from 'reactstrap'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa' // Importar los iconos

const PermissionsTable = () => {
  const [isOpen, setIsOpen] = useState({})
  const [permissionsChecked, setPermissionsChecked] = useState({
    ingresos: false,
    egresos: false,
    estadoResultado: false,
    reportesGenerales: false,
    usuarios: false
  })

  // Función para alternar el estado de un módulo específico
  const toggleCollapse = (id) => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Función para manejar el cambio del checkbox principal (todos los permisos)
  const handleMainCheckboxChange = (module) => {
    setPermissionsChecked((prev) => {
      const newState = { ...prev, [module]: !prev[module] }
      // Si se selecciona el checkbox principal, marcar todos los permisos
      const newPermissions = document.querySelectorAll(`input[name=${module}]`)
      newPermissions.forEach((checkbox) => {
        checkbox.checked = newState[module]
      })
      return newState
    })
  }

  return (
    <Card className='shadow-sm p-3 mb-5 bg-white rounded'>
      <CardHeader>
        <CardTitle tag='h1'>Permisos</CardTitle>
      </CardHeader>
      <div className='d-flex flex-wrap'>
        {/* Módulo Ingresos */}
        <div className='col-12 col-md-6 mb-3'>
          <div>
            <Button
              color='white'
              block
              onClick={() => toggleCollapse('ingresos')}
              className='text-left d-flex justify-content-between align-items-center'
              style={{ border: '2px solid grey' }}
            >
              <h5>Ingresos</h5>
              <span>
                {isOpen['ingresos'] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </Button>
            <Collapse isOpen={isOpen['ingresos']}>
              <CardBody>
                <ul>
                  <li>
                    <CustomInput
                      type='checkbox'
                      id='ingresos-all'
                      label='Seleccionar todo'
                      checked={permissionsChecked.ingresos}
                      onChange={() => handleMainCheckboxChange('ingresos')}
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='ingresos'
                      id='ingresos-1'
                      label='Ver'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='ingresos'
                      id='ingresos-2'
                      label='Editar'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='ingresos'
                      id='ingresos-3'
                      label='Agregar'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='ingresos'
                      id='ingresos-4'
                      label='Eliminar'
                    />
                  </li>
                </ul>
              </CardBody>
            </Collapse>
          </div>
        </div>

        {/* Módulo Egresos */}
        <div className='col-12 col-md-6 mb-3'>
          <div>
            <Button
              color='white'
              block
              onClick={() => toggleCollapse('egresos')}
              className='text-left d-flex justify-content-between align-items-center'
              style={{ border: '2px solid blue' }}
            >
              <h5>Egresos</h5>
              <span>
                {isOpen['egresos'] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </Button>
            <Collapse isOpen={isOpen['egresos']}>
              <CardBody>
                <ul>
                  <li>
                    <CustomInput
                      type='checkbox'
                      id='egresos-all'
                      label='Seleccionar todo'
                      checked={permissionsChecked.egresos}
                      onChange={() => handleMainCheckboxChange('egresos')}
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='egresos'
                      id='egresos-1'
                      label='Ver'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='egresos'
                      id='egresos-2'
                      label='Editar'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='egresos'
                      id='egresos-3'
                      label='Agregar'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='egresos'
                      id='egresos-4'
                      label='Eliminar'
                    />
                  </li>
                </ul>
              </CardBody>
            </Collapse>
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap'>
        {/* Módulo Estado Resultado */}
        <div className='col-12 col-md-6 mb-3'>
          <div>
            <Button
              color='white'
              block
              onClick={() => toggleCollapse('estadoResultado')}
              className='text-left d-flex justify-content-between align-items-center'
              style={{ border: '2px solid red' }}
            >
              <h5>Estado Resultado</h5>
              <span>
                {isOpen['estadoResultado'] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </Button>
            <Collapse isOpen={isOpen['estadoResultado']}>
              <CardBody>
                <ul>
                  <li>
                    <CustomInput
                      type='checkbox'
                      id='estadoResultado-all'
                      label='Seleccionar todo'
                      checked={permissionsChecked.estadoResultado}
                      onChange={() => handleMainCheckboxChange('estadoResultado')}
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='estadoResultado'
                      id='estado-1'
                      label='Ver'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='estadoResultado'
                      id='estado-2'
                      label='Editar'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='estadoResultado'
                      id='estado-3'
                      label='Agregar'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='estadoResultado'
                      id='estado-4'
                      label='Eliminar'
                    />
                  </li>
                </ul>
              </CardBody>
            </Collapse>
          </div>
        </div>

        {/* Módulo Reportes Generales */}
        <div className='col-12 col-md-6 mb-3'>
          <div>
            <Button
              color='white'
              block
              onClick={() => toggleCollapse('reportesGenerales')}
              className='text-left d-flex justify-content-between align-items-center'
              style={{ border: '2px solid orange' }}
            >
              <h5>Reportes Generales</h5>
              <span>
                {isOpen['reportesGenerales'] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </Button>
            <Collapse isOpen={isOpen['reportesGenerales']}>
              <CardBody>
                <ul>
                  <li>
                    <CustomInput
                      type='checkbox'
                      id='reportesGenerales-all'
                      label='Seleccionar todo'
                      checked={permissionsChecked.reportesGenerales}
                      onChange={() => handleMainCheckboxChange('reportesGenerales')}
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='reportesGenerales'
                      id='reportes-1'
                      label='Ver'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='reportesGenerales'
                      id='reportes-2'
                      label='Editar'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='reportesGenerales'
                      id='reportes-3'
                      label='Agregar'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='reportesGenerales'
                      id='reportes-4'
                      label='Eliminar'
                    />
                  </li>
                </ul>
              </CardBody>
            </Collapse>
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap'>
        {/* Módulo Usuarios */}
        <div className='col-12 col-md-6 mb-3'>
          <div>
            <Button
              color='white'
              block
              onClick={() => toggleCollapse('usuarios')}
              className='text-left d-flex justify-content-between align-items-center'
              style={{ border: '2px solid green' }}
            >
              <h5>Usuarios</h5>
              <span>
                {isOpen['usuarios'] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </Button>
            <Collapse isOpen={isOpen['usuarios']}>
              <CardBody>
                <ul>
                  <li>
                    <CustomInput
                      type='checkbox'
                      id='usuarios-all'
                      label='Seleccionar todo'
                      checked={permissionsChecked.usuarios}
                      onChange={() => handleMainCheckboxChange('usuarios')}
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='usuarios'
                      id='usuarios-1'
                      label='Ver'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='usuarios'
                      id='usuarios-2'
                      label='Editar'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='usuarios'
                      id='usuarios-3'
                      label='Agregar'
                    />
                  </li>
                  <li>
                    <CustomInput
                      type='checkbox'
                      name='usuarios'
                      id='usuarios-4'
                      label='Eliminar'
                    />
                  </li>
                </ul>
              </CardBody>
            </Collapse>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PermissionsTable
