// eslint-disable-next-line no-unused-vars
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import AddonCard from "../../components/Addons-Library/Addons";
/**
 * The Home component displays the home page of the application.
 *
 * @returns {JSX.Element} - TSX representing the Home component.
 */

export default function Home(): JSX.Element {

  return (
    <div>
      <div style={{ paddingTop: '100px', display: 'flex', flexDirection: 'column' }}>
        <SearchBar />
        <div style={{ marginTop: '50px' }}>
          <AddonCard />
        </div>
      </div>
    </div>
  );
}
