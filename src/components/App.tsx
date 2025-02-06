import { useCallback, useState } from "react";
import { SearchBar } from "./searchBar/SearchBar";
import { BASE_URL } from "../constants";
import { IApiResponse } from "../types";
import { CharacterList } from "./characterList/CharacterList";
import s from "./App.module.css";

const DEFAULT_RESPONSE_DATA: IApiResponse = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
};

function App() {
  const [responseData, setResponseData] = useState<IApiResponse>(
    DEFAULT_RESPONSE_DATA
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/character/?name=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (response.status === 200) {
        setResponseData(data);
      } else {
        setResponseData(DEFAULT_RESPONSE_DATA);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
    setIsLoading(false);
  }, []);

  return (
    <main className={s.mainContent}>
      <div className={s.searchBarContainer}>
        <SearchBar
          onSearch={handleSearch}
          searchedCount={responseData.info.count}
        />
      </div>
      {isLoading && <p className={s.loader}>Loading...</p>}
      {responseData.results.length ? (
        <CharacterList list={responseData.results} />
      ) : null}
    </main>
  );
}

export default App;
