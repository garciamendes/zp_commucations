import axios from 'axios'
import { localStorage } from '../utils'

const TOKEN = localStorage.getItem('token') ? localStorage.getItem('token') : ''

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`
  }
})