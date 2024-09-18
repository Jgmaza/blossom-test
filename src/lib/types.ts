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
  gender?: IGenders;
  status?: IStatus;
  image: string;
}
export interface ICharacterFilter {
  name?: string;
  status?: IStatus;
  species?: string;
  gender?: IGenders;
  favorites?: boolean;
  others?: boolean;
}
