import { reqfetch } from 'api'


const COUNTRY_API = process.env.VITE_COUNTRY_API

export const getCountries = async (region) => {
   const { data, error } = await reqfetch(`${COUNTRY_API}/region/${region}`)

   return { data, error }
}
