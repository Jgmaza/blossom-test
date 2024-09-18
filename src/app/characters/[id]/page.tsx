"use client";

import Detail from "@/components/custom/detail";
import Spinner from "@/components/custom/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GET_CHARACTER } from "@/lib/apollo/queries";
import { useQuery } from "@apollo/client";

import React from "react";

const CharacterDetail = ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: {
      id: params.id,
    },
  });

  if (loading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="text-[30px]" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-red-500">{error.message}</p>
      </div>
    );

  return (
    /* Selected Character */
    <div className="flex flex-col h-full w-full px-24 pt-10">
      <Avatar className="h-20 w-20">
        <AvatarImage
          className="relative"
          src={data?.character?.image}
          alt={data?.character?.name}
        />
        <div className="flex items-center bg-white rounded-full p-2 absolute bottom-0 right-0 shadow-sm">
          {/* <i
            className={`fa-${
              data?.character?.isFavorite ? "solid" : "regular"
            }  fa-heart text-${data?.character?.isFavorite ? "green" : "gray-500"}`}
          ></i> */}
        </div>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="text-xl text-[#1F2937] font-bold my-4">
        {data?.character?.name}
      </p>
      <Detail label="Gender" value={data?.character?.gender} />
      <Detail label="Species" value={data?.character?.species} />
      <Detail label="Status" value={data?.character?.status} />
    </div>
  );
};

export default CharacterDetail;
