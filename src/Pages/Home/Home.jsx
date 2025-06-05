import { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'

export default function Home(pros) {
    
const[data,setData]=useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const[recherche,setRecherche]=useState("")
       useEffect(() => {
            axios.get("https://fakestoreapi.com/products/")
              
                .then((response) => {
                    setData(response.data)
                    setLoading(false)
                })
                .catch((error) => {
                    setError(error.message)
                    setLoading(false)
                })
        }, [])
    
    if (loading) return <div className="text-center p-4">Chargement...</div>
    if (error) return <div className="text-center p-4 text-red-500">Erreur: {error}</div>
    
    return(
        <>
        <div className="header">
            <input type="search" placeholder='Sreach for a country...' />
            <div class="dropdown">
                <select>
                    <option disabled selected>Filter by Region</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>
        </div>
            

        </>
    )
}