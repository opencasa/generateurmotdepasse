import React, { useState, useEffect, useRef } from "react";
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
  IonItem,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonToast,
  IonText,
} from "@ionic/react";
import {
  sunny,
  moon,
  clipboard,
  refresh,
  checkmarkCircle,
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

const generatePassword = () => {
  return generateur.generate({
    length: 12,
    numbers: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
    excludeSimilarCharacters: true,
    strict: true,
  });
};

const Mdp: React.FC<MdpProps> = ({ darkMode, setDarkMode }) => {
  const textReplace: string = "Remplacer la lettre ";
  const textSubstition: string = "Choisissez le caractère de substitution :";
  const [generatedPassword, setGeneratedPassword] = useState(
    generatePassword()
  );
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [tooShortError, setTooShortError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [eSelected, setESelected] = useState<string>("3");
  const [aSelected, setASelected] = useState<string>("@");
  const [spaceSelected, setSpaceSelected] = useState<string>("-");

  const [deleteSpaces, setDeleteSpaces] = useState(false);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current.setFocus(), 1000);
  });

  useEffect(() => {
    //Replace characters
    const replaceChars = () => {
      let source: string = password.toLocaleLowerCase();
      for (let i = 0; i < source.length; i++) {
        source = source.replace("e", eSelected);
        source = source.replace("a", aSelected);
        if (deleteSpaces) {
          source = source.replace(" ", "");
        } else {
          source = source.replace(" ", spaceSelected);
        }
      }
      if (source.length === 0) {
        setPasswordError(true);
      }
      setTooShortError(source.length < 12);

      //console.log(`replaceChars source ${source} `);
      setNewPassword(source);
    };
    replaceChars();
  }, [password, eSelected, aSelected, spaceSelected, deleteSpaces]);

  const changeESelected = (e: string) => {
    setESelected(e);
  };
  const changeASelected = (e: string) => {
    setASelected(e);
  };
  const changeSpaceSelected = (e: string) => {
    setSpaceSelected(e);
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`submit ${password}`);
    setFormSubmitted(true);
  };
  const handleChangePwd = (e: string) => {
    setPassword(e);
    //console.log(`handleChangePwd ${password} ${e}`);
    //replaceChars();
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(newPassword);
    setShowToast(true);
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
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <strong>Mot de passe aléatoire proposé:</strong>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p>{generatedPassword}</p>
            </IonCol>
            <IonCol>
              <IonButton
                color="warning"
                onClick={() => setGeneratedPassword(generatePassword())}
              >
                <IonIcon color="light" icon={refresh}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <strong>Saisissez votre mot de passe personnalisé:</strong>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <form noValidate onSubmit={submit}>
                <IonInput
                  onIonChange={(e) => handleChangePwd(e.detail.value!)}
                  name="password"
                  value={password}
                  ref={(ref) => (inputRef.current = ref)}
                  required
                ></IonInput>{" "}
                {tooShortError && (
                  <IonText color="warning">
                    <p className="ion-padding-start">
                      Trop court (12 caractères minimum)
                    </p>
                  </IonText>
                )}
                {formSubmitted && passwordError && (
                  <IonText color="danger">
                    <p className="ion-padding-start">Texte requis</p>
                  </IonText>
                )}
              </form>
            </IonCol>
            <IonCol>
              <IonButton color="success" type="submit">
                <IonIcon color="light" icon={checkmarkCircle}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <strong>
                Votre mot de passe sécurisé, généré avec les options ci-dessous:
              </strong>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput
                name="newPassword"
                readonly
                value={newPassword}
              ></IonInput>
            </IonCol>
            <IonCol>
              <IonButton color="success" onClick={() => copyToClipboard()}>
                <IonIcon color="light" icon={clipboard}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Mot de passe copié dans le presse-papiers."
          color="success"
          duration={300}
        />

        <IonGrid>
          <IonRow>
            {/* e */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>{`${textReplace}`} "e"</h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel>
                    <h2>{`${textSubstition}`}</h2>
                  </IonLabel>
                  <IonButtons>
                    <IonRadioGroup
                      value={eSelected}
                      onIonChange={(e) => changeESelected(e.detail.value)}
                    >
                      <IonRow>
                        <IonCol>
                          <IonItem>
                            <IonLabel>3&nbsp;</IonLabel>
                            <IonRadio mode="md" item-left value="3"></IonRadio>
                          </IonItem>
                        </IonCol>

                        <IonCol>
                          <IonItem>
                            <IonLabel>€&nbsp;</IonLabel>
                            <IonRadio mode="md" item-left value="€"></IonRadio>
                          </IonItem>
                        </IonCol>

                        <IonCol>
                          <IonItem>
                            <IonLabel>é&nbsp;</IonLabel>
                            <IonRadio mode="md" item-left value="é"></IonRadio>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonRadioGroup>
                  </IonButtons>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* a */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>{`${textReplace}`} "a"</h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel>
                    <h2>{`${textSubstition}`}</h2>
                  </IonLabel>
                  <IonButtons>
                    <IonRadioGroup
                      value={aSelected}
                      onIonChange={(e) => changeASelected(e.detail.value)}
                    >
                      <IonRow>
                        <IonCol>
                          <IonItem>
                            <IonLabel>@&nbsp;</IonLabel>
                            <IonRadio mode="md" item-left value="@"></IonRadio>
                          </IonItem>
                        </IonCol>
                        <IonCol>
                          <IonItem>
                            <IonLabel>4&nbsp;</IonLabel>
                            <IonRadio mode="md" item-left value="4"></IonRadio>
                          </IonItem>
                        </IonCol>
                        <IonCol>
                          <IonItem>
                            <IonLabel>à&nbsp;</IonLabel>
                            <IonRadio mode="md" item-left value="à"></IonRadio>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonRadioGroup>
                  </IonButtons>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* space */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>Remplacer les espaces</h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  {deleteSpaces ? null : (
                    <>
                      <IonLabel>
                        <h2>{`${textSubstition}`}</h2>
                      </IonLabel>
                      <IonButtons>
                        <IonRadioGroup
                          value={spaceSelected}
                          onIonChange={(e) =>
                            changeSpaceSelected(e.detail.value)
                          }
                        >
                          <IonRow>
                            <IonCol>
                              <IonItem>
                                <IonLabel>-&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="-"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>

                            <IonCol>
                              <IonItem>
                                <IonLabel>_&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="_"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                            <IonCol>
                              <IonItem>
                                <IonLabel>.&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="."
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                            <IonCol>
                              <IonItem>
                                <IonLabel>+&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="+"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                            <IonCol>
                              <IonItem>
                                <IonLabel>=&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="="
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                            <IonCol>
                              <IonItem>
                                <IonLabel>~&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="~"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>
                      </IonButtons>
                    </>
                  )}
                  <IonLabel>
                    <h2>
                      <br /> Supprimer les espaces &nbsp;
                      <IonToggle
                        checked={deleteSpaces}
                        onIonChange={(e) => setDeleteSpaces(e.detail.checked)}
                      />
                    </h2>
                  </IonLabel>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonLabel>
          <p>Version Alpha 1.0.20210401</p>
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
