// TODO: Decide on routes and add them here
const Routes = {
    admin: {
      root: '/',
      home: '/campaings',
      login: '/campaings',
      campaings: {
        root: '/campaings',
        defaultPath: '/edit',
        list: '/edit',
      },
    },
  };
  
  export default Routes;
  