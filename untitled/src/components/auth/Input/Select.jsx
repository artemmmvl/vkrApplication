import React from 'react';
import styles from './Input.module.css';


function Select(props) {
    // console.log("props")
    // console.log(props)
    return(

            <select onChange={props.onChange} value={props.value} name={props.name} id={props.id} className={props.className}>

                {props.values.map((p)=>(
                    <option key={p.valueHtml} value={p.valueHtml} disabled={p.disable===true}>{p.value}</option>

                ))}



            </select>

    )
}

export default Select;

