import React, { useState} from "react";
import { Character } from "../models/Character";
import {
  IonCard,
  IonRow,
  IonCol,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonButtons,
  IonCardContent,
} from "@ionic/react";

interface CharacterItemProps {
  character: Character;
}

const textReplace: string = "Remplacer la lettre ";
const textSubstition: string = "Choisissez le caractère de substitution :";

const CharacterItem: React.FC<CharacterItemProps> = ({
  character,
}) => {
  const [selected, setSelected] = useState<string>("3");

  return (
    <>
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
              value={selected}
              onIonChange={(e) => setSelected(e.detail.value)}
            >
              <IonRow>

              {character.replacements.map(replacement => (
                <IonCol>
                  <IonItem>
                    <IonLabel>{replacement}&nbsp;</IonLabel>
                    <IonRadio mode="md" item-left value={replacement}></IonRadio>
                  </IonItem>
                </IonCol>
                  ))}
              </IonRow>
            </IonRadioGroup>
          </IonButtons>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default CharacterItem;
