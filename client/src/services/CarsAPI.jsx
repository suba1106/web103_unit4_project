const API_URL = '/api/cars'

const getAllCars = async () => {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error('Failed to fetch cars')
    return response.json()
}

const getCar = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) throw new Error('Failed to fetch car')
    return response.json()
}

const createCar = async (car) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    })
    if (!response.ok) throw new Error('Failed to create car')
    return response.json()
}

const updateCar = async (id, car) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    })
    if (!response.ok) throw new Error('Failed to update car')
    return response.json()
}

const deleteCar = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete car')
    return response.json()
}

export default { getAllCars, getCar, createCar, updateCar, deleteCar }