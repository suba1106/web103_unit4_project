export const validateCar = (car) => {
    if (!car.name || !car.name.trim()) {
        return 'Please give your car a name.'
    }
    if (car.roof === 'Convertible' && car.wheels === 'Off-road') {
        return 'A convertible cannot have off-road wheels.'
    }
    if (car.roof === 'Convertible' && car.interior === 'Cloth') {
        return 'A convertible requires a leather interior.'
    }
    return null
}