import { createRoutesFromElements, Route, useRoutes } from 'react-router-dom'
import App from '../App'
import Hoc from '../pages/hoc'
import Composite from '../pages/composite'
import RenderProps from '../pages/render-props'
import Context from '../pages/context'

const routes = createRoutesFromElements(
  <Route path="/" Component={App}>
    <Route path="/hoc" Component={Hoc}></Route>
    <Route path="/composite" Component={Composite}></Route>
    <Route path="/render-props" Component={RenderProps}></Route>
    <Route path="/context" Component={Context}></Route>
  </Route>
)

export const Router = () => useRoutes(routes)
