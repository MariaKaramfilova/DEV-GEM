// eslint-disable-next-line no-unused-vars
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
/**
 * The Home component displays the home page of the application.
 *
 * @returns {JSX.Element} - TSX representing the Home component.
 */

export default function Home(): JSX.Element {
  return (
    <>
    <div style={{paddingTop:'100px'}}>
      <SearchBar/>
    </div>
    </>
  );
}
