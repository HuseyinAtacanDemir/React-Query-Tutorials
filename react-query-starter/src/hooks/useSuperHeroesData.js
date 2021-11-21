import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

export const useSuperHeroesData = (props) => {
    return useQuery(
        'super-heroes',//unique key
        fetchSuperHeroes,//fetching function
        {//options to tweak the behavior
            //cacheTime: 5000,//default is 5 minutes, here for demo purposes we made it 5 sec
            staleTime: props.staleTime, // default stale time is 0, so at each visit a new fetch is made 
            refetchOnMount: props.refetchOnMount, //default true
            refetchOnWindowFocus: props.refetchOnWindowFocus, //defualt true, whenever the window is focused
            //refetchIntervalInBackground: true //now polling is available even when browser is not in focus 
            enabled: props.enabled, //do not fetch automatically on mount
            //select option allows you to insert a function to do whatever with the data return by the api before feeding that data to the frontend 
            
            refetchInterval: props.refetchInterval, //refetch pauses if not focused
            onSuccess: props.onSuccess,
            onError: props.onError,//since the name of the handle function we defined is the same as the internal name of the field used in react-query implementation, we can just type in the func name
            /* select: (data) => {
                const superHeroNames = data.data.map(hero => hero.name)
                return superHeroNames
            } */
        }
    );
}