export interface IComment {
  comment: string;
  characterId: string;
}

export type IGenders = "Male" | "Female" | "Genderless" | "unknown";

export type IStatus = "Alive" | "Dead" | "unknown";

export interface ICharacter {
  id: string;
  name: string;
  species: string;
  gender: IGenders;
  status: IStatus;
  image: string;
}

export interface ICharacterFilter {
  name?: string;
  speciesId?: string;
  favorites?: boolean;
  others?: boolean;
  gender?: IGenders;
}
