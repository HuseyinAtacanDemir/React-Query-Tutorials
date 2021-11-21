import { useSuperHeroesData } from '../hooks/useSuperHeroesData';


export const RQSuperHeroesPage = () => {


  //react-query injects the data or the err obj to the onSuccess and onError functions
  const onSuccess = (data) => {
    //data.data.length === 6 && setRefetchIntervalMs(false)

    console.log('Side effect on succesful data fetching, refetchInterval: ', data)
  }
  const onError = (err) => {

    //err && setRefetchIntervalMs(0)

    console.log('Side effect on data fetch error, refetchInterval: ', err)
  }
  const {
    isLoading,
    isFetching,
    data,
    isError,
    error,
    //refetch,//function returned by useQuery to manually fetch data
  } = useSuperHeroesData({ onSuccess, onError })

  console.log({ isLoading, isFetching })

  return (
    isLoading ? <h2>Loading</h2>
      :
      isError ? <h2>{error.message}</h2>
        :
        (<>
          <h2>React Query Super Heroes Page</h2>
          {/*
            <button onClick={refetch}>Fetch Data</button>
            data?.data.map(hero => <div key={hero.name}>{hero.name}</div>)
          */}
          {data.map(heroName => (<div key={heroName}>{heroName}</div>))}
        </>)
  )
}
