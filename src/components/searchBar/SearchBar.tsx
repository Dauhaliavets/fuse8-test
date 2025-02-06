import { FC, useEffect, useRef, useState } from "react";
import s from "./SearchBar.module.css";
import { DEBOUNCE_DELAY } from "../../constants";

interface SearchBarProps {
  searchedCount: number;
  onSearch: (query: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ searchedCount, onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        onSearch(query);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(delayDebounceFn);
  }, [query, onSearch]);

  return (
    <form className={s.searchForm}>
      <input
        ref={inputRef}
        className={s.searchInput}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search characters..."
      />
      <p className={s.searchBarInfo}>
        {searchedCount ? `Found characters: ${searchedCount}` : null}
      </p>
    </form>
  );
};
