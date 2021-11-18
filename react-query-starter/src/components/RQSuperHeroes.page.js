import { useQuery } from "react-query"
import axios from "axios";


export const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery('super-heroes', async () => {
    await new Promise(res => setTimeout(res, 1000));
    return axios.get('http://localhost:4000/superheroes')
  });

  return isLoading ?
    (<h2>Loading</h2>)
    :
    (
      <>
        <h2>React Query Super Heroes Page</h2>
        {data?.data.map((hero) => (
          <div key={hero.name}>{hero.name}</div>
        ))}
      </>
    )
}
