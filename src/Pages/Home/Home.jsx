import { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'

export default function Home(pros) {
    
const[data,setData]=useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
       useEffect(() => {
            axios.get("https://fakestoreapi.com/products/")
                .then(response => response.json())
                .then((products) => {
                    setData(products)
                    setLoading(false)
                })
                .catch((error) => {
                    setError(error.message)
                    setLoading(false)
                })
        }, [])

    return(
        <>

        </>
    )
}