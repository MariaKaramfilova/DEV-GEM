// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import AddonCard from "../../components/Addons-Library/Addons";
/**
 * The Home component displays the home page of the application.
 *
 * @returns {JSX.Element} - TSX representing the Home component.
 */

export default function Home(): JSX.Element {
  const [generalSelectedIDE, setGeneralSelectedIDE] = useState<string>('All platforms');
  
  return (
    <>
    <div style={{ paddingTop: '100px', display: 'flex', flexDirection: 'column', }}>
      <SearchBar setGeneralSelectedIDE={setGeneralSelectedIDE}/>
      <div style={{marginTop: '50px'}}>
      <AddonCard selectedIDE={generalSelectedIDE}/>
      </div>
    </div>
    </>
  );
}
