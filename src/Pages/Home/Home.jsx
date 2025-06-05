import { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'

export default function Home(props) {
    const[data,setData]=useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const[recherche,setRecherche]=useState("")
    const[regionFilter,setRegionFilter]=useState("")

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
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
                <input 
                    type="search" 
                    placeholder='Search for a country...'
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                />
                <div className="dropdown">
                    <select 
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                    >
                        <option value="">Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>
<div className="card-container">
                {data
                    .filter(country => {
                        const matchesSearch = country.name.common.toLowerCase().includes(recherche.toLowerCase());
                        const matchesRegion = regionFilter === ""  || country.region === regionFilter;
                        return matchesSearch && matchesRegion;
                    })
                   .map((element) => (
                        <div className="card" key={element.cca3}>
                            <img 
                                src={element.flags.svg} 
                                alt=""
                                className="flag"
                            />
                            <div className="card-content">
                                <h3 className='name'>{element.name.common}</h3>
                                <p className='population'><strong>Population:</strong> {element.population?.toLocaleString()  }</p>
                                <p className='region'><strong>Region:</strong> {element.region}</p>
                                <p className='capital'><strong>Capital:</strong> {element.capital?.[0]  }</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}