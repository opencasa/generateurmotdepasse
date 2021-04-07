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
import { sunny, moon, clipboard, refresh } from "ionicons/icons";

import "./Mdp.scss";
import { Character } from "../models/Character";
import { connect } from "../data/connect";
import { setDarkMode } from "../data/user/user.actions";
import { setCharacterReplacement } from "../data/character/character.actions";
import generateur from "generate-password";
import CharacterItem from "../components/CharacterItem";

interface StateProps {
  characters: Character[];
  darkMode: boolean;
}
interface DispatchProps {
  setDarkMode: typeof setDarkMode;
  setCharacterReplacement: typeof setCharacterReplacement;
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

const Mdp: React.FC<MdpProps> = ({
  setCharacterReplacement,
  characters,
  darkMode,
  setDarkMode,
}) => {
  const textReplace: string = "Remplacer la lettre ";
  const textSubstition: string = "Choisissez le caractère de substitution :";
  const [generatedPassword, setGeneratedPassword] = useState(
    generatePassword()
  );
  const [password, setPassword] = useState(""); // test: aaa eee iii ooo
  const [newPassword, setNewPassword] = useState("");
  const [tooFewCharsetsError, setTooFewCharsetsError] = useState(true);
  const [tooShortError, setTooShortError] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [eSelected, setESelected] = useState<string>("3");
  const [iSelected, setISelected] = useState<string>("1");
  const [spaceSelected, setSpaceSelected] = useState<string>("-");

  const [deleteSpaces, setDeleteSpaces] = useState(false);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current.setFocus(), 1000);
  });

  useEffect(() => {
    console.log(`useEffect characters ${JSON.stringify(characters[0])} `);
    //Replace characters
    const replaceChars = () => {
      let source: string = password; //.toLocaleLowerCase();
      characters.map((character) => {
        for (let i = 0; i < source.length; i++) {
          console.log(`useEffect for ${character.name} ${character.selected} `);
          source = source.replace(character.name, character.selected);
        }
        return "ok";
      });

      for (let i = 0; i < source.length; i++) {
        source = source.replace("e", eSelected);
        source = source.replace("i", iSelected);
        if (deleteSpaces) {
          source = source.replace(" ", "");
        } else {
          source = source.replace(" ", spaceSelected);
        }
      }

      setTooShortError(source.length < 12);

      /* 4 charsets const strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
      );
      const mediumRegex = new RegExp(
        "^( ((?=.*[a-z])(?=.*[A-Z])) | ((?=.*[a-z])(?=.*[0-9])) | ((?=.*[A-Z])(?=.*[0-9])) ) (?=.{4,})"
      );

      3 charsets */
      const strongRegex = new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]))|((?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]))|((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])))(?=.{4,})"
      );
      if (strongRegex.test(source)) {
        //console.log(`replaceChars strongRegex ${source} `);
        setTooFewCharsetsError(false);
      } else {
        //console.log(`replaceChars too few charsets ${source} `);
        setTooFewCharsetsError(true);
      }

      setNewPassword(source);
    };
    replaceChars();
  }, [characters, password, eSelected, iSelected, spaceSelected, deleteSpaces]);

  const changeESelected = (e: string) => {
    setESelected(e);
  };
  const changeISelected = (e: string) => {
    setISelected(e);
  };
  const changeSpaceSelected = (e: string) => {
    setSpaceSelected(e);
  };
  const handleChangePwd = (e: string) => {
    setPassword(e);
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
              <form noValidate>
                {" "}
                <IonInput
                  className="mdp-input"
                  color={
                    tooShortError && tooFewCharsetsError ? "black" : "success"
                  }
                  onIonChange={(e) => handleChangePwd(e.detail.value!)}
                  name="password"
                  value={password}
                  ref={(ref) => (inputRef.current = ref)}
                  required
                ></IonInput>{" "}
              </form>
            </IonCol>
            <IonCol></IonCol>
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
                className={
                  tooShortError
                    ? "mdp-input-tooshort"
                    : tooFewCharsetsError
                    ? "mdp-input-toofewcharsets"
                    : "mdp-input-valid"
                }
                name="newPassword"
                readonly
                value={newPassword}
              ></IonInput>
            </IonCol>
            <IonCol>
              {tooFewCharsetsError && (
                <IonText color="danger">
                  * 3 jeux de caractères requis parmi minuscules, majuscules,
                  chiffres, symboles.&nbsp;
                </IonText>
              )}
              {tooShortError ? (
                <IonText color="warning">
                  <br />* Trop court (12 caractères minimum).&nbsp;
                </IonText>
              ) : (
                !tooFewCharsetsError && (
                  <>
                    <IonButton
                      color="success"
                      onClick={() => copyToClipboard()}
                    >
                      <IonIcon color="light" icon={clipboard}></IonIcon><IonText className="ion-text-lowercase" >
                    Copier
                    </IonText>
                    </IonButton>
                    <IonText color="success">
                    &nbsp;Copier dans le presse-papiers.&nbsp;<br/>Respecte la complexité requise de 3 jeux de
                      caractères distincts.
                    </IonText>
                  </>
                )
              )}
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
            {characters.map((character) => (
              <IonCol key={character.id}>
                <CharacterItem
                  character={character}
                  onSetCharacterReplacement={setCharacterReplacement}
                />
              </IonCol>
            ))}

            {/* e */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>{`${textReplace}`} "e"?</h2>
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

            {/* i */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>{`${textReplace}`} "i"?</h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel>
                    <h2>{`${textSubstition}`}</h2>
                  </IonLabel>
                  <IonButtons>
                    <IonRadioGroup
                      value={iSelected}
                      onIonChange={(e) => changeISelected(e.detail.value)}
                    >
                      <IonRow>

                        <IonCol>
                          <IonItem>
                            <IonLabel>1&nbsp;</IonLabel>
                            <IonRadio mode="md" item-left value="1"></IonRadio>
                          </IonItem>
                        </IonCol>
                        <IonCol>
                          <IonItem>
                            <IonLabel>!&nbsp;</IonLabel>
                            <IonRadio mode="md" item-left value="!"></IonRadio>
                          </IonItem>
                        </IonCol>
                        <IonCol>
                          <IonItem>
                            <IonLabel>|&nbsp;</IonLabel>
                            <IonRadio mode="md" item-left value="|"></IonRadio>
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
                    <h2>Remplacer les espaces?</h2>
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

                          </IonRow>
                        </IonRadioGroup>
                      </IonButtons>
                    </>
                  )}
                  <IonLabel>
                    <h2>
                      Supprimer les espaces &nbsp;
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
          <p>Version 1.0.20210407</p>
        </IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    characters: state.data.characters,
    darkMode: state.user.darkMode,
  }),
  mapDispatchToProps: {
    setDarkMode,
    setCharacterReplacement,
  },
  component: Mdp,
});
