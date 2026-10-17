export const BASE_PRICE = 20000

export const options = {
    exterior: [
        { name: 'Red', price: 1000, color: '#c0392b' },
        { name: 'Blue', price: 800, color: '#2980b9' },
        { name: 'Black', price: 1200, color: '#222222' },
        { name: 'Orange', price: 1500, color: '#FFA500'}
    ],
    wheels: [
        { name: 'Standard', price: 0 },
        { name: 'Sport', price: 1500 },
        { name: 'Off-road', price: 2000 }
    ],
    interior: [
        { name: 'Cloth', price: 0 },
        { name: 'Leather', price: 2500 }
    ],
    roof: [
        { name: 'Standard', price: 0 },
        { name: 'Sunroof', price: 1000 },
        { name: 'Convertible', price: 3000 }
    ]
}

export const getOption = (feature, name) =>
    options[feature].find((option) => option.name === name)

export const calcPrice = (car) =>
    Object.keys(options).reduce(
        (total, feature) => total + (getOption(feature, car[feature])?.price || 0),
        BASE_PRICE
    )