"use client";

import CustomCard from "@/components/custom/card";
import SearchInput from "@/components/custom/searchInput";
import Spinner from "@/components/custom/spinner";
import { GET_CHARACTERS_AND_SPECIES } from "@/lib/apollo/queries";
import { ICharacter, ICharacterFilter } from "@/lib/types";
import { useQuery } from "@apollo/client";
import { ReactNode, useState } from "react";

const CharacterLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [filters, setFilters] = useState<ICharacterFilter>({});
  const { loading, error, data } = useQuery<{
    characters: {
      results: ICharacter[];
    };
  }>(GET_CHARACTERS_AND_SPECIES, {
    variables: {
      filter: filters,
    },
  });

  return (
    <main className="h-screen bg-white">
      <div className="flex flex-row h-full">
        {/* SideBar */}
        <div className="flex flex-col px-[16px] w-[500px] h-full">
          {/* Title and Search */}
          <div className="px-[8px] pt-8 mb-8">
            <h1 className="text-2xl text-[#1F2937] font-bold">
              Rick and Morty List
            </h1>
          </div>
          <SearchInput
            setFilters={setFilters}
            filters={filters}
            species={["Human", "Alien"]}
          />
          {/* Character list */}
          {loading && (
            <div className="flex items-center justify-center h-full w-full">
              <Spinner className="text-[30px]" />
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-red-500">{error.message}</p>
            </div>
          )}
          {!loading && !error && (
            <div className="h-full overflow-y-auto mt-8">
              <div className="pl-5 pb-4 text-sm text-gray-500">
                <p>
                  STARRED CHARACTERS (
                  {/* {
                    data?.characters?.results.filter(
                      (character: ICharacter) => character.isFavorite
                    ).length
                  } */}
                  )
                </p>
              </div>
              {/* {data?.characters?.results
                ?.filter((character: ICharacter) => character.isFavorite)
                .map((character: ICharacter) => (
                  <CustomCard
                    key={character.id}
                    character={character}
                    onClick={() => setSelectedCharacter(character)}
                    selectedCharacter={selectedCharacter}
                  />
                ))} */}
              <div className="mt-8 pl-5 pb-4 text-sm text-gray-500">
                <p>
                  CHARACTERS (
                  {/* {
                    data?.characters?.results.filter(
                      (character: ICharacter) => !character.isFavorite
                    ).length
                  } */}
                  )
                </p>
              </div>
              {data?.characters.results?.map((character: ICharacter) => (
                <CustomCard key={character.id} character={character} />
              ))}
            </div>
          )}
        </div>
        {/* Character details */}
        <div
          className="w-full h-full"
          style={{ boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.05)" }}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default CharacterLayout;
