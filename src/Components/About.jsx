import React from 'react'
import Navbar from './Navbar'

const About = () => {
  return (
    <div className='abt'>
        <Navbar/>
        <h2>What is this?</h2>
        <p>Nothing, just a simple project to practice my react skills and could prob be useful(?)</p>
        <p>All data from datamuse API <a href="https://www.datamuse.com/api/"> https://www.datamuse.com/api/</a> </p>

        <em>Will update</em>

        <p className='me'><a target='_blank' rel='noreferrer' href="https://github.com/jul-cesar/wwoorrddss"> https://github.com/jul-cesar/wwoorrddss</a></p>
    </div>
  )
}

export default About