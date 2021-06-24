import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import LookbookList from './views/lookbook/LookbookList';
import LookbookDetails from './views/lookbook/LookbookDetails';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function App() {

  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1">Campaings</Menu.Item>
          {/* <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            height: '100%',
            minHeight: 540,
          }}
        >
          <Router>
            <Switch>
              <Route exact path='/campaings' component={LookbookList} />
              <Route exact path='/campaings/edit' component={LookbookDetails} />

               {/* Redirects & Default Routes */}
              <Redirect to='/campaings' />
            </Switch>
          </Router>

        </Content>
      </Layout>
    </Layout>

  );
}

export default App;
