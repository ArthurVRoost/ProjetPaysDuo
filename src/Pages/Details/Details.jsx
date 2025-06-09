// IMPORTS
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Details.css'
import Nav from '../../components/nav/Nav'

// FUNCTION
export default function Details() {
    // CONST
    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [borderCountries, setBorderCountries] = useState([])
    const { countryName } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        
        axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
            .then((response) => {
                const countryData = response.data[0]
                setCountry(countryData)
                
                // POUR LES PAYS FRONTALIERS
                if (countryData.borders && countryData.borders.length > 0) {
                    const borderCodes = countryData.borders.join(',')
                    return axios.get(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`)
                }
                return null
            })
            .then((borderResponse) => {
                if (borderResponse) {
                    setBorderCountries(borderResponse.data)
                }
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }, [countryName])

    // OUVRE LA BONNE PAGE DYNAMIQUEMENT POUR LES FRONTIERES
    const handleBorderCountryClick = (borderCountryName) => {
        navigate(`/country/${borderCountryName}`)
    }
    // USENAVIGATE POUR UN RETOUR DYNAMIQUE
    const handleBackClick = () => {
        navigate(-1) 
    }   
    // GESTION D'ERREUR
    if (loading) return <div className="loading">Chargement des détails...</div>
    if (error) return <div className="error">Erreur: {error}</div>
    if (!country) return <div className="error">Pays non trouvé</div>

    return (
        <>
        
        <div className="country-detail">
            <button onClick={handleBackClick} className="back-button">
                ← Back
            </button>

            <div className="country-content">
                <div className="flag-section">
                    <img 
                        src={country.flags.svg} 
                        alt={`Flag of ${country.name.common}`}
                        className="country-flag"
                    />
                </div>

                <div className="info-section">
                    <h1 className="country-name">{country.name.common}</h1>
                    
                    <div className="info-grid">
                        <div className="info-column">
                            <p><strong>Native Name:</strong> {
                                country.name.nativeName 
                                    ? Object.values(country.name.nativeName)[0]?.common || country.name.common
                                    : country.name.common
                            }</p>
                            <p><strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}</p>
                            <p><strong>Region:</strong> {country.region}</p>
                            <p><strong>Sub Region:</strong> {country.subregion || 'N/A'}</p>
                            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                        </div>

                        <div className="info-column">
                            <p><strong>Top Level Domain:</strong> {country.tld?.[0] || 'N/A'}</p>
                            <p><strong>Currencies:</strong> {
                                country.currencies 
                                    ? Object.values(country.currencies).map(curr => curr.name).join(', ')
                                    : 'N/A'
                            }</p>
                            <p><strong>Languages:</strong> {
                                country.languages 
                                    ? Object.values(country.languages).join(', ')
                                    : 'N/A'
                            }</p>
                        </div>
                    </div>

                    {borderCountries.length > 0 && (
                        <div className="border-countries">
                            <h3>Border Countries:</h3>
                            <div className="border-buttons">
                                {borderCountries.map((borderCountry) => (
                                    <button key={borderCountry.cca3} onClick={() => handleBorderCountryClick(borderCountry.name.common)} className="border-country-btn">
                                        {borderCountry.name.common}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}