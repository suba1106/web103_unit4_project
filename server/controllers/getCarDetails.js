import {pool} from '../db.js';

const getCarDetails = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {name, pricepoint, audience, image, description} = req.body
        const results = await pool.query(`
            UPDATE gifts SET name = $1, pricepoint = $2, audience = $3, image = $4, description = $5, submittedby = $6, submittedon= $7 WHERE id = $8`,
            [name, pricepoint, audience, image, description, submittedby, submittedon, id]
        )
        res.status(200).json(results.row[0])
    } catch (error) {
        res.status(409({error: error.message}))
    }
};