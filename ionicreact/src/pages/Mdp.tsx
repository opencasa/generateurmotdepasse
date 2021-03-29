import React, { useState } from "react";
import {
  IonToggle,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
} from "@ionic/react";
import {
  starOutline,
  star,
  sunny,
  moon,
  personAdd,
} from "ionicons/icons";

import "./Mdp.scss";
import { connect } from "../data/connect";
import { setDarkMode } from "../data/user/user.actions";
import { RouteComponentProps } from "react-router";
import generateur from "generate-password";
import ShareSocialFab from "../components/ShareSocialFab";
//interface OwnProps extends RouteComponentProps {}

interface StateProps {
  darkMode: boolean;
}
interface DispatchProps {
  setDarkMode: typeof setDarkMode;
}
//interface MdpProps extends OwnProps, StateProps, DispatchProps { }
interface MdpProps extends StateProps, DispatchProps {}

const Mdp: React.FC<MdpProps> = ({ darkMode, setDarkMode }) => {
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const isFavorite = false;

  const toggleFavorite = () => {
    //isFavorite = !isFavorite;// ? removeFavorite(post.id) : addFavorite(post.id);
  };
  const mdp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!password) {
      setPasswordError(true);
    }

    if (password) {
      console.log( `mdp ${e}`);
      //await setIsLoggedIn(true);
      //history.push('/tabs/schedule', {direction: 'none'});
    }
  };
  function handleChangePwd() {
    console.log( `handleChangePwd ${password}`);

  }
  return (
    <IonPage id="mdp-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <img src="assets/img/appicon.png" alt="logo CASA" />
          </IonButtons>
          <IonTitle>Générateur de mot de passe</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="start" icon={sunny}></IonIcon>
              <IonToggle
                checked={darkMode}
                onClick={() => setDarkMode(!darkMode)}
              />
              <IonIcon slot="end" icon={moon}></IonIcon>
            </IonButton>
            <IonButton onClick={() => toggleFavorite()}>
              {isFavorite ? (
                <IonIcon slot="icon-only" icon={star}></IonIcon>
              ) : (
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={mdp}>
          <IonList>
            <IonItem>
              <IonInput
                onIonChange={handleChangePwd}
                name="password"
                value={password}
                required
              ></IonInput>{" "}
              <IonLabel>Trop court</IonLabel>
              <div className="container">
                <strong>Mot de passe aléatoire proposé:</strong>
                <p>
                  {generateur.generate({
                    length: 12,
                    numbers: true,
                    lowercase: true,
                    uppercase: true,
                    excludeSimilarCharacters: true,
                    strict: true,
                  })}
                </p>
                <strong>Votre mot de passe personnalisé:</strong>
                <ShareSocialFab />
              </div>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="primary">
                Password
              </IonLabel>
              <IonInput
                name="password"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>

            {formSubmitted && passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Password is required</p>
              </IonText>
            )}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">
                Mdp
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">
                Signup
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
  }),
  mapDispatchToProps: {
    setDarkMode,
  },
  component: Mdp,
});
