import React from 'react'

import { useQueries } from 'react-query'
import axios from 'axios'

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const DynamicParallelQueries = ({ heroIds }) => {
    const queryResults = useQueries(
        heroIds.map(id => {
            return {
                queryKey: ['super-hero', id+""],
                queryFn: () => fetchSuperHero(id),
            }
        })
    )
    return (
        <div>
            Dynamic Parallel Page
        </div>
    )
}
