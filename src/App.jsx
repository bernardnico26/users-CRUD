import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'
import PopUp from './components/PopUp'

function App() {
  const [usersList, setUsersList] = useState([])
  const [userSelected, setUserSelected] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false); // Nuevo estado para controlar la visibilidad del modal
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [popUpType, setPopUpType] = useState('success');

  const getAllUsers = () => {
    axios
      .get(`https://users-crud-mdw3.onrender.com/users`)
      .then(resp => setUsersList(resp.data))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const addUser = newUser => {
    axios
      .post(`https://users-crud-mdw3.onrender.com/users`, newUser)
      .then(() => {
        getAllUsers()
        setUserSelected(undefined)
        setShowFormModal(false)
        setPopUpMessage('Usuario creado exitosamente');
        setPopUpType('success');
        setShowPopUp(true);
      })
      .catch(error => {
        console.error(error)
        setPopUpMessage('Error al crear el usuario');
        setPopUpType('error');
        setShowPopUp(true);
      })
  }

  const deleteUser = id => {
    axios
      .delete(`https://users-crud-mdw3.onrender.com/users/${id}/`)
      .then(() => {
        getAllUsers()
        setPopUpMessage('Usuario eliminado exitosamente');
        setPopUpType('success');
        setShowPopUp(true);
      })
      .catch(error => {
        console.error(error)
        setPopUpMessage('Error al eliminar el usuario');
        setPopUpType('error');
        setShowPopUp(true);
      })
  }

  const selectUser = user => {
    setUserSelected(user)
    setShowFormModal(true) // Mostrar el modal al seleccionar un usuario para editar
  }

  const editUser = user => {
    axios
      .put(`https://users-crud-mdw3.onrender.com/users/${user.id}/`, user)
      .then(() => {
        getAllUsers()
        setUserSelected(undefined)
        setShowFormModal(false)
        setPopUpMessage('Usuario actualizado exitosamente')
        setPopUpType('success')
        setShowPopUp(true)
      })
      .catch(error => {
        console.error(error)
        setPopUpMessage('Error al actualizar los datos del usuario');
        setPopUpType('error')
        setShowPopUp(true)
      })
  }

  const closeModal = () => {
    setShowFormModal(false)
    setUserSelected(undefined);
};


  return (
    <main>
      
      {showFormModal && (
        <UsersForm
          addUser={addUser}
          userSelected={userSelected}
          editUser={editUser}
          setShowFormModal={setShowFormModal}
          closeModal={closeModal}
          setShowPopUp={setShowPopUp}
          setPopUpMessage={setPopUpMessage}
          setPopUpType={setPopUpType}
        />
      )}
      {showPopUp && (
        <PopUp
          message={popUpMessage}
          type={popUpType}
          onClose={() => setShowPopUp(false)}
        />
      )}
      <UsersList
        usersList={usersList}
        deleteUser={deleteUser}
        selectUser={selectUser}
        setShowFormModal={setShowFormModal}
        />

      
    </main>
  )
}

export default App
