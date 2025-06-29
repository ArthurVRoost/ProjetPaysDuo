// IMPORTS
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import axios from 'axios'
import Nav from '../../components/nav/Nav'

// FUNCTION
export default function Home(props) {
    // CONST
    const[data,setData]=useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const[recherche,setRecherche]=useState("")
    const[regionFilter,setRegionFilter]=useState("")
    const navigate = useNavigate()
    // OUVRE LA BONNE PAGE DYNAMIQUEMENT
    const handleCountryClick = (countryName) => {
        navigate(`/country/${countryName}`)
    }

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population")
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }, [])
    // GESTION D'ERREUR
    if (loading) return <div className="text-center p-4">Chargement...</div>
    if (error) return <div className="text-center p-4 text-red-500">Erreur: {error}</div>

    return(
        <>
            {/* FILTER REGIONS */}
            <div className="header">
                <input type="search" placeholder='&#x1F50D; Search for a country...' value={recherche} onChange={(e) => setRecherche(e.target.value)}/>
                <div className="dropdown">
                    <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>
            {/* FILTER INPUT QUI GERE AUSSI MINUSCULE ETC */}
            <div className="card-container">
                {data
                    .filter(country => {
                        const matchesSearch = country.name.common.toLowerCase().includes(recherche.toLowerCase());
                        const matchesRegion = regionFilter === "" || country.region === regionFilter;
                        return matchesSearch && matchesRegion;
                    })
                    // MAP SANS OBJET VALUES POUR MAPPER UNIQUEMENT CE QU'ON VEUT
                    .map((element) => (
                        <div  className="card"  key={element.cca3} onClick={() => handleCountryClick(element.name.common)} style={{ cursor: 'pointer' }}>
                            <img  src={element.flags.svg}  alt={`Flag of ${element.name.common}`} className="flag"/>
                            <div className="card-content">
                                <h3>{element.name.common}</h3>
                                <p><strong>Population:</strong> {element.population?.toLocaleString() || 'N/A'}</p>
                                <p><strong>Region:</strong> {element.region}</p>
                                <p><strong>Capital:</strong> {element.capital?.[0] || 'N/A'}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}