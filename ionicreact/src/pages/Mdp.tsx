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
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardContent,
  IonCard,
  IonLabel,
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonRange,
  IonFabButton,
  IonText,
} from "@ionic/react";
import {
  sunny,
  moon,
} from "ionicons/icons";

import "./Mdp.scss";
import { connect } from "../data/connect";
import { setDarkMode } from "../data/user/user.actions";
import generateur from "generate-password";

interface StateProps {
  darkMode: boolean;
}
interface DispatchProps {
  setDarkMode: typeof setDarkMode;
}

interface MdpProps extends StateProps, DispatchProps {}

const Mdp: React.FC<MdpProps> = ({ darkMode, setDarkMode }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [tooShortError, setTooShortError] = useState(false);

  const [eOccurences, setEOccurences] = useState(0);
  const [aOccurences, setAOccurences] = useState(0);

  const replaceChars = () => {
    let source: string = password.toLocaleLowerCase();
    for (let i = 0; i < eOccurences; i++) {
      source = source.replace("e", "€");
    }
    for (let i = 0; i < aOccurences; i++) {
      source = source.replace("a", "@");
    }

    console.log(`replaceWithEuro e source ${source} `);
    setNewPassword(source);

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
                <strong>Saisissez votre mot de passe personnalisé:</strong>
                <IonInput
                  onIonChange={(e) => handleChangePwd(e.detail.value!)} //{handleChangePwd}
                  name="password"
                  value={password}
                  required
                ></IonInput>{" "}
                <strong>Votre mot de passe sécurisé:</strong>
                <IonInput name="newPassword" value={newPassword}></IonInput>
              </div>
            </IonItem>

            {/* {passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Erreur</p>
              </IonText>
            )} */}
            {tooShortError && (
              <IonText color="warning">
                <p className="ion-padding-start">Trop court</p>
              </IonText>
            )}
            {formSubmitted && passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Texte requis</p>
              </IonText>
            )}
          </IonList>
        </form>
        <IonGrid fixed>
          <IonRow>
            {/* e */}
            <IonCol size="4">
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>
                      Remplacer la lettre "e"
                      <br /> nombre d'occurences:{" "}
                      <IonRange
                        min={0}
                        max={10}
                        pin={true}
                        value={eOccurences}
                        onIonChange={(e) =>
                          setEOccurences(e.detail.value as number)
                        }
                      />{" "}
                      Choisissez le caractère de substitution:
                    </h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonButtons>
                    <IonFabButton
                      color="instagram"
                      onClick={() => replaceChars()}
                    >
                      <IonIcon slot="icon-only" color="warning" />
                      <IonLabel>€</IonLabel>
                    </IonFabButton>

                    {/* <IonButton onClick={() => replaceWithEuro()}>
                      <IonIcon slot="icon-only" icon={logoEuro}></IonIcon>
                    </IonButton> */}
                  </IonButtons>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* a */}
            <IonCol size="4">
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>
                      Remplacer la lettre "a"
                      <br /> nombre d'occurences:{" "}
                      <IonRange
                        min={0}
                        max={10}
                        pin={true}
                        value={aOccurences}
                        onIonChange={(e) =>
                          setAOccurences(e.detail.value as number)
                        }
                      />{" "}
                      Choisissez le caractère de substitution:
                    </h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonButtons>
                    <IonFabButton
                      color="instagram"
                      onClick={() => replaceChars()}
                    >
                      <IonIcon slot="icon-only" color="warning" />
                      <IonLabel>@</IonLabel>
                    </IonFabButton>


                  </IonButtons>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* <IonRow>
          <IonCol></IonCol>
          <IonCol></IonCol>
          <IonCol>
            <IonButton type="submit" expand="block">
              Copier
            </IonButton>
          </IonCol>
        </IonRow> */}

        <IonLabel>
          <p>Version Alpha 1.0.20210330</p>
        </IonLabel>
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
