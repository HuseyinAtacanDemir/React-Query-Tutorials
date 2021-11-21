import React from 'react'
import { useSuperHeroesData } from '../hooks/useSuperHeroesData'

export const HWComponent = () => {

    const onSuccess = (data) => {
        console.log('refetch success', data)
    }
    const onError = (err) => {
        console.log('refetch err', err)
    }
    const {
        data,
        isError,
        error,
        isLoading,
        refetch } = useSuperHeroesData({
            onSuccess,
            onError,
            refetchOnMount: true,
            refetchOnWindowFocus: false,

        });
    return (
        isLoading ? <div>Loading...</div>
            :
            isError ? <div>{error}</div>
                :
                <>
                    <button onClick={refetch}>Refetch Data</button>
                    {data?.map(heroName => (
                        <div key={heroName}>{heroName}</div>
                    ))}
                </>
    )
}
