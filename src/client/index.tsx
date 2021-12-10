import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { io } from 'socket.io-client';
import { Messages } from './Components/Messages';
import { Home } from './Components/Home';
import { UI } from './Components/UI';
import { Header } from './Components/Header';
import { Navigation } from './Components/Navigation';
import { theme } from './theme';
import { AppData, MessageState } from '../model';

const defaultAppData: AppData = {
  messages: [],
  elements: {
    ticker: {
      show: false
    }
  }
};

const App = () => {
  const [socket, setSocket] = useState<any>(null);
  const [appData, setAppData] = useState<AppData>(defaultAppData);

  useEffect(() => {
    const messageListener = (message: any) => {
      console.log(`received message: ${JSON.stringify(message)}`);
    };
    const dataUpdateListener = (data: AppData) => {
      console.log(`received dataUpdate: ${JSON.stringify(data)}`);
      setAppData(data);
    };

    console.log('initialising io..');
    const newSocket = io(`http://${window.location.hostname}:8080`);
    setSocket(newSocket);

    newSocket.on('dataUpdate', dataUpdateListener);
    newSocket.on('message', messageListener);

    return () => {
      newSocket.off('message', messageListener);
      newSocket.off('dataUpdate', messageListener);
      newSocket.close();
    };
  }, [setSocket, setAppData]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/messages/arrived">
            <Box sx={{ display: 'flex' }}>
              {Header}
              {Navigation}
              <Messages appData={appData} socket={socket} mode={MessageState.ARRIVED}/>
            </Box>
          </Route>
          <Route path="/messages/showing">
            <Box sx={{ display: 'flex' }}>
              {Header}
              {Navigation}
              <Messages appData={appData} socket={socket} mode={MessageState.SHOWING}/>
            </Box>
          </Route>
          <Route path="/messages/shown">
            <Box sx={{ display: 'flex' }}>
              {Header}
              {Navigation}
              <Messages appData={appData} socket={socket} mode={MessageState.REMOVED}/>
            </Box>
          </Route>
          <Route path="/messages/ignored">
            <Box sx={{ display: 'flex' }}>
              {Header}
              {Navigation}
              <Messages appData={appData} socket={socket} mode={MessageState.IGNORED}/>
            </Box>
          </Route>
          <Route path="/ui">
            <UI appData={appData} />
          </Route>
          <Route path="/">
            <Box sx={{ display: 'flex' }}>
              {Header}
              {Navigation}
              {Home}
            </Box>
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
