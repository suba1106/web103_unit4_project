import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import { getOption } from '../utilities/calcprice'

const ViewCars = () => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setCars(await CarsAPI.getAllCars())
            } catch (error) {
                console.error(error)
            }
        }
        fetchCars()
    }, [])

    const handleDelete = async (id) => {
        try {
            await CarsAPI.deleteCar(id)
            setCars(cars.filter((car) => car.id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    if (cars.length === 0) return <p>No cars yet. <Link to="/">Create one!</Link></p>

    return (
        <div>
            <h2>All Cars</h2>
            {cars.map((car) => (
                <div key={car.id} style={{ background: '#ccc', border: '1px solid #ccc', padding: 12, marginBottom: 12 }}>
                    <div
                        style={{
                            width: 60,
                            height: 30,
                            borderRadius: 6,
                            backgroundColor: getOption('exterior', car.exterior)?.color
                        }}
                    />
                    <h3>{car.name}</h3>
                    <p>
                        {car.exterior} · {car.wheels} wheels · {car.interior} · {car.roof}
                    </p>
                    <p>${Number(car.price).toLocaleString()}</p>
                    <Link to={`/customcars/${car.id}`}>Details       `</Link>{' '}
                    <Link to={`/edit/${car.id}`}>Edit</Link>{' '}
                    <button onClick={() => handleDelete(car.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default ViewCars