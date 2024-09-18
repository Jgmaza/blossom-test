import { Popover } from "../ui/popover";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ICharacterFilter } from "@/lib/types";
import { PopoverClose } from "@radix-ui/react-popover";

interface SearchInputProps {
  setFilters: Dispatch<SetStateAction<ICharacterFilter>>;
  filters: ICharacterFilter;
  species?: string[];
}

interface FilterButtonProps {
  children: ReactNode;
  parameter: keyof ICharacterFilter | (keyof ICharacterFilter)[];
  value: string | boolean | number | (string | boolean | number)[];
  setFilters: Dispatch<SetStateAction<ICharacterFilter>>;
  filters: ICharacterFilter;
}

const FilterButton = ({
  children,
  parameter,
  value,
  setFilters,
  filters,
}: FilterButtonProps) => {
  return (
    <Button
      className={`rounded-[8px] hover:bg-purple-200 px-4 py-2 ${
        typeof parameter === "string" && filters[parameter] === value
          ? "bg-purple-200 text-purple-500"
          : Array.isArray(parameter) &&
            Array.isArray(value) &&
            parameter.every((param, i) => filters[param] === value[i])
          ? "bg-purple-200 text-purple-500"
          : "text-gray-500"
      }`}
      variant="outline"
      onClick={() => {
        if (typeof parameter === "string") {
          setFilters((prev) => ({ ...prev, [parameter]: value }));
        }
        if (Array.isArray(parameter) && Array.isArray(value)) {
          setFilters((prev) => ({
            ...prev,
            ...parameter.reduce(
              (acc, curr, i) => ({ ...acc, [curr]: value[i] }),
              {}
            ),
          }));
        }
      }}
    >
      {children}
    </Button>
  );
};

const SearchInput = ({ filters, setFilters, species }: SearchInputProps) => {
  const [auxFilters, setAuxFilters] = useState<ICharacterFilter>(filters);
  return (
    <div className="flex items-center w-full px-4 py-[9px] bg-gray-100 rounded-md">
      <i className="fa-solid fa-search text-gray-500"></i>
      <Input
        type="text"
        placeholder="Search or filter results"
        onChange={(e) => {
          if (setFilters) {
            setFilters((prev) => ({ ...prev, name: e.target.value }));
          }
        }}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="bg-transparent border-none p-0 h-auto"
            variant="outline"
          >
            <i className="fa-solid fa-sliders text-purple-700 rotate-90"></i>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[343px] p-6"
          side="bottom"
          sideOffset={25}
          align="end"
          alignOffset={-18}
        >
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-gray-500 text-sm">Character</p>
              <div className="flex flex-row gap-2 mt-">
                <FilterButton
                  parameter={["favorites", "others"]}
                  value={[true, true]}
                  setFilters={setAuxFilters}
                  filters={auxFilters}
                >
                  All
                </FilterButton>

                <FilterButton
                  parameter={["favorites", "others"]}
                  value={[true, false]}
                  setFilters={setAuxFilters}
                  filters={auxFilters}
                >
                  Favorites
                </FilterButton>
                <FilterButton
                  parameter={["favorites", "others"]}
                  value={[false, true]}
                  setFilters={setAuxFilters}
                  filters={auxFilters}
                >
                  Others
                </FilterButton>
              </div>
            </div>

            <div className="overflow-x-auto w-full min-w-full">
              <p className="text-gray-500 text-sm">Specie</p>
              <div className="flex flex-row gap-2 mt-">
                <FilterButton
                  parameter="species"
                  value=""
                  setFilters={setAuxFilters}
                  filters={auxFilters}
                >
                  All
                </FilterButton>
                {species?.map((specie, index) => (
                  <FilterButton
                    key={index}
                    parameter="species"
                    value={specie}
                    setFilters={setAuxFilters}
                    filters={auxFilters}
                  >
                    {specie}
                  </FilterButton>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto w-full min-w-full">
              <p className="text-gray-500 text-sm ">Gender</p>
              <div className="flex flex-row gap-2 mt-">
                <FilterButton
                  parameter="gender"
                  value=""
                  setFilters={setAuxFilters}
                  filters={auxFilters}
                >
                  All
                </FilterButton>
                {["Male", "Female", "Genderless", "unknown"]?.map(
                  (gender, index) => (
                    <FilterButton
                      key={index}
                      parameter="gender"
                      value={gender}
                      setFilters={setAuxFilters}
                      filters={auxFilters}
                    >
                      {gender}
                    </FilterButton>
                  )
                )}
              </div>
            </div>
            <PopoverClose asChild>
              <Button
                className="w-full text-gray-600 bg-purple-200 hover:bg-purple-800 hover:text-white"
                onClick={() => setFilters(auxFilters)}
              >
                Filter
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchInput;
