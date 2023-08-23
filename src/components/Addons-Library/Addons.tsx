
export const addons = [
    {
        name: 'FirstAddon',
        username: 'Pesho',
        downloadsCount: 250,
        rating: 2,
        tags: ['tech', 'helper'],
        isFree: 'Free',
        adonImage: 'https://www.educative.io/cdn-cgi/image/f=auto,fit=contain,w=600/api/page/5545322485383168/image/download/5214745121259520',
        content: 'Vim engine for JetBrains IDEs IdeaVim supports many Vim features including normal/insert/visual modes, motion keys, deletion/changing, marks, registers, some Ex commands, Vim regexps, configuration via ~/.ideavimrc, macros, Vim plugins, etc.',
        createdOn: '05.04.2023',
        company: 'Haulmont Technology Ltd.'
    },{
        name: 'SecondAddon',
        username: 'Gosho',
        downloadsCount: 50,
        rating: 5,
        tags: ['tech', 'helper'],
        isFree: 25 + '$',
        adonImage: 'https://raw.githubusercontent.com/viatsko/awesome-vscode/master/awesome-vscode-logo.png',
        content: 'Support for developing Flutter applications. Flutter gives developers an easy and productive way to build and deploy cross-platform, high-performance mobile apps for both Android and iOS. Installing this plugin will also install the Dart plugin. For some tools, this plugin uses Chromium through JxBrowser to display content from the web. JxBrowser complies with LGPL and offers an option to replace Chromium with another component. To do this:',
        createdOn: '05.05.2023',
        company: 'Haulmont Technology Ltd.'

    },{
        name: 'ThirdAddon',
        username: 'Tosho',
        downloadsCount: 25,
        rating: 2,
        tags: ['tech', 'helper'],
        isFree: 'Free',
        adonImage: 'https://www.filepicker.io/api/file/mONUafXS76G6swsntjAI',
        content: 'This is a plugin that supports automatic countdown. Welcome to try it out!',
        createdOn: '05.07.2023',
        company: 'Haulmont Technology Ltd.'
    },{
        name: 'FourthAddon',
        username: 'Boris',
        downloadsCount: 16856,
        rating: 1,
        tags: ['tech', 'helper'],
        isFree: 50 + '$',
        adonImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR49GMDliLKe_fVoWfE64JT_U_kLzQ-NeFiiuIj9dOIv27Cv5nOFh_MkQl2tv7ztBb1qwg&usqp=CAU',
        content: 'The Kotlin plugin provides language support in IntelliJ IDEA and Android Studio.',
        createdOn: '05.03.2023',
        company: 'Haulmont Technology Ltd.'
    },{
        name: 'FifthAddon',
        username: 'Petar',
        downloadsCount: 9102,
        rating: 3,
        tags: ['tech', 'helper'],
        isFree: 150 + '$',
        adonImage: 'https://www.educative.io/cdn-cgi/image/f=auto,fit=contain,w=600/api/page/5545322485383168/image/download/5214745121259520',
        content: 'Vim engine for JetBrains IDEs IdeaVim supports many Vim features including normal/insert/visual modes, motion keys, deletion/changing, marks, registers, some Ex commands, Vim regexps, configuration via ~/.ideavimrc, macros, Vim plugins, etc.',
        createdOn: '05.04.2023',
        company: 'Haulmont Technology Ltd.'
    },{
        name: 'SixthAddon',
        username: 'Kaloyan',
        downloadsCount: 125,
        rating: 4,
        tags: ['tech', 'helper'],
        isFree: 'Free',
        adonImage: 'https://www.educative.io/cdn-cgi/image/f=auto,fit=contain,w=600/api/page/5545322485383168/image/download/5214745121259520',
        content: 'Vim engine for JetBrains IDEs IdeaVim supports many Vim features including normal/insert/visual modes, motion keys, deletion/changing, marks, registers, some Ex commands, Vim regexps, configuration via ~/.ideavimrc, macros, Vim plugins, etc.',
        createdOn: '05.04.2023',
        company: 'Haulmont Technology Ltd.'
    }
]
import AddonsDetails from "./AddonsDetails";
import './Addons.css'
import { Button } from "@mui/material";

export default function AddonCard({}: Props) {
    
    const sortedAddonsByDownload = addons.sort((a, b) => b.downloadsCount - a.downloadsCount);
    const topDownloads = sortedAddonsByDownload.slice(0, 3).map((addon) => {
      const postDetailsProp = { ...addon };
      return <AddonsDetails key={addon.name} {...postDetailsProp} />;
    });
    
    const sortedAddonsByRating = addons.sort((a, b) => b.rating - a.rating);
    const topRatings = sortedAddonsByRating.slice(0, 3).map((addon) => {
        const postDetailsProp = { ...addon };
        return <AddonsDetails key={addon.name} {...postDetailsProp} />;
      });

      const sortedByDate = addons.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
      const topNewAddons = sortedByDate.slice(0, 3).map((addon) => {
        const postDetailsProp = { ...addon };
        return <AddonsDetails key={addon.name} {...postDetailsProp} />;
      });

      return (
        <>
          <div className="addon-group">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ color: "black", textAlign: "left", marginLeft: "40px" }}>Top Downloads</h2>
              <Button style={{marginRight: '40px', paddingTop: '20px'}}>View more</Button>
            </div>
            {topDownloads.length > 0 ? (
              <div className="addon-card-grid">{topDownloads}</div>
            ) : (
              <p style={{ color: "black" }}>No top downloads to show</p>
            )}
          </div>
    
          <div className="addon-group">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ color: "black", marginTop: "70px", textAlign: "left", marginLeft: "40px" }}>Top Related</h2>
              <Button style={{marginRight: '40px', paddingTop: '60px'}}>View more</Button>
            </div>
            {topRatings.length > 0 ? (
              <div className="addon-card-grid">{topRatings}</div>
            ) : (
              <p style={{ color: "black" }}>No top ratings to show</p>
            )}
          </div>
    
          <div className="addon-group">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ color: "black", marginTop: "70px", textAlign: "left", marginLeft: "40px" }}>New Addonis</h2>
              <Button style={{marginRight: '40px', paddingTop: '60px'}}>View more</Button>
            </div>
            {topNewAddons.length > 0 ? (
              <div className="addon-card-grid">{topNewAddons}</div>
            ) : (
              <p style={{ color: "black" }}>No top new addons to show</p>
            )}
          </div>
        </>
      );
}