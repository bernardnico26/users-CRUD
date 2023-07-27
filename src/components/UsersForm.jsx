import { useForm } from "react-hook-form"
import { useEffect,useState} from 'react'


const UsersForm = ({addUser, userSelected, editUser, closeModal, setShowFormModal, setShowPopUp, setPopUpMessage, setPopUpType}) => {

    const { register, handleSubmit, reset} = useForm()
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if (userSelected){
            reset(userSelected)
        }else{
            reset({
                first_name: "",
                last_name: "",
                email: "",
                birthday: "",
                password: ""
            })
        }
    
    },[userSelected])

    const submit = data =>{
        setLoading(true)

        setTimeout(() => {
        if(userSelected){
            editUser(data)
        }else{
            addUser(data)
        }
        setPopUpMessage(userSelected ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente');
        setPopUpType('success')
        setShowPopUp(true)
        closeModal()
        setLoading(false)
        },4000)
    }

    return(
        <section className="modal-section">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="principal-section-form">
                        <h3>type your dates</h3>
                        <div className="close-button-section">
                            <button
                            onClick={() => closeModal()}
                            className="close-button">x</button>
                        </div>
                    </div>
                    <div className="inputs-section">
                        <div className="input-container">
                            <label htmlFor="p-first-name">Nombre </label>
                            <input
                            type="text"
                            id="p-first-name"
                            {...register("first_name",{ required: true })}/>
                        </div>

                        <div className="input-container">
                            <label htmlFor="p-last-name">Apellido </label>
                            <input
                            type="text"
                            id="p-last-name"
                            {...register("last_name",{ required: true })}/>
                        </div>

                        <div className="input-container">
                            <label htmlFor="p-correo">Correo</label>
                            <input
                            type="text"
                            id="p-correo"
                            {...register("email",{ required: true })}
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="p-date">Cumpleaños</label>
                            <input
                            type="date"
                            id="p-date"
                            {...register("birthday",{ required: true })}
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="p-contraseña">Contraseña</label>
                            <input
                            type="password"
                            id="p-contraseña"
                            {...register("password",{ required: true })}
                            />
                        </div>

                        <div className="submit-section">
                        <button className={`submit-button ${loading ? 'loading' : ''}`}>
                            {loading ? (
                                <div className="loader"></div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                        </div>
                    </div>                    
                </form>
        </section>
    )
}
export default UsersForm