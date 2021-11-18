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
    error
  } = useQuery(
    'super-heroes', 
    fetchSuperHeroes, 
    {
      //cacheTime: 5000,//default is 5 minutes, here for demo purposes we made it 5 sec
      staleTime: 30000 // default stale time is 0, so at each visit a new fetch is made 
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
          {data?.data.map(hero => <div key={hero.name}>{hero.name}</div>)}
        </>)
  )
}
