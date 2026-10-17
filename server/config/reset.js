import { pool } from './database.js'
import dotenv from 'dotenv'

dotenv.config()

const createCarsTable = async () => {
  await pool.query(`
    DROP TABLE IF EXISTS cars;

    CREATE TABLE cars (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      exterior VARCHAR(100) NOT NULL,
      wheels VARCHAR(100) NOT NULL,
      interior VARCHAR(100) NOT NULL,
      roof VARCHAR(100) NOT NULL,
      price INTEGER NOT NULL
    );
  `)
  console.log('cars table created')
}

const seedCarsTable = async () => {
  await createCarsTable()

  const cars = [
    { name: 'Weekend Cruiser', exterior: 'Red', wheels: 'Sport', interior: 'Leather', roof: 'Sunroof', price: 32000 },
    { name: 'Daily Driver', exterior: 'Blue', wheels: 'Standard', interior: 'Cloth', roof: 'Standard', price: 24000 }
  ]

  for (const car of cars) {
    await pool.query(
      `INSERT INTO cars (name, exterior, wheels, interior, roof, price)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [car.name, car.exterior, car.wheels, car.interior, car.roof, car.price]
    )
  }
  console.log('cars table seeded')
}

seedCarsTable()
  .catch((error) => console.error('Error resetting database:', error))
  .finally(() => pool.end())