import { useQuery } from "react-query"
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  const {
    isLoading,
    data,
    isError,
    error
  } = useQuery('super-heroes', fetchSuperHeroes);

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
