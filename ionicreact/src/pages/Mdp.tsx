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
  textOutline,
  logoEuro,
  logoUsd,
  logoYen,
  sunny,
  moon,
  text,
} from "ionicons/icons";

import "./Mdp.scss";
import { connect } from "../data/connect";
import { setDarkMode } from "../data/user/user.actions";
import generateur from "generate-password";
import ShareSocialFab from "../components/ShareSocialFab";

interface StateProps {
  darkMode: boolean;
}
interface DispatchProps {
  setDarkMode: typeof setDarkMode;
}

interface MdpProps extends StateProps, DispatchProps {}

const Mdp: React.FC<MdpProps> = ({ darkMode, setDarkMode }) => {
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [tooShortError, setTooShortError] = useState(false);
  const isFavorite = true;

  const toggleFavorite = () => {
    //isFavorite = !isFavorite;// ? removeFavorite(post.id) : addFavorite(post.id);
  };
  const replaceWithEuro = () => {
    let source:string = password;
    console.log(`replaceWithEuro b source ${source} `);
    for (let i = 0; i < 3; i++) {
      source = source.replace('3','€');
      console.log(`replaceWithEuro f source ${source} `);
    }
    console.log(`replaceWithEuro e source ${source} `);
    setPassword(source);
    /*if (password) {
      setPassword(password.replace('3','€').replace('3','&'));

    }*/
  };
  const mdp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`mdp ${password}`);
    setFormSubmitted(true);

    if (!password) {
      setPasswordError(true);
    }

    if (password) {
      //await setIsLoggedIn(true);
      //history.push('/tabs/schedule', {direction: 'none'});
    }
  };
  const handleChangePwd = async (e: string) => {
    await setPassword(e);
    console.log(`handleChangePwd ${password} ${e}`);
    if (!password) {
      setPasswordError(true);
    } else {
      setTooShortError(password.length < 12);
      /*if (password.length<12) {
        setTooShortError(true);
      } else {
        setTooShortError(false);
      }*/
    }
  };
  return (
    <IonPage id="mdp-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <img src="assets/img/appicon.png" alt="logo CASA" />
          </IonButtons>
          <IonTitle>Générateur de mot de passe</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setDarkMode(!darkMode)}>
              <IonIcon slot="start" icon={sunny}></IonIcon>
              <IonToggle checked={darkMode} />
              <IonIcon slot="end" icon={moon}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={mdp}>
          <IonList>
            <IonItem>
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
                <IonInput
                  onIonChange={(e) => handleChangePwd(e.detail.value!)} //{handleChangePwd}
                  name="password"
                  value={password}
                  required
                ></IonInput>{" "}
              </div>
            </IonItem>

            {/* <IonItem>

              <IonInput
                name="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem> */}
            {passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Erreur</p>
              </IonText>
            )}
            {tooShortError && (
              <IonText color="warning">
                <p className="ion-padding-start">Trop court</p>
              </IonText>
            )}
            {formSubmitted && passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Password is required</p>
              </IonText>
            )}
          </IonList>

          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButtons>
                <IonButton onClick={() => toggleFavorite()}>
                  {isFavorite ? (
                    <IonIcon slot="icon-only" icon={text}></IonIcon>
                  ) : (
                    <IonIcon slot="icon-only" icon={textOutline}></IonIcon>
                  )}
                </IonButton>
                <IonButton onClick={() => toggleFavorite()}>
                  <IonIcon slot="icon-only" icon={logoYen}></IonIcon>
                </IonButton>
                <IonButton onClick={() => toggleFavorite()}>
                  <IonIcon slot="icon-only" icon={logoEuro}></IonIcon>
                </IonButton>
                <IonButton onClick={() => toggleFavorite()}>
                  <IonIcon slot="icon-only" icon={logoUsd}></IonIcon>
                </IonButton>
                <ShareSocialFab />
              </IonButtons>
            </IonCol>
            <IonCol>
              <IonButton type="submit" expand="block">
                3
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="light" expand="block"  onClick={() => replaceWithEuro()}>
                <IonIcon slot="icon-only" icon={logoEuro}></IonIcon>
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
