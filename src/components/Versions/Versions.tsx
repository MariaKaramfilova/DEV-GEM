import { useEffect, useState } from "react";
import { getFileDataFromGitHub } from "../../services/storage.services";
import { getVersionsByAddontHandle } from "../../services/version.services";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from "@mui/joy";

export default function Versions({addonId}){

    const [versions, setVersions] = useState([])
    const [loading, setLoading] = useState(true)

  

    useEffect(()=>{

        (async()=>{

            try{
                const response = await getVersionsByAddontHandle(addonId)
                console.log(response);
                setVersions(response)
            }catch(error){
                console.log(error);
                
            }finally{
                setLoading(false)
            }
            
        })()

    },[])

    if(versions.length > 0){
        console.log(versions);
    }

    return(
        
        <TableContainer component={Paper} sx={{mt:2, boxShadow: "none", border: "1px solid #DFDFE0"}}>
      <Table aria-label="addon-info-table">
        <TableHead>
          <TableRow>
            <TableCell>Info</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Upload Date</TableCell>
            <TableCell>Download Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {versions.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.info}</TableCell>
              <TableCell>{item.version}</TableCell>
              <TableCell>{new Date(item.uploadDate).toLocaleDateString()}</TableCell>
              <TableCell><Link href={item.downloadLink} target="_blank" rel="noopener noreferrer">Download</Link></TableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
    )
    
}