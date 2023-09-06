import { push, ref, set, get, query } from 'firebase/database';
import { database } from "../config/firebase.js";
import { useContext } from 'react';
import { getAddonById } from './addon.services.js';

// Helper function to get the current date in yyyy-mm-dd format
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const fireEvent = async (eventType: string, addonId: string) => {

  const timestamp = Date.now();

  const eventData = {
    timestamp: timestamp,
    addonId: addonId,
  };

  const analyticsRef = ref(database, `analytics/${getCurrentDate()}/${addonId}/${eventType}/`);
  const newEventRef = push(analyticsRef);
  
  await set(newEventRef, eventData);

  console.log(`Event (${eventType}) logged for addonId: ${addonId}`);
};

export const fireRating = async ( addonId: string, rating : number) => {

  const eventData = {
    rating: rating,
  };

  const analyticsRef = ref(database, `analytics/${getCurrentDate()}/${addonId}/rating`);
  const newEventRef = push(analyticsRef);
  
  await set(newEventRef, eventData);

  console.log(`Event rating logged for addonId: ${addonId}`);
};


// Function to retrieve all Add-on analytics data for time period
export const getAnalyticsData = async (
  startDate,
  endDate,
  addonId: string
): Promise<{ [date: string]: { pageVisits: any[], downloads: any[] } }> =>{

        let addonName = await getAddonById(addonId);
            addonName = addonName.name;

  const result: {addonName: string, addonId:string, pageVisits: number[], downloads: number[],
     averageRating: number[], ratingsCount: number[], downloadRate: number[] } = {
    addonId: addonId,
    addonName: addonName,
    pageVisits: [],
    downloads: [],
    averageRating: [],
    ratingsCount: [],
    downloadRate: []
  }

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const currentDateStr = `${year}-${month}-${day}`;

    
    const pageVisitsRef = ref(database, `analytics/${currentDateStr}/${addonId}/page-visit`);
    const pageVisitsSnapshot = await get(query(pageVisitsRef))
    const pageVisitsData = pageVisitsSnapshot.val() || {};
    const pageVisits = Object.keys(pageVisitsData).length;
    result.pageVisits.push(pageVisits);

    const downloadsRef = ref(database, `analytics/${currentDateStr}/${addonId}/download`);
    const downloadsSnapshot = await get(query(downloadsRef));
    const downloadsData = downloadsSnapshot.val() || {};
    const downloads = Object.keys(downloadsData).length;
    result.downloads.push(downloads);

    const ratingRef = ref(database, `analytics/${currentDateStr}/${addonId}/rating`);
    const ratingSnapshot = await get(query(ratingRef));
    const ratingData = ratingSnapshot.val() || {};


    const ratingSum = Object.values(ratingData);
    const ratingsCount = ratingSum.length;
    const avgRating = ((ratingSum.reduce((acc, rateValue) => acc + rateValue.rating, 0)) / ratingsCount).toFixed(2);

    if(isNaN(avgRating)){
      result.averageRating.push(0)
    }else{
      result.averageRating.push(+avgRating);
      result.ratingsCount.push(ratingsCount);
    }
  
    const downloadRate =  (+pageVisits) / (+downloads);
    result.downloadRate.push(downloadRate)
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}


