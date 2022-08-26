import React, { useState } from "react";
import ReviewEditModal from './ReviewEditModal/ReviewEditModal'
import s from './ReviewDashboardCard.module.scss'

function ReviewDashboardCard(props) {
  const { id, id_orders, id_user_professional, id_user_client, feedback_client, rating, isActive } = props;

  const [editModalActive, setEditModalActive] = useState(true)

  function handleEditOpenModal(e) {
    setEditModalActive(!editModalActive)
  }

  function handleDelete(e) {
    console.log('delete');
  }
  
  function handleEdit(e) {
    console.log('edit');
  }

  function handleRestore(e) {
    console.log('edit');
  }

  return (
    <div className={`${s.cardContainer}`}>
    {editModalActive? <ReviewEditModal handleEditOpenModal={handleEditOpenModal} editModalActive={editModalActive} {...props}/> : null}
    <div className={s.importantInformationContainer}>
      {/* <button onClick={handleOpenModal}>Detalles</button> */}
      <div className={s.nameContainer}>
        <h1>ID Reseña</h1>
        <h1>{id}</h1>
      </div>
      <div>
        <h4>ID Orden</h4>
        <h4>{id_orders}</h4>
      </div>
      <div>
        <h4>ID usuario Profesional</h4>
        <h4>{id_user_professional}</h4>
      </div>
      <div>
        <h4>ID Usuario solicitante</h4>
        <h4>{id_user_client}</h4>
      </div>
      <div>
        <h4>Descripción</h4>
        <h4>{feedback_client}</h4>
      </div>
      <div>
        <h4>Rating</h4>
        <h4>{rating}</h4>
      </div>
      <div>
        <h4>Activa?</h4>
        <h4>{isActive ? "Si" : "No"}</h4>
      </div>
      {
      isActive ? <button className={s.deleteBtn} onClick={handleDelete}>Eliminar</button> :
                 <button className={s.restoreBtn} onClick={handleRestore}>Restaurar</button>
      }
      <button className={s.editBtn} onClick={handleEditOpenModal}>Editar</button>
    </div>
  </div>
  )
}

export default ReviewDashboardCard;