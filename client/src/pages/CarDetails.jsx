import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import { getOption } from '../utilities/calcprice'

const CarDetails = () => {
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

    const handleDelete = async () => {
        try {
            await CarsAPI.deleteCar(id)
            navigate('/customcars')
        } catch (error) {
            console.error(error)
        }
    }

    if (!car) return <p>Loading...</p>

    return (
        <div>
            <div
                style={{
                    width: '100%',
                    maxWidth: 300,
                    height: 120,
                    borderRadius: 12,
                    backgroundColor: getOption('exterior', car.exterior)?.color
                }}
            />
            <h2>{car.name}</h2>
            <ul>
                <li>Exterior: {car.exterior}</li>
                <li>Wheels: {car.wheels}</li>
                <li>Interior: {car.interior}</li>
                <li>Roof: {car.roof}</li>
            </ul>
            <h3>${Number(car.price).toLocaleString()}</h3>
            <Link to={`/edit/${car.id}`}>Edit</Link>{' '}
            <button onClick={handleDelete}>Delete</button>{' '}
           <Link to="/customcars">Back to all cars</Link> 
        </div>
    )
}

export default CarDetails