
"use client"; 

import React, { useState } from "react";
import {
  InstantSearch,
  SearchBox,
  useHits,
  useSearchBox,
} from "react-instantsearch"; 
import searchClient from "../lib/algolia";
import { LuSearch } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useRouter } from 'next/navigation'; 

interface HitProps {
  hit: {
    objectID: string;
    name: string;
    subtitle: string;
    rating: number;
    image: string;
  };
}

const highlightText = (text: string, query: string) => {
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => (
    <span key={index} style={{ color: regex.test(part) ? "#644FC1" : "#959595" }}>
      {part}
    </span>
  ));
};


const Hit: React.FC<HitProps & { query: string }> = ({ hit, query }) => {
  const router = useRouter(); // Initialize the router

  const handleSelect = () => {
    
    console.log(`Navigating to /details/${hit.objectID}`); 
    router.push(`/details/${hit.objectID}`); 
  };

  return (
    <div
      className="flex items-center bg-light4 hover:bg-primary50 cursor-pointer my-2 rounded-lg"
      onClick={handleSelect} 
    >
      <img className="m-6 rounded-md w-[40px]" src={hit.image} alt={hit.name} />
      <div className="px-3 py-2">
        <strong className="text-sm">{highlightText(hit.name, query)}</strong>
        <p className="text-xs">{highlightText(hit.subtitle, query)}</p>
        <p className="text-gray4 text-xs">Rating: {hit.rating}</p>
      </div>
    </div>
  );
};


// CustomHits component to render the list of hits
const CustomHits: React.FC = () => {
  const { hits } = useHits<HitProps["hit"]>();
  const { query } = useSearchBox(); 

  if (!query) {
    return null; 
  }

  return (
    <div className="border shadow-md p-2 rounded-lg w-full mt-1">
      {hits.length > 0 ? (
        hits.map((hit) => <Hit key={hit.objectID} hit={hit} query={query} />)
      ) : (
        <div className="py-4 text-gray4 text-center">No results found</div>
      )}
    </div>
  );
};

// Main Search component
const Search: React.FC = () => {
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ""; 

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div className="flex flex-col relative">
        <div className="flex justify-center rounded-lg border border-light3 shadow-shadow1 p-3 text-xs font-extralight focus:border-purple-500 focus:outline-none">
          <SearchBox
            classNames={{
              root: "MyCustomSearchBox",
              form: "flex flex-row-reverse relative",
              input: "focus:outline-none w-[200px]",
              resetIcon: "text-light1 absolute text-lg right-0 inset-y-px",
              submitIcon: "pe-2 text-lg text-light1"
            }}
            placeholder="Search brand, category, tag or..."
            submitIconComponent={({ classNames }) => (
              <div className={classNames.submitIcon}>
                <LuSearch />
              </div>
            )}
            resetIconComponent={({ classNames }) => (
              <div className={classNames.resetIcon}>
                <IoClose />
              </div>
            )}
          />
        </div>
        <div className="mt-2 absolute top-12 right-0 overflow-y-auto max-h-96 w-[350px] bg-white">
          <CustomHits /> 
        </div>
      </div>
    </InstantSearch>
  );
};

export default Search;
