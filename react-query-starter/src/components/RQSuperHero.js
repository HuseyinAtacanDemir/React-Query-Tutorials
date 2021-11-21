import React from 'react'
import { useParams } from 'react-router-dom'

import { useSuperHeroData } from '../hooks/useSuperHeroData'

export const RQSuperHero = () => {

    const { heroId } = useParams()
    const { isLoading, data, isError, error } = useSuperHeroData(heroId)
    return (
        isLoading ? (<div>Loading...</div>)
            :
            isError ? <div>{error.message}</div>
                :
                <div>{data?.data.name} - {data?.data.alterEgo}</div>

    )
}

