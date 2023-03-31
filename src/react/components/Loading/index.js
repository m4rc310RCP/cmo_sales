import React, {useRef, useState, useEffect} from 'react';

import './style.css';

export default (props)=> {
    const ref = useRef(null);
    
    useEffect(()=>{
        let w = ref.current.offsetWidth;
        document.documentElement.style.setProperty('--w', `${w}px`);
        
        const handleResize = () => {
            const {current} = ref;
            if (current){
                w = ref.current.offsetWidth;
                document.documentElement.style.setProperty('--w', `${w}px`);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize');
        }
    }, []);

    return(
        <div id='loading_container' ref={ref} style={{
            width: props.width,
        }}>
            <div className='bar'>
                <div className='ball' style={{
                    backgroundColor: props.ballColor
                }}></div>
            </div>
            <strong className='center' style={{
                fontSize: props.fontSize,
                color: props.color,
            }}>{props.children}</strong>
        </div>
    );
}
