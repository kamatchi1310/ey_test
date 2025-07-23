import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CharactersListTable from "../components/CharactersListTable";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { useQuery } from "@tanstack/react-query";

const ListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    if (page == 1) {
      setSearchParams({ page: "1" });
    }
    // getListing(page);
  }, [page, setSearchParams]);

  const fetchCharacters = async (page: number) => {
  const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
  return data;
};

  const {
  data,
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ['characters', page],
  queryFn: () => fetchCharacters(page),
});

  // const getListing = (page: number) => {
  //   setLoading(true);
  //   axios
  //     .get(`https://rickandmortyapi.com/api/character?page=${page}&count=10`)
  //     .then((res: any) => {
  //       setLoading(false);
  //       setTotalPages(res?.data?.info?.pages || 1);
  //       setCharacterList(res.data.results);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //     });
  // };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <header className="sticky top-0 bg-white z-10 border-b border-gray-300 px-4 py-2">
        <h2 className="text-primary mb-3">Character Table</h2>
      </header>

      {/* Scrollable Table Area */}
      <main className="flex-1 overflow-y-auto px-4">
        {!isLoading ? (
          <>
            <CharactersListTable characters={data?.results} />
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        )}
      </main>

      {/* Fixed Pagination Footer */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-300 px-4 py-2 flex justify-center z-10">
        {!isLoading && <Pagination totalPages={data?.info?.pages} />}
      </footer>
    </div>
  );
};

export default ListingPage;
