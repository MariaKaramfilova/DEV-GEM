import { useEffect, useState } from "react";
import { getFileDataFromGitHub } from "../../services/storage.services";
import { getVersionsByAddontHandle } from "../../services/version.services";

export default function Versions({addonId}){

    const [versions, setVersions] = useState([])

  
    

    useEffect(()=>{

        (async()=>{

            console.log(await getFileDataFromGitHub("https://raw.githubusercontent.com/MariaKaramfilova/Addonis/main/Addons/idea-plugin(1).zip", "Addons"));

            // const response = await getVersionsByAddontHandle(addonId)
            // console.log(response);
            // setVersions(response)
        })()

    },[])

    if(versions.length > 0){
        console.log(versions);
    }
    
}