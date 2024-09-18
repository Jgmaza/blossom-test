import { ICharacter } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CustomCardProps {
  character: ICharacter;
  onClick?: () => void;
  starOnClick?: (() => void) | ((e: { stopPropagation: () => void; }) => void);
  selected?: boolean;
  isFavorite?: boolean;
}

const CustomCard = ({
  character,
  onClick,
  selected,
  isFavorite,
  starOnClick,
}: CustomCardProps) => {
  return (
    <div
      className={`px-4 py-4 rounded-md flex flex-row gap-4 cursor-pointer hover:bg-gray-
      ${selected ? 300 : 100} items-center ${selected && "bg-gray-300"}
      `}
      style={{ borderTop: "1px solid #f1f2f4" }}
      onClick={onClick}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={character.image} alt={character.name} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full">
        <h1 className="text-md font-bold">{character.name}</h1>
        <p className="text-sm text-gray-500">{character?.species}</p>
      </div>
      <div
        className="flex items-center bg-white rounded-full p-2 shadow-sm cursor-pointer hover:bg-gray-100 transition-transform transform hover:scale-110"
        onClick={starOnClick}
      >
        <i
          className={`fa-${isFavorite ? "solid" : "regular"} fa-heart ${
            isFavorite ? "text-green" : "text-gray-500"
          }`}
        ></i>
      </div>
    </div>
  );
};

export default CustomCard;
