import {
  ref,
  set,
  get,
  query,
  startAt,
  endAt,
  orderByKey,
  update,
} from "firebase/database";
import { database } from "../config/firebase.js";
import moment from "moment";


export const fireEvent = async (
  eventType: string,
  addonId: string,
  addonName: string,
  rating?: number
) => {
  const currentDate = moment(new Date()).format('YYYY MM DD');

  const analyticsRefToAddon = ref(database, `analytics/${addonId}/`);
  const analyticsRefToDate = ref(database, `analytics/${addonId}/${currentDate}`);

  const snapshotAddonDate = await get(analyticsRefToDate);
  const AddonIsInData = snapshotAddonDate.exists();

  try {
    if (!AddonIsInData) {
      if (eventType === 'downloads' || eventType === 'pageVisits' || eventType === 'rating') {
        const newEvent = {
          addonId,
          addonName,
          [currentDate]: {
            downloads: 0,
            pageVisits: 0,
            ratingsSum: 0,
            ratingsCount: 0,
          },
        };

        await set(analyticsRefToAddon, newEvent);
        console.log(`New event object created for ${addonName}`);
        return;
      }
    }

    const snapshot = await get(analyticsRefToDate);
    const currentData = snapshot.val();

    console.log(currentData);
    
    const updateEvent = {};

    if (eventType === 'pageVisits') {
      updateEvent[`analytics/${addonId}/${currentDate}/${eventType}`] = currentData.pageVisits + 1;
    }

    if (eventType === 'downloads') {
      updateEvent[`analytics/${addonId}/${currentDate}/${eventType}`] = currentData.downloads + 1;
    }

    if (eventType === 'rating') {
      updateEvent[`analytics/${addonId}/${currentDate}/ratingsCount`] = currentData.ratingsCount + 1;
      updateEvent[`analytics/${addonId}/${currentDate}/ratingsSum`] = currentData.ratingsSum + rating;
    }

    await update(ref(database), updateEvent);

    console.log(`${eventType} event fired`);
  } catch (error) {
    console.error(error);
  }
};


export const getAnalyticsForAddon = async (
  addonId: string,
  startDate,
  endDate
) => {
  const analyticsRef = ref(database, `analytics/${addonId}/`);

  startDate = moment(startDate).format('YYYY MM DD');
  endDate = moment(endDate).format('YYYY MM DD')
  

  const analyticsDataSource = query(
    analyticsRef,
    orderByKey(),
    startAt(startDate),
    endAt(endDate)
  );

  try {
    const snapshot = await get(analyticsDataSource);
    console.log(snapshot.val());
    
    return snapshot.val();
  } catch (error) {
    console.log(error);
  }
};
