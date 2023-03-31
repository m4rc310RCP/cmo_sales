import React, { useState, useEffect } from 'react'
import {Loading} from '../../components';

import './style.css';

const APP_STATUS = '@app:status';

export default (props) => {
    const [status, setStatus] = useState('');

    useEffect(()=>{
        console.log('init...')

        app.receive(APP_STATUS, status => {
            setStatus(status)
        });
    }, []);

    console.log('-')


    return (
        <>
           <div id='content'>
                <div className='center'>
                    <h1 className='logo'>M2s Sales</h1>
                    <h1 className='welcome center'>Iniciando a Aplicação...</h1>
                    <Loading color='lightgray' ballColor='orange' width={200}/>
                </div>
                <div className='botton'>
                    <strong>
                        Copyright © 2023 M2 Sales. <br/>
                        Todos os direitos reservados.
                    </strong>
                    <strong>
                        {status}
                    </strong>
                </div>
            </div>
        </>
    )
}