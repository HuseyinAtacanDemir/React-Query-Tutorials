import { useState } from 'react'
import { useQuery } from "react-query"
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {

  const [refetchIntervalMs, setRefetchIntervalMs] = useState(3000);

  //react-query injects the data or the err obj to the onSuccess and onError functions
  const onSuccess = (data) => {
    //data.data.length === 6 && setRefetchIntervalMs(false)

    console.log('Side effect on succesful data fetching, refetchInterval: ', data, refetchIntervalMs)
  }
  const onError = (err) => {

    err && setRefetchIntervalMs(0)

    console.log('Side effect on data fetch error, refetchInterval: ', refetchIntervalMs, err)
  }
  const {
    isLoading,
    isFetching,
    data,
    isError,
    error,
    //refetch,//function returned by useQuery to manually fetch data
  } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      //cacheTime: 5000,//default is 5 minutes, here for demo purposes we made it 5 sec
      //staleTime: 30000, // default stale time is 0, so at each visit a new fetch is made 
      //refetchOnMount: false, //default true
      //refetchOnWindowFocus: false //defualt true, whenever the window is focused
      refetchInterval: refetchIntervalMs, //refetch pauses if not focused
      //refetchIntervalInBackground: true //now polling is available even when browser is not in focus 
      //enabled: false //do not fetch automatically on mount
      onSuccess,
      onError,//since the name of the handle function we defined is the same as the internal name of the field used in react-query implementation, we can just type in the func name
      //select option allows you to insert a function to do whatever with the data return by the api before feeding that data to the frontend 
      select: (data) => {
        const superHeroNames = data.data.map(hero => hero.name)
        return superHeroNames
      }
    }
  );

  console.log({ isLoading, isFetching })

  return (
    isLoading ? <h2>Loading</h2>
      :
      isError ? <h2>{error.message}</h2>
        :
        (<>
          <h2>React Query Super Heroes Page</h2>
          {/*<button onClick={refetch}>Fetch Data</button>*/}
          {/*data?.data.map(hero => <div key={hero.name}>{hero.name}</div>)*/}
          {data.map(heroName => (<div key={heroName}>{heroName}</div>))}
        </>)
  )
}
