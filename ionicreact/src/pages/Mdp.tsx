import React, { useState } from 'react';
import { IonToggle, IonIcon,IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import { calendarOutline, hammer, moonOutline, help, informationCircleOutline, logIn, logOut, mapOutline, peopleOutline, person, personAdd } from 'ionicons/icons';

import './Mdp.scss';
import { connect } from '../data/connect';
import { setDarkMode } from '../data/user/user.actions';
import { RouteComponentProps } from 'react-router';
import generateur from 'generate-password';

//interface OwnProps extends RouteComponentProps {}

interface StateProps {
  darkMode: boolean;
}
interface DispatchProps {
  setDarkMode: typeof setDarkMode;
}
//interface MdpProps extends OwnProps, StateProps, DispatchProps { }
interface MdpProps extends StateProps, DispatchProps { }

const Mdp: React.FC<MdpProps> = ({darkMode, setDarkMode}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const mdp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
      //await setIsLoggedIn(true);
      //history.push('/tabs/schedule', {direction: 'none'});
    }
  };
  function handleChangePwd() {

    console.log('handleChangePwd');
  }
  return (
    <IonPage id="mdp-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton><div className="mdp-logo">
          <img src="assets/img/appicon.png" alt="logo CASA" />
        </div></IonMenuButton>
          </IonButtons>
          <IonTitle>Générateur de mot de passe</IonTitle>
          <IonItem>
            <IonIcon slot="start" icon={moonOutline}></IonIcon>
            <IonLabel>Thème sombre</IonLabel>
            <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>



        <form noValidate onSubmit={mdp}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            <div className="container">
                    <strong>Mot de passe aléatoire proposé:</strong>
                    <p>
                      {generateur.generate({
                length: 12,
                numbers: true,
                lowercase: true,
                uppercase: true,
                excludeSimilarCharacters: true,
                strict: true
              })}
              </p>
              <strong>Votre mot de passe personnalisé:</strong>


                <IonInput
                  onIonChange={handleChangePwd}
                  name="password"

                  value={password}
                  required>
                 </IonInput> <IonLabel>Trop court</IonLabel>
              </div>


            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Mdp</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

//export default connect<OwnProps, StateProps, DispatchProps>({
export default connect<{}, StateProps, DispatchProps>({
    mapStateToProps: (state) => ({
    darkMode: state.user.darkMode
  }),
  mapDispatchToProps: {
    setDarkMode
  },
  component: Mdp
})
