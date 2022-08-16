import React from 'react'

//style and utilities
import s from './Login.module.scss';
import logo from './assets/logo.svg';
import background from './assets/background.svg'

const Login = () => {
  return (
    <div className={s.container}>
        <div className={s.login}>
            <div className={s.logo}>

            </div>
        </div>
        <div className={s.description}>

            <div className={s.text}>
                <h4>Estás buscando un profesional para tu hogar?</h4>
                <p>Encuentra aquí alguien capacitado para el trabajo que necesites realizar.</p>
                <br />
                <p>Puedes ver nuestro cátalogo o utilizar el mapa, para encontrar profesionales cerca tuyo.</p>
            </div>

            <img src={background} alt="backg" />

        </div>
    </div>
  )
}

export default Login;