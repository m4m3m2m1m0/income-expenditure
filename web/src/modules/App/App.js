import './App.css';
import { lazy, Suspense } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Navbar from '../Navbar/navbar.component';
import { QueryClient, QueryClientProvider } from 'react-query';
import routes from '../Routing/routes';
import AuthorizedRoute from '../Routing/AuthorizedRoute';
import PublicRoute from '../Routing/PublicRoute';
import AuthContextProvider, { AuthContext } from '../../contexts/auth.context';
import ApiClient from '../../shared/components/api-client.component';

const { Header, Content, Footer } = Layout;

const queryClient = new QueryClient();

const routeComponents = routes.map((routeConfig, index) => {
  let RouteComponent;
  const component = lazy(routeConfig.loader);
  switch (routeConfig.type) {
    case 'authed':
      RouteComponent = AuthorizedRoute;
      break;
    case 'public':
    default:
      RouteComponent = PublicRoute;
      break;
  }

  return <RouteComponent key={index} component={component} {...routeConfig} />;
});

const App = () => {
  return (
    <AuthContextProvider>
      <ApiClient authContext={AuthContext}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Content>
              <Router>
                <Header>
                  <Navbar />
                </Header>
                <Suspense fallback={<div></div>}>
                  <Switch>
                    {routeComponents}
                    <Redirect to="/" />
                  </Switch>
                </Suspense>
              </Router>
            </Content>
            <Footer>
              &copy; {new Date().getFullYear()} Income/Expenditure
            </Footer>
          </Layout>
        </QueryClientProvider>
      </ApiClient>
    </AuthContextProvider>
  );
};

export default App;
