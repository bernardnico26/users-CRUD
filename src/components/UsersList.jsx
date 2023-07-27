const UsersList = ({usersList,deleteUser,selectUser, setShowFormModal}) =>{
    return(
        <section className="user-list">
            <div className="principal-section">
                <h1>Usuarios</h1>
                <div className="create-user-section">
                    <button onClick={() => setShowFormModal(true)}
                    className='create-user-button'
                    ><span>+</span><p>New user</p></button>
                </div>
            </div>
            <ul>
                {usersList?.map(user=>(
                    <li key={user.id}>
                        <div className="name-section">
                            <h2>
                                {user.first_name} {user.last_name}
                            </h2>
                        </div>
                        
                        <div className="user-dates">
                            <div>
                                <h3>
                                    CORREO
                                </h3>
                                <h5>
                                    {user.email}
                                </h5>
                            </div>
                            <div>
                                <h3>
                                    CUMPLEAÑOS
                                </h3>
                                <h5>
                                    {user.birthday}
                                </h5>
                            </div>
                        </div>
                        
                        <div className="cardbuttons">
                            <button
                            onClick={()=>selectUser(user)}
                            className="edit-button"
                            ><i className='bx bxs-pencil editfont'></i></button>
                            <div className="background-delete">
                                <button
                                onClick={()=>deleteUser(user.id)}
                                className="delete-button"
                                ></button>
                            </div>
                        </div>
                        
                    </li>
                ))
                }
            </ul>
        </section>
    )
}

export default UsersList