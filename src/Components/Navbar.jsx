import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <h2 > <Link to={"/"}>  wwoorrddss </Link></h2>
        <Link to={"/about"}>
        About this
        </Link>
       
    </nav>
  )
}

export default Navbar