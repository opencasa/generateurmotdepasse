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
  IonItem,
  IonInput,
  IonRange,
  IonFabButton,
  IonRadioGroup,
  IonRadio,
  IonToast,
  IonText,
} from "@ionic/react";
import { sunny, moon, clipboard, refresh, checkmarkCircle } from "ionicons/icons";

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
  const [showToast, setShowToast] = useState(false);
  const [eSelected, setESelected] = useState<string>("3");

  const [eOccurences, setEOccurences] = useState(12);
  const [aOccurences, setAOccurences] = useState(12);
  const [spaceOccurences, setSpaceOccurences] = useState(12);

  const textReplace: string = "Remplacer la lettre ";
  const textOccurences: string = " Nombre d'occurences :";
  const textSubstition: string = "Choisissez le caractère de substitution :";

  const replaceChars = () => {
    let source: string = password.toLocaleLowerCase();
    for (let i = 0; i < eOccurences; i++) {
      source = source.replace("e", eSelected);
    }
    for (let i = 0; i < aOccurences; i++) {
      source = source.replace("a", "@");
    }
    for (let i = 0; i < spaceOccurences; i++) {
      source = source.replace(" ", "-");
    }
    if (source.length === 0) {
      setPasswordError(true);
    }
    setTooShortError(source.length < 12);

    console.log(`replaceWithEuro e source ${source} `);
    setNewPassword(source);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`submit ${password}`);
    setFormSubmitted(true);
  };
  const handleChangePwd = async (e: string) => {
    await setPassword(e);
    console.log(`handleChangePwd ${password} ${e}`);
    replaceChars();
  };
  const copyToClipboard = async () => {
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
              {/* <IonList>
                  <IonItem>
                <div className="container"> */}
              <strong>Mot de passe aléatoire proposé:</strong>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p>
                {generateur.generate({
                  length: 12,
                  numbers: true,
                  lowercase: true,
                  uppercase: true,
                  symbols: true,
                  excludeSimilarCharacters: true,
                  strict: true,
                })}
              </p>
            </IonCol>
            <IonCol>
              <IonButton color="success" >
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
                  onIonChange={(e) => handleChangePwd(e.detail.value!)} //class="mdp-input" color="light"
                  name="password"
                  value={password}
                  required
                ></IonInput>{" "}
              </form>
            </IonCol>
            <IonCol>
              <IonButton  color="success" type="submit" >
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
              {/* </div>
                  </IonItem> */}

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
              {/* </IonList> */}
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
                    <h2>
                      {`${textReplace}`} "e"
                      <br />
                      {`${textOccurences}`}
                      <IonRange
                        min={0}
                        max={12}
                        pin={true}
                        value={eOccurences}
                        onIonChange={(e) =>
                          setEOccurences(e.detail.value as number)
                        }
                      />
                      {`${textSubstition}`}
                    </h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonButtons>
                    {/* <IonButton onClick={() => toggleFavorite()}>
              {isFavorite ?
                <IonIcon slot="icon-only" icon={star}></IonIcon> :
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              }
            </IonButton> */}

                    <IonRadioGroup
                      value={eSelected}
                      onIonChange={(e) => setESelected(e.detail.value)}
                    >
                      <IonRow>
                        <IonCol>
                          {eSelected === "3" ? (
                            <IonItem>
                              <IonFabButton
                                color="primary"
                                onClick={() => replaceChars()}
                              >
                                <IonIcon color="warning" />
                                <IonLabel>3</IonLabel>
                                <IonRadio item-left value="3" />
                              </IonFabButton>
                            </IonItem>
                          ) : (
                            <IonItem onClick={() => replaceChars()}>
                              <IonLabel>3&nbsp;</IonLabel>
                              <IonRadio
                                mode="md"
                                item-left
                                value="3"
                              ></IonRadio>
                            </IonItem>
                          )}
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

                    <IonRadioGroup
                      value={eSelected}
                      onIonChange={(e) => setESelected(e.detail.value)}
                    >
                      <IonItem>
                        <IonFabButton
                          color="primary"
                          onClick={() => replaceChars()}
                        >
                          <IonIcon color="warning" />
                          <IonLabel>3</IonLabel>
                          <IonRadio item-left value="3" />
                        </IonFabButton>
                      </IonItem>

                      <IonItem item-left>
                        <IonFabButton
                          color="instagram"
                          onClick={() => replaceChars()}
                        >
                          <IonIcon slot="icon-only" color="warning" />
                          <IonLabel>€</IonLabel>
                          <IonRadio item-left value="€" />
                        </IonFabButton>
                      </IonItem>

                      <IonItem>
                        <IonFabButton
                          color="secondary"
                          onClick={() => replaceChars()}
                        >
                          <IonIcon slot="icon-only" color="warning" />
                          <IonLabel>é</IonLabel>
                          <IonRadio item-left value="é" />
                        </IonFabButton>
                      </IonItem>
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
                    <h2>
                      {`${textReplace}`} "a"
                      <br /> {`${textOccurences}`}
                      <IonRange
                        min={0}
                        max={12}
                        pin={true}
                        value={aOccurences}
                        onIonChange={(e) =>
                          setAOccurences(e.detail.value as number)
                        }
                      />
                      {`${textSubstition}`}
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

            {/* space */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>
                      Que voulez-vous faire des espaces?
                      <IonButton>Les supprimer</IonButton>
                      <br /> {`${textOccurences}`}
                      <IonRange
                        min={0}
                        max={12}
                        pin={true}
                        value={spaceOccurences}
                        onIonChange={(e) =>
                          setSpaceOccurences(e.detail.value as number)
                        }
                      />
                      {`${textSubstition}`}
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
                      <IonLabel>-</IonLabel>
                    </IonFabButton>
                  </IonButtons>
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
