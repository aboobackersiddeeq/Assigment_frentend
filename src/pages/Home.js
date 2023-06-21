import React from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import DetailsTable from '../components/DetailsTable'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <SearchBar/>
        <DetailsTable/>
    </div>
  )
}

export default Home