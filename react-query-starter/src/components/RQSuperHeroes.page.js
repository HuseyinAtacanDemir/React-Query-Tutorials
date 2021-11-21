import { useQuery } from "react-query"
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  const {
    isLoading,
    isFetching,
    data,
    isError,
    error,
    refetch//function returned by useQuery to manually fetch data
  } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      //cacheTime: 5000,//default is 5 minutes, here for demo purposes we made it 5 sec
      //staleTime: 30000, // default stale time is 0, so at each visit a new fetch is made 
      //refetchOnMount: false, //default true
      //refetchOnWindowFocus: false //defualt true, whenever the window is focused
      //refetchInterval: 5000, //refetch pauses if not focused
      //refetchIntervalInBackground: true //now polling is available even when browser is not in focus 
      enabled: false //do not fetch automatically on mount
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
          <button onClick={refetch}>Fetch Data</button>
          {data?.data.map(hero => <div key={hero.name}>{hero.name}</div>)}
        </>)
  )
}
