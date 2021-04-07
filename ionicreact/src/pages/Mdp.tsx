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
  const [password, setPassword] = useState(""); // test: aaa ee ii oo u y
  const [newPassword, setNewPassword] = useState("");
  const [tooFewCharsetsError, setTooFewCharsetsError] = useState(true);
  const [tooShortError, setTooShortError] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [aSelected, setASelected] = useState<string>("4");
  const [eSelected, setESelected] = useState<string>("3");
  const [iSelected, setISelected] = useState<string>("1");
  const [oSelected, setOSelected] = useState<string>("0");
  const [uSelected, setUSelected] = useState<string>("[");
  const [ySelected, setYSelected] = useState<string>("7");
  const [spaceSelected, setSpaceSelected] = useState<string>("-");

  const [processA, setProcessA] = useState(true);
  const [processE, setProcessE] = useState(true);
  const [processI, setProcessI] = useState(true);
  const [processO, setProcessO] = useState(true);
  const [processU, setProcessU] = useState(true);
  const [processY, setProcessY] = useState(true);
  const [deleteSpaces, setDeleteSpaces] = useState(true);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current.setFocus(), 1000);
  });

  useEffect(() => {
    //console.log(`useEffect characters ${JSON.stringify(characters[0])} `);
    //Replace characters
    const replaceChars = () => {
      let source: string = password; //.toLocaleLowerCase();
      /* TODO characters.map((character) => {
        for (let i = 0; i < source.length; i++) {
          console.log(`useEffect for ${character.name} ${character.selected} `);
          source = source.replace(character.name, character.selected);
        }
        return "ok";
      });*/

      for (let i = 0; i < source.length; i++) {
        if (!processA) source = source.replace("a", aSelected);
        if (!processE) source = source.replace("e", eSelected);
        if (!processI) source = source.replace("i", iSelected);
        if (!processO) source = source.replace("o", oSelected);
        if (!processU) source = source.replace("u", uSelected);
        if (!processY) source = source.replace("y", ySelected);
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
  }, [
    characters,
    password,
    aSelected,
    eSelected,
    iSelected,
    oSelected,
    uSelected,
    ySelected,
    spaceSelected,
    deleteSpaces,
    processA,
    processE,
    processI,
    processO,
    processU,
    processY,
  ]);

  const changeASelected = (e: string) => {
    setASelected(e);
  };
  const changeESelected = (e: string) => {
    setESelected(e);
  };
  const changeISelected = (e: string) => {
    setISelected(e);
  };
  const changeOSelected = (e: string) => {
    setOSelected(e);
  };
  const changeUSelected = (e: string) => {
    setUSelected(e);
  };
  const changeYSelected = (e: string) => {
    setYSelected(e);
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
  const copyRandomToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
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
              <IonButton
                color="success"
                onClick={() => copyRandomToClipboard()}
              >
                <IonIcon color="light" icon={clipboard}></IonIcon>
                <IonText className="ion-text-lowercase">Copier</IonText>
              </IonButton>
              <IonText color="success">
                &nbsp;Copier dans le presse-papiers.
              </IonText>
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
                      <IonIcon color="light" icon={clipboard}></IonIcon>
                      <IonText className="ion-text-lowercase">Copier</IonText>
                    </IonButton>
                    <IonText color="success">
                      &nbsp;Copier dans le presse-papiers.&nbsp;
                      <br />
                      Respecte la complexité requise de 3 jeux de caractères
                      distincts.
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

            {/* a */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>{`${textReplace}`} "a"?</h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonToggle
                      slot="start"
                      checked={processA}
                      onIonChange={(e) => setProcessA(e.detail.checked)}
                    />
                    <IonLabel>Désactivé &nbsp;</IonLabel>
                  </IonItem>

                  {processA ? null : (
                    <>
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
                                <IonLabel>4&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="4"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>

                            <IonCol>
                              <IonItem>
                                <IonLabel>@&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="@"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                            <IonCol>
                              <IonItem>
                                <IonLabel>A&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="A"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>
                      </IonButtons>
                    </>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* e */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>{`${textReplace}`} "e"?</h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonToggle
                      slot="start"
                      checked={processE}
                      onIonChange={(e) => setProcessE(e.detail.checked)}
                    />
                    <IonLabel>Désactivé &nbsp;</IonLabel>
                  </IonItem>

                  {processE ? null : (
                    <>
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
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="3"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>

                            <IonCol>
                              <IonItem>
                                <IonLabel>€&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="€"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                            <IonCol>
                              <IonItem>
                                <IonLabel>E&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="E"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>
                      </IonButtons>
                    </>
                  )}
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
                  <IonItem>
                    <IonToggle
                      slot="start"
                      checked={processI}
                      onIonChange={(e) => setProcessI(e.detail.checked)}
                    />
                    <IonLabel>Désactivé &nbsp;</IonLabel>
                  </IonItem>

                  {processI ? null : (
                    <>
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
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="1"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                            <IonCol>
                              <IonItem>
                                <IonLabel>!&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="!"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                            <IonCol>
                              <IonItem>
                                <IonLabel>I&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="I"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>
                      </IonButtons>
                    </>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            {/* o */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>{`${textReplace}`} "o"?</h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonToggle
                      slot="start"
                      checked={processO}
                      onIonChange={(e) => setProcessO(e.detail.checked)}
                    />
                    <IonLabel>Désactivé &nbsp;</IonLabel>
                  </IonItem>

                  {processO ? null : (
                    <>
                      <IonLabel>
                        <h2>{`${textSubstition}`}</h2>
                      </IonLabel>
                      <IonButtons>
                        <IonRadioGroup
                          value={oSelected}
                          onIonChange={(e) => changeOSelected(e.detail.value)}
                        >
                          <IonRow>
                            <IonCol>
                              <IonItem>
                                <IonLabel>0&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="0"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>

                            <IonCol>
                              <IonItem>
                                <IonLabel>*&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="*"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>

                            <IonCol>
                              <IonItem>
                                <IonLabel>%&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="%"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>
                      </IonButtons>
                    </>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* u */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>{`${textReplace}`} "u"?</h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonToggle
                      slot="start"
                      checked={processU}
                      onIonChange={(e) => setProcessU(e.detail.checked)}
                    />
                    <IonLabel>Désactivé &nbsp;</IonLabel>
                  </IonItem>

                  {processU ? null : (
                    <>
                      <IonLabel>
                        <h2>{`${textSubstition}`}</h2>
                      </IonLabel>
                      <IonButtons>
                        <IonRadioGroup
                          value={uSelected}
                          onIonChange={(e) => changeUSelected(e.detail.value)}
                        >
                          <IonRow>
                            <IonCol>
                              <IonItem>
                                <IonLabel>[&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="["
                                ></IonRadio>
                              </IonItem>
                            </IonCol>

                            <IonCol>
                              <IonItem>
                                <IonLabel>(&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="("
                                ></IonRadio>
                              </IonItem>
                            </IonCol>

                            <IonCol>
                              <IonItem>
                                <IonLabel>U&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="U"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>
                      </IonButtons>
                    </>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* y */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>{`${textReplace}`} "y"?</h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonToggle
                      slot="start"
                      checked={processY}
                      onIonChange={(e) => setProcessY(e.detail.checked)}
                    />
                    <IonLabel>Désactivé &nbsp;</IonLabel>
                  </IonItem>

                  {processY ? null : (
                    <>
                      <IonLabel>
                        <h2>{`${textSubstition}`}</h2>
                      </IonLabel>
                      <IonButtons>
                        <IonRadioGroup
                          value={ySelected}
                          onIonChange={(e) => changeYSelected(e.detail.value)}
                        >
                          <IonRow>
                            <IonCol>
                              <IonItem>
                                <IonLabel>7&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="7"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>

                            <IonCol>
                              <IonItem>
                                <IonLabel>^&nbsp;</IonLabel>
                                <IonRadio
                                  mode="md"
                                  item-left
                                  value="Y"
                                ></IonRadio>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>
                      </IonButtons>
                    </>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            {/* space */}
            <IonCol>
              <IonCard className="category-card">
                <IonCardHeader>
                  <IonLabel>
                    <h2>Remplacer les espaces?</h2>
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonToggle
                      slot="start"
                      checked={deleteSpaces}
                      onIonChange={(e) => setDeleteSpaces(e.detail.checked)}
                    />
                    <IonLabel>Supprimer les espaces &nbsp;</IonLabel>
                  </IonItem>
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
