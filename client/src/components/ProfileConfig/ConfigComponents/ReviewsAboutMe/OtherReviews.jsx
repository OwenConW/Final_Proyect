import React from "react";
import s from './OtherReviews.module.scss'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "../../../../handlers/localStorage";
// eslint-disable-next-line no-unused-vars
import { getChars, getCharsById } from "../../../../redux/userActions";
// eslint-disable-next-line no-unused-vars
import CardReview from "../../../Details/CardReview/CardReview";
import RevCards from "./RevCards/RevCards";
import { useState } from "react";
const OtherReviews = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch()
  let activeUser = getLocalStorage()
  let saveAllReviews = useSelector((state) => state.reviews.reviews)
  let otherReviews = saveAllReviews?.filter(review => review?.id_user_professional === activeUser.id)

  const [ allReviews, setAllReviews ] = useState(otherReviews)

  let users = useSelector((state) => state.users.users)

  //console.log(allReviews[0])
  useEffect(() => {

  }, [users])

//FILTRADO POR NOMBRE
  const [filter, setFilter] = useState('')

  const filterByName = (filter) => {
    let filteredclients;
    let filteredReviews = allReviews
  
    if (filter) {
      filteredReviews = []
      filteredclients = users.filter(prof => prof.name.toLowerCase().includes(filter.toLowerCase())  || prof.last_Name.toLowerCase().includes(filter.toLowerCase()))
      for (let x = 0; x < filteredclients.length; x++) {
        let filteredclient = filteredclients[x];
        let reviewsForFilteredclient = otherReviews.filter(review => review.id_user_client === filteredclient.id);
        reviewsForFilteredclient.forEach(review => filteredReviews.push(review))
      }
      setAllReviews(filteredReviews)
    } else {
      setAllReviews(otherReviews)
    }
  }

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    //console.log(allReviews)
    filterByName(filter)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])


  // let allReviews = users.map(user => user.reviews)
  // console.log(users)
  return (
    <div className={s.container}>
      <input name="filter" className={s.filter} placeholder="Busqueda por nombre..." value={filter} onChange={event => onFilterChange(event)}></input>
      {
        allReviews ? allReviews.map(review => 
          
            <RevCards review={review}/>
        ) : <p className={s.voidReviews}>Aun no han hecho ninguna reseña sobre ti</p>
      }

    </div>
  )
}

export default OtherReviews