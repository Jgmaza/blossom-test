import { gql } from "@apollo/client";

export const GET_CHARACTERS_AND_SPECIES = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        species
        gender
        status
        image
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      species
      gender
      status
      image
    }
  }
`;
