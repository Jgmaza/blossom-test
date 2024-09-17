export interface ISpecies {
  name: string;
  id: string;
}

export interface IComment {
  id: string;
  comment: string;
  characterId: string;
}

export type IGenders = "Male" | "Female" | "Genderless" | "unknown";

export type IStatus = "Alive" | "Dead" | "unknown";

export interface ICharacter {
  id: string;
  name: string;
  species: ISpecies;
  gender: IGenders;
  status: IStatus;
  image: string;
  isFavorite: boolean;
}

export interface ICharacterFilter {
  name?: string;
  speciesId?: string;
  favorites?: boolean;
  others?: boolean;
  gender?: IGenders;
}
