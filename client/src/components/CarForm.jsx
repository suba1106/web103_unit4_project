import { useState } from 'react'
import { options, calcPrice, getOption } from '../utilities/calcprice'
import { validateCar } from '../utilities/validation'

const CarForm = ({ initialCar, onSubmit, submitLabel }) => {
    const [car, setCar] = useState(initialCar)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationError = validateCar(car)
        if (validationError) {
            setError(validationError)
            return
        }
        try {
            await onSubmit({ ...car, price: calcPrice(car) })
        } catch (err) {
            setError(err.message)
        }
    }

    const swatchColor = getOption('exterior', car.exterior)?.color

    return (
        <form onSubmit={handleSubmit}>
            {/* visible change: preview color follows the exterior choice */}
            <div
                style={{
                    width: '100%',
                    maxWidth: 300,
                    height: 120,
                    borderRadius: 12,
                    backgroundColor: swatchColor,
                    marginBottom: 16
                }}
            />

            <label>
                Name
                <input name="name" value={car.name} onChange={handleChange} />
            </label>

            {Object.keys(options).map((feature) => (
                <label key={feature}>
                    {feature.charAt(0).toUpperCase() + feature.slice(1)}
                    <select name={feature} value={car[feature]} onChange={handleChange}>
                        {options[feature].map((option) => (
                            <option key={option.name} value={option.name}>
                                {option.name} (+${option.price})
                            </option>
                        ))}
                    </select>
                </label>
            ))}

            <h3>Total: ${calcPrice(car).toLocaleString()}</h3>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit">{submitLabel}</button>
        </form>
    )
}

export default CarForm