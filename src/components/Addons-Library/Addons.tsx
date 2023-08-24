
// export const addons = [
//     {
//         name: 'FirstAddon',
//         username: 'Pesho',
//         downloadsCount: 250,
//         rating: 2,
//         tags: ['tech', 'helper'],
//         isFree: 'Free',
//         adonImage: 'https://www.educative.io/cdn-cgi/image/f=auto,fit=contain,w=600/api/page/5545322485383168/image/download/5214745121259520',
//         content: 'Vim engine for JetBrains IDEs IdeaVim supports many Vim features including normal/insert/visual modes, motion keys, deletion/changing, marks, registers, some Ex commands, Vim regexps, configuration via ~/.ideavimrc, macros, Vim plugins, etc.',
//         createdOn: '05.04.2023',
//         company: 'Haulmont Technology Ltd.'
//     },{
//         name: 'SecondAddon',
//         username: 'Gosho',
//         downloadsCount: 50,
//         rating: 5,
//         tags: ['tech', 'helper'],
//         isFree: 25 + '$',
//         adonImage: 'https://raw.githubusercontent.com/viatsko/awesome-vscode/master/awesome-vscode-logo.png',
//         content: 'Support for developing Flutter applications. Flutter gives developers an easy and productive way to build and deploy cross-platform, high-performance mobile apps for both Android and iOS. Installing this plugin will also install the Dart plugin. For some tools, this plugin uses Chromium through JxBrowser to display content from the web. JxBrowser complies with LGPL and offers an option to replace Chromium with another component. To do this:',
//         createdOn: '05.05.2023',
//         company: 'Haulmont Technology Ltd.'

//     },{
//         name: 'ThirdAddon',
//         username: 'Tosho',
//         downloadsCount: 25,
//         rating: 2,
//         tags: ['tech', 'helper'],
//         isFree: 'Free',
//         adonImage: 'https://www.filepicker.io/api/file/mONUafXS76G6swsntjAI',
//         content: 'This is a plugin that supports automatic countdown. Welcome to try it out!',
//         createdOn: '05.07.2023',
//         company: 'Haulmont Technology Ltd.'
//     },{
//         name: 'FourthAddon',
//         username: 'Boris',
//         downloadsCount: 16856,
//         rating: 1,
//         tags: ['tech', 'helper'],
//         isFree: 50 + '$',
//         adonImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR49GMDliLKe_fVoWfE64JT_U_kLzQ-NeFiiuIj9dOIv27Cv5nOFh_MkQl2tv7ztBb1qwg&usqp=CAU',
//         content: 'The Kotlin plugin provides language support in IntelliJ IDEA and Android Studio.',
//         createdOn: '05.03.2023',
//         company: 'Haulmont Technology Ltd.'
//     },{
//         name: 'FifthAddon',
//         username: 'Petar',
//         downloadsCount: 9102,
//         rating: 3,
//         tags: ['tech', 'helper'],
//         isFree: 150 + '$',
//         adonImage: 'https://www.educative.io/cdn-cgi/image/f=auto,fit=contain,w=600/api/page/5545322485383168/image/download/5214745121259520',
//         content: 'Vim engine for JetBrains IDEs IdeaVim supports many Vim features including normal/insert/visual modes, motion keys, deletion/changing, marks, registers, some Ex commands, Vim regexps, configuration via ~/.ideavimrc, macros, Vim plugins, etc.',
//         createdOn: '05.04.2023',
//         company: 'Haulmont Technology Ltd.'
//     },{
//         name: 'SixthAddon',
//         username: 'Kaloyan',
//         downloadsCount: 125,
//         rating: 4,
//         tags: ['tech', 'helper'],
//         isFree: 'Free',
//         adonImage: 'https://www.educative.io/cdn-cgi/image/f=auto,fit=contain,w=600/api/page/5545322485383168/image/download/5214745121259520',
//         content: 'Vim engine for JetBrains IDEs IdeaVim supports many Vim features including normal/insert/visual modes, motion keys, deletion/changing, marks, registers, some Ex commands, Vim regexps, configuration via ~/.ideavimrc, macros, Vim plugins, etc.',
//         createdOn: '05.04.2023',
//         company: 'Haulmont Technology Ltd.'
//     }
// ]
import React, { useState, useEffect } from "react";
import AddonsDetails from "./AddonsDetails";
import { getAllAddons } from "../../services/user.services";
import "./Addons.css";
import { Button } from "@mui/material";
import { NUM_CARDS_IN_HOMEPAGE } from "../../common/common";
import { MESSAGE_FOR_NEW_ADDONS, MESSAGE_FOR_TOP_DOWNLOAD_ADDONS, MESSAGE_FOR_TOP_RELATED_ADDONS } from "../../common/common";

export default function AddonCard() {
  const [addons, setAddons] = useState([]);
  const [topDownloads, setTopDownloads] = useState([]);
  const [topRatings, setTopRatings] = useState([]);
  const [topNewAddons, setTopNewAddons] = useState([]);

  useEffect(() => {
    const fetchAddons = async () => {
      const allAddons = await getAllAddons();
      setAddons(allAddons);      
    };
    fetchAddons();

    const mockSubscription = setInterval(() => {
      fetchAddons();
    }, 5000);
    
    return () => clearInterval(mockSubscription);
  }, []);

  useEffect(() => {
    if (addons.length > 0) {
      const sortedAddonsByDownload = addons.slice().sort((a, b) => b.downloadsCount - a.downloadsCount);
      setTopDownloads(sortedAddonsByDownload.slice(0, NUM_CARDS_IN_HOMEPAGE));
      
      const sortedAddonsByRating = addons.slice().sort((a, b) => b.rating - a.rating);
      setTopRatings(sortedAddonsByRating.slice(0, NUM_CARDS_IN_HOMEPAGE));

      const sortedByDate = addons.slice().sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
      setTopNewAddons(sortedByDate.slice(0, NUM_CARDS_IN_HOMEPAGE));
    }
  }, [addons]);

  return (
    <>
      <div className="addon-group">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ color: "black", textAlign: "left", marginLeft: "10px" }}>Top Downloads</h2>
          <Button style={{ marginRight: "60px", marginTop: "20px" }}>View more</Button>
        </div>
        {topDownloads.length > 0 ? (
          <div className="addon-card-grid">
            {topDownloads.map((addon) => (
              <AddonsDetails key={addon.addonId} {...addon} />
            ))}
          </div>
        ) : (
          <p style={{ color: "black" }}>{MESSAGE_FOR_TOP_DOWNLOAD_ADDONS}</p>
        )}
      </div>

      <div className="addon-group">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ color: "black", marginTop: "70px", textAlign: "left", marginLeft: "10px" }}>Top Related</h2>
          <Button style={{ marginRight: "60px", marginTop: "60px", background: 'transparent' }}>View more</Button>
        </div>
        {topRatings.length > 0 ? (
          <div className="addon-card-grid">
            {topRatings.map((addon) => (
              <AddonsDetails key={addon.addonId} {...addon} />
            ))}
          </div>
        ) : (
          <p style={{ color: "black" }}>{MESSAGE_FOR_TOP_RELATED_ADDONS}</p>
        )}
      </div>

      <div className="addon-group">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ color: "black", marginTop: "70px", textAlign: "left", marginLeft: "10px" }}>New Addonis</h2>
          <Button style={{ marginRight: "60px", marginTop: "60px" }}>View more</Button>
        </div>
        {topNewAddons.length > 0 ? (
          <div className="addon-card-grid">
            {topNewAddons.map((addon) => (
              <AddonsDetails key={addon.addonId} {...addon} />
            ))}
          </div>
        ) : (
          <p style={{ color: "black" }}>{MESSAGE_FOR_NEW_ADDONS}</p>
        )}
      </div>
    </>
  );
}
