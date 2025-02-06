import { FC } from "react";
import { Character } from "../../types";
import cn from "classnames";
import s from "./CharacterItem.module.css";

interface CharacterItemProps {
  item: Character;
}
export const CharacterItem: FC<CharacterItemProps> = ({ item }) => {
  const getStatusClassName = (status: string) => {
    let className = "";

    switch (status) {
      case "Alive":
        className = cn(s.characterItemStatusValue, s.alive);
        break;
      case "Dead":
        className = cn(s.characterItemStatusValue, s.dead);
        break;

      default:
        className = cn(s.characterItemStatusValue, s.unknown);
        break;
    }

    return className;
  };

  return (
    <a
      className={s.characterItem}
      key={item.id}
      href={item.url}
      target="_blank"
    >
      <h3 className={s.characterItemHeading}>{item.name}</h3>
      <div className={s.characterItemInfo}>
        <div className={s.characterItemStatus}>
          <span className={s.characterItemStatusTitle}>Status: </span>
          <span className={getStatusClassName(item.status)}>{item.status}</span>
        </div>
        <div className={s.characterItemCreated}>
          <span className={s.characterItemCreatedTitle}>Created: </span>
          {Intl.DateTimeFormat("ru-RU").format(new Date(item.created))}
        </div>
      </div>
    </a>
  );
};
