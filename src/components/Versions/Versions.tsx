import { useEffect, useState } from "react";
import { getVersionsByAddontHandle } from "../../services/addon.services";

export default function Versions({addonId}){

    const [versions, setVersions] = useState([])

    useEffect(()=>{

        (async()=>{
            const response = await getVersionsByAddontHandle(addonId)
            console.log(response);
            setVersions(response)
        })()

    },[])

    if(versions.length > 0){
        console.log(versions);
    }
    
}