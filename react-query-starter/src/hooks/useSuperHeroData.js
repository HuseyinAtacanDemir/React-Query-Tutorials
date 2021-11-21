import { useQuery } from 'react-query'
import axios from 'axios'

export const useSuperHeroData = (heroId) => {
    const fetchSuperHero = heroId => {
        return axios.get(`http://localhost:4000/superheroes/${heroId}`)
    }
    return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId))
}