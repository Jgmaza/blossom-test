"use client";

import Detail from "@/components/custom/detail";
import Spinner from "@/components/custom/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GET_CHARACTER } from "@/lib/apollo/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const CharacterDetail = ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: {
      id: params.id,
    },
  });

  const [newComment, setNewComment] = useState("");

  const addComment = (id: string, comment: string) => {
    const comments = JSON.parse(localStorage.getItem("comments") || "{}");
    if (!comments[id]) {
      comments[id] = [];
    }
    comments[id].push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
  };

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
      <div className="h-fit w-fit relative">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={data?.character?.image}
            alt={data?.character?.name}
          />

          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div
          className="flex items-center bg-white rounded-full p-2 absolute bottom-0 -right-2 shadow-sm "
          /* <div
          className="flex items-center bg-white rounded-full p-2 absolute bottom-0 -right-2 shadow-sm cursor-pointer hover:bg-gray-100 transition-transform transform hover:scale-110"
        > */
        >
          <i
            className={`fa-${
              localStorage.getItem("starredCharacters")?.includes(params.id)
                ? "solid"
                : "regular"
            }  fa-heart text-${
              localStorage.getItem("starredCharacters")?.includes(params.id)
                ? "green"
                : "gray-500"
            }`}
          ></i>
        </div>
      </div>

      <p className="text-xl text-[#1F2937] font-bold my-4">
        {data?.character?.name}
      </p>
      <Detail label="Gender" value={data?.character?.gender} />
      <Detail label="Species" value={data?.character?.species} />
      <Detail label="Status" value={data?.character?.status} />

      <div className="mt-4">
        <h1 className="text-lg text-[#1F2937] font-bold">Comments</h1>

        {localStorage.getItem("comments")?.includes(params.id) ? (
          <>
            {JSON.parse(localStorage.getItem("comments") || "{}")[
              params.id
            ].map((comment: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-gray-500">
                <i className="fa-solid fa-user-circle"></i>{" "}
                <p key={index}>
                  {comment}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-500">No comments yet</p>
        )}

        <textarea
          className="w-full h-24 mt-4 p-2 rounded-md"
          placeholder="Write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addComment(params.id, newComment);
              setNewComment("");
            }
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default CharacterDetail;
