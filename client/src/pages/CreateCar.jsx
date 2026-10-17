import { useNavigate } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import CarForm from '../components/CarForm'
import { options } from '../utilities/calcprice'

const CreateCar = () => {
    const navigate = useNavigate()

    const initialCar = {
        name: '',
        exterior: options.exterior[0].name,
        wheels: options.wheels[0].name,
        interior: options.interior[0].name,
        roof: options.roof[0].name
    }

    const handleCreate = async (car) => {
        await CarsAPI.createCar(car)
        navigate('/customcars')
    }

    return (
        <div>
            <h2>Create a Car</h2>
            <CarForm initialCar={initialCar} onSubmit={handleCreate} submitLabel="Create Car" />
        </div>
    )
}

export default CreateCar