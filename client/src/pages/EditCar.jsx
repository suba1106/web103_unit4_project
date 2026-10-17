import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import CarForm from '../components/CarForm'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            try {
                setCar(await CarsAPI.getCar(id))
            } catch (error) {
                console.error(error)
            }
        }
        fetchCar()
    }, [id])

    const handleUpdate = async (updatedCar) => {
        await CarsAPI.updateCar(id, updatedCar)
        navigate(`/customcars/${id}`)
    }
    
    if (!car) return <p>Loading...</p>

    return (
        <div>
            <h2>Edit Car</h2>
            <CarForm initialCar={car} onSubmit={handleUpdate} submitLabel="Save Changes" />
        </div>
    )
}

export default EditCar