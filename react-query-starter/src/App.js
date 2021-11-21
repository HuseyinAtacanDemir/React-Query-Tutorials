import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { HWComponent } from './components/HWComponent';
import { RQSuperHero } from './components/RQSuperHero';
import { ParallelQueries } from './components/ParallelQueries.page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/super-heroes'>Traditional Super Heroes</Link></li>
              <li><Link to='/rq-super-heroes'>RQ Super Heroes</Link></li>
              <li><Link to='/hw-component'>HW Component</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route path='/super-heroes' component={SuperHeroesPage} />
            <Route path='/rq-super-heroes/:heroId' component={RQSuperHero} />
            <Route path='/rq-super-heroes' component={RQSuperHeroesPage} />
            <Route path='/hw-component' component={HWComponent} />
            <Route path='/parallel-queries' component={ParallelQueries} />

            <Route path='/' component={HomePage} />
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App
