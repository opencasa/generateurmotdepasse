import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { LoginType, Providers } from '@microsoft/mgt-element';
import { MsalProvider } from '@microsoft/mgt-msal-provider';
import {config} from './env';

// env.ts
Providers.globalProvider = new MsalProvider({
  clientId: config.clientId,
  scopes: config.scopes,
  authority: config.authority,
  loginType: LoginType.Redirect // LoginType.Popup or LoginType.Redirect (redirect is default)
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
