import React from 'react'
import { Router} from 'dva/router';
import routes from './router.config';
import RouterView from './RouterView';
function RouterConfig({history}){
return (
    <Router history={history}>
        <RouterView routes={routes.routes}></RouterView>
    </Router>
)
}
export default RouterConfig