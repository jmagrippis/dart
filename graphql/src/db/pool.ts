import { Pool } from 'pg'
import { config } from './config'

const pool = new Pool(config)

export const query = (text, params) => pool.query(text, params)
