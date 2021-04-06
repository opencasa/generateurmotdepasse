import React from "react";
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
  onSetCharacterReplacement: (id:number, replace:string) => void;
}

const textReplace: string = "Remplacer la lettre ";
const textSubstition: string = "Choisissez le caractère de substitution :";

const CharacterItem: React.FC<CharacterItemProps> = ({
  character, onSetCharacterReplacement
}) => {
  //const [selected, setSelected] = useState<string>(character.selected);

  return (
    <>
      <IonCard className="category-card">
        <IonCardHeader>
          <IonLabel>
            <h2>{`${textReplace}`} "{`${character.name}`}"</h2>
          </IonLabel>
        </IonCardHeader>
        <IonCardContent>
          <IonLabel>
            <h2>{`${textSubstition}`}</h2>
          </IonLabel>
          <IonButtons>
            <IonRadioGroup
              value={character.selected}
              onIonChange={(e) => onSetCharacterReplacement(character.id, e.detail.value)}
            >
              <IonRow>

              {character.replacements.map(replacement => (
                <IonCol key={replacement}>
                  <IonItem >
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
//export default React.memo(CharacterItem);
