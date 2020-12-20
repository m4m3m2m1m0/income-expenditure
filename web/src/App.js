import './App.css';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './modules/Navbar/navbar.component';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout>
      <Content>
        <Router>
          <Header>
            <Navbar />
          </Header>
          <Switch>
            <Route path="/"></Route>
          </Switch>
        </Router>
      </Content>
      <Footer>&copy; {new Date().getFullYear()} Income/Expenditure</Footer>
    </Layout>
  );
};

export default App;
