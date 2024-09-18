import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ICharacter } from "@/lib/types";
import { useRouter } from "next/navigation";

interface CustomCardProps {
  character: ICharacter;
}

const CustomCard = ({
  character,
}: CustomCardProps) => {

  const router = useRouter();
  return (
    <div
      className={`px-4 py-4 rounded-md flex flex-row gap-4 cursor-pointer hover:bg-gray-`}
      /* ${
        character.name == selectedCharacter?.name ? 300 : 100
      } items-center ${
        character.name == selectedCharacter?.name && "bg-gray-300"
      } */
      style={{ borderTop: "1px solid #f1f2f4" }}
      onClick={() => router.push(`/characters/${character.id}`)}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={character.image} alt={character.name} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full">
        <h1 className="text-md font-bold">{character.name}</h1>
        <p className="text-sm text-gray-500">{character?.species}</p>
      </div>
      <div className="flex items-center bg-white rounded-full p-2">
        <i
          className={`fa-${
            false ? "solid" : "regular"
          } fa-heart ${false ? "text-green" : "text-gray-500"}`}
        ></i>
      </div>
    </div>
  );
};

export default CustomCard;
