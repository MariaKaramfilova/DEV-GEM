import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import ImageCarousel from '../Carousel/Carousel';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { incrementDownloadCount } from '../../services/addon.services';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CreateReview from '../CreateReview/CreateReview';
import Reviews from '../Reviews/Reviews';
import RatingWithValue from '../Reviews/RatingWithValue';
import Versions from '../Versions/Versions';
import GitHubUpdates from '../Versions/GitHubUpdates';
import { Addon, AddonsContext } from '../../context/AddonsContext.ts';
import { useParams } from 'react-router-dom';


export default function DetailedAddonView() {

    const { allAddons } = useContext(AddonsContext);
    const params = useParams();
    const addonId = params.id;

    const [tabValue, setTabValue] = useState('1');
    const [addon, setAddon] = useState<Addon>(allAddons.filter(el => el.addonId === addonId)[0]);
    const [images, setImages] = useState(addon.images);
    const [downloadSource, setDownload] = useState(addon.downloadLink);
    const [tags, setTags] = useState(Object.keys(addon.tags));
    const [newReview, setNewReview] = useState(false)
    const [content, setContent] = useState(addon.description);
    const [downloadsChange, setDownloadsChange] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setAddon(allAddons.filter(el => el.addonId === addonId)[0]);
    }, [allAddons]);

    const handleDownload = () => {
        try {
            const link = document.createElement('a');
            link.download = downloadSource;
            link.href = `/${downloadSource}`
            link.click()
            incrementDownloadCount(addon.addonId)
            setDownloadsChange(!downloadsChange)
            console.log(downloadsChange);

        }
        catch (error) {
            console.log(error);

        }

    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Container sx={{ mt: 2, color: 'black', textAlign: "left" }}>

                <Grid container sx={{marginLeft: "1em"}}>
                    <Box className="image-logo" display="flex" alignItems="center" marginRight="1.5em">
                        <Grid item md={1}>
                            <img src={addon.logo} style={{ minHeight: "5em", maxWidth: '100pt', maxHeight: '100pt'}} />
                        </Grid>
                    </Box>

                    <Grid item md={5}>
                        {
                            tags.map((tag) => (
                                <Button key={tag} variant='text'>{tag}</Button>
                            ))
                        }
                        <Typography className='addonName' variant='h5' fontWeight="bold">
                            {addon.name}
                        </Typography>

                        <Grid>

                            <RatingWithValue addonId={addon.addonId}> </RatingWithValue>

                        </Grid>

                        <Button>{addon.company}</Button>
                    </Grid>

                    <Grid item md={5}>

                        <Grid container sx={{ mt: 5 }}>

                            <Grid item md={12}>
                                <Box display="flex" justifyContent="flex-end" alignItems="center" height="100%">
                                    <Button onClick={handleDownload} variant="contained" size="large">
                                        <DownloadForOfflineIcon sx={{ mr: 1 }} />Download
                                    </Button>
                                </Box>
                            </Grid>

                            <Grid item md={12} sx={{ mt: 2 }}>

                                <Box display="flex" justifyContent="flex-end" alignItems="left" height="100%">
                                    <div>
                                        <Typography variant='h5' style={{fontWeight: "100", color: "#1b74e4"}}> {addon.downloads || 0} downloads </Typography>

                                    </div>
                                </Box>
                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>

                <TabContext value={tabValue}>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Overview" value="1" />
                            <Tab label="Versions" value="2" />
                            <Tab label="Reviews" value="3" />
                            <Tab label="GitHub Source" value="4" />
                        </TabList>
                    </Box>

                    <TabPanel value="1">


                        {allAddons && images?.length > 0 && <ImageCarousel images={images}></ImageCarousel>}



                        <Box sx={{ mt: 4, color: '#333333' }}>
                            <hr />

                            <Typography align="left" color="#777">
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                             </Typography>

                        </Box>
                    </TabPanel>

                    <TabPanel value='2'>

                        <Versions addonId={addon.addonId}></Versions>

                    </TabPanel>

                    <TabPanel value='3'>
                        <Grid container>
                            <Grid item md={6}>

                                <Typography align='center' variant='h5'>
                                    Ratings & Reviews
                                </Typography>

                            </Grid>
                            <Grid item md={6}>
                                <CreateReview author={addon.company} addonId={addon.addonId} userId={addon.ownerUid} addonName={addon.name} reviewsUpdate={setNewReview} currentReview={newReview} />
                            </Grid>



                            <Grid container>
                                <Grid item sm={12}>
                                    <Reviews addonId={addon.addonId} currentReview={newReview}></Reviews>
                                </Grid>
                            </Grid>

                        </Grid>

                    </TabPanel>

                    <TabPanel value='4'>
                        <Grid container>
                            <Grid item md={12}>

                                <GitHubUpdates gitRepo={addon.originLink}> </GitHubUpdates>

                            </Grid>

                        </Grid>
                    </TabPanel>

                </TabContext>
            </Container>
        </>
    )
}
