"use client";

import CustomCard from "@/components/custom/card";
import SearchInput from "@/components/custom/searchInput";
import Spinner from "@/components/custom/spinner";

import { GET_CHARACTERS_AND_SPECIES } from "@/lib/apollo/queries";
import { ICharacter, ICharacterFilter } from "@/lib/types";

import { useQuery } from "@apollo/client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const CharacterLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<ICharacterFilter>({
    favorites: true,
    others: true,
  });
  const { loading, error, data } = useQuery<{
    characters: {
      results: ICharacter[];
    };
  }>(GET_CHARACTERS_AND_SPECIES, {
    variables: {
      filter: {
        name: filters?.name,
        species: filters?.species,
        status: filters?.status,
        gender: filters?.gender,
      },
    },
  });

  const [starredCharacters, setStarredCharacters] = useState<ICharacter[]>([]);

  useEffect(() => {
    const starredCharacters = JSON.parse(
      localStorage.getItem("starredCharacters") || "[]"
    );
    setStarredCharacters(starredCharacters);
  }, []);

  const toggleStarred = (id: string) => {
    const starredCharacters = JSON.parse(
      localStorage.getItem("starredCharacters") || "[]"
    );
    const index = starredCharacters.findIndex(
      (starred: { id: string }) => starred.id === id
    );
    if (index === -1) {
      starredCharacters.push(data?.characters.results.find((c) => c.id === id));
    } else {
      starredCharacters.splice(index, 1);
    }
    localStorage.setItem(
      "starredCharacters",
      JSON.stringify(starredCharacters)
    );
    setStarredCharacters(starredCharacters);
  };

  return (
    <main className="h-screen bg-white">
      <div className="flex flex-row h-full">
        {/* SideBar */}
        <div className="flex flex-col px-[16px] w-[500px] h-full">
          {/* Title and Search */}
          <div className="px-[8px] pt-8 mb-8">
            <h1
              className="text-2xl text-[#1F2937] font-bold cursor-pointer"
              onClick={() => router.push("/characters")}
            >
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
              {/* Starred characters */}
              {filters.favorites && (
                <>
                  <div className="pl-5 pb-4 text-sm text-gray-500">
                    <p>STARRED CHARACTERS ({starredCharacters.length})</p>
                  </div>

                  {starredCharacters.map((character: ICharacter) => (
                    <CustomCard
                      key={character.id}
                      character={character}
                      onClick={() =>
                        router.push(
                          `/characters/${character.id}?isStarred=true`
                        )
                      }
                      selected={pathname === `/characters/${character.id}`}
                      starOnClick={(e: { stopPropagation: () => void }) => {
                        e.stopPropagation();
                        toggleStarred(character.id);
                        if (
                          pathname ==
                          `/characters/${character.id}?isStarred=true`
                        ) {
                          router.push("/characters/${character.id}");
                        }
                      }}
                      isFavorite
                    />
                  ))}
                </>
              )}

              {/* Characters from graphql API */}
              {filters.others && (
                <>
                  <div className="mt-8 pl-5 pb-4 text-sm text-gray-500">
                    <p>
                      CHARACTERS (
                      {(data?.characters?.results?.length ?? 0) -
                        starredCharacters.length}
                      )
                    </p>
                  </div>

                  {data?.characters.results
                    ?.filter((character) =>
                      starredCharacters.every(
                        (starred) => starred.id !== character.id
                      )
                    )
                    .map((character: ICharacter) => (
                      <CustomCard
                        key={character.id}
                        character={character}
                        onClick={() =>
                          router.push(`/characters/${character.id}`)
                        }
                        selected={pathname === `/characters/${character.id}`}
                        starOnClick={(e: { stopPropagation: () => void }) => {
                          e.stopPropagation();
                          toggleStarred(character.id);
                          router.push(
                            `/characters/${character.id}?isStarred=true`
                          );
                        }}
                      />
                    ))}
                </>
              )}
            </div>
          )}
        </div>
        {/* Character details */}
        <div
          className="w-full h-full overflow-auto"
          style={{ boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.05)" }}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default CharacterLayout;
