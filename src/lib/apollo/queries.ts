import { gql } from "@apollo/client";

export const GET_CHARACTERS_AND_SPECIES = gql`
  query GetCharacters {
    characters(page: 1) {
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
