import { FC } from "react";
import { CharacterItem } from "../characterItem/CharacterItem";
import { Character } from "../../types";
import s from "./CharacterList.module.css";

interface CharacterListProps {
  list: Character[];
}
export const CharacterList: FC<CharacterListProps> = ({ list }) => {
  return (
    <div className={s.characterList}>
      {list.map((item) => (
        <CharacterItem item={item} key={item.id} />
      ))}
    </div>
  );
};
