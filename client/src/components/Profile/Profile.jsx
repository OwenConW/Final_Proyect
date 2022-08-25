import React from "react";
import { Link } from 'react-router-dom';

import s from './Profile.module.scss';
import configLogo from './assets/configLogo.svg'
import plusLogo from './assets/PlusLogo.svg'
import rocket from './assets/Rocket.svg'

import Navbar from "../Navbar/Navbar";
import CardProfileMap from '../CardProfileMap/CardProfileMap.jsx'
import { getLocalStorage } from "../../handlers/localStorage";
import defaultimage from './assets/deafultimage.png'
import ProfessionBox from "../ProfessionBox/ProfessionBox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCharsById } from '../../redux/userActions'



const Profile = () => {
  // const dispatch = useDispatch()
  let activeUser = getLocalStorage();

  const handlePremium = async () => {
    await axios.get(`/mails/premiumspam?mail=${activeUser.mail}&name=${activeUser.name}`)
  }

  console.log(activeUser.professions)

  // useEffect(() => {
  //   dispatch(getCharsById(activeUser.id))
  // }, [activeUser])

  // const user = useSelector((state) => state.users.details)

  // console.log("user", user)


  return (
    <>
      <Navbar />
      {/*----- CONTENEDOR IZQUIERDO -----*/}
      <div className={s.container}>
        <div className={s.leftContainer}>
          <div className={s.profileInfo}>
            <div className={s.profile_Img_container}>
              {activeUser.image ? <img src={activeUser.image} className={s.profile_Img} /> : <img src={defaultimage} className={s.profile_Img} />}
            </div>
            <div className={s.profileDetail}>
              <div className={s.name}>{activeUser.name} {activeUser.last_Name}</div>
              <div className={s.location}>{activeUser.city}, {activeUser.country}</div>
              <div className={s.description}>{activeUser.description}</div>
            </div>

          </div>
          <div className={s.orderBox}>
            <p className={s.orderText}>Mis ordenes recientes</p>

            <div className={s.lastOrders}>
              <CardProfileMap />
              <CardProfileMap />
              <CardProfileMap />
            </div>
          </div>
          <div className={s.configBox}>
            <div className={s.configImg}>
              <Link to='/ProfileConfig/edit'>
                <img src={configLogo} ></img>
              </Link>
            </div>
            <Link to='/ProfileConfig/edit' className={s.configText}>Panel de configuración</Link>
          </div>

        </div>


        {/*----- CONTENEDOR DERECHO -----*/}
        <div className={s.rightContainer}>
          <div className={s.professionContainer}>
            <p className={s.professionText}>Mis oficios publicados</p>
            <ProfessionBox professional={activeUser} />
            <div className={s.addProfession}>
              <Link to='/ProfileConfig/professions'>
                <div>
                  <img src={plusLogo} alt='plus'></img>
                </div>
              </Link>
            </div>
          </div>
          <div className={s.bePremium}>
            {

            }
            <div className={s.premiumText}>
              <h1>Plan Premium</h1>
              <div className={s.premiumDetail}>
                <h4>Obtenga los beneficios del plan premium:
                  mas visibilidad, opciones y recomendacion por parte de la aplicacion
                  para que tenga una mayor cantidad de clientes y despegue al proximo nivel
                </h4>
              </div>

            </div>

            <div className={s.premiumRocketButton}>
              <div>
                <img src={rocket} alt='Premium Logo'></img>
              </div>
              <span onClick={handlePremium}>
                <button>Mejorar</button>
              </span>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default Profile;
