/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'

function Create() {
  const [tarefa, setTarefa] =useState()
  const handleAdd = () =>{
    axios.post('http://localhost:3000/add', {tarefa: tarefa})
    .then(result => {
      location.reload()
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='create_form'>
        <input type='text' name="" id="" placeholder='Entre com a tarefa' onChange={(e) => setTarefa(e.target.value)}></input>
        <button type="button" onClick={handleAdd}>Adicionar</button>
    </div>
  )
}

export default Create