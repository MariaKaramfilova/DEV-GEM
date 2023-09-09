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
import { ratingClasses } from "@mui/material";

export const fireEvent = async (
  eventType: string,
  addonId: string,
  addonName: string,
  rating?: number
) => {
  const currentDate = moment(new Date()).format("YYYY MM DD");

  const analyticsRefToAddon = ref(database, `analytics/${addonId}/`);
  const analyticsRefToDate = ref(
    database,
    `analytics/${addonId}/${currentDate}`
  );

  const snapshotAddonDate = await get(analyticsRefToDate);
  const AddonIsInData = snapshotAddonDate.exists();

  try {
    if (!AddonIsInData) {
      if (
        eventType === "downloads" ||
        eventType === "pageVisits" ||
        eventType === "rating"
      ) {
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

    if (eventType === "pageVisits") {
      updateEvent[`analytics/${addonId}/${currentDate}/${eventType}`] =
        currentData.pageVisits + 1;
    }

    if (eventType === "downloads") {
      updateEvent[`analytics/${addonId}/${currentDate}/${eventType}`] =
        currentData.downloads + 1;
    }

    if (eventType === "rating") {
      updateEvent[`analytics/${addonId}/${currentDate}/ratingsCount`] =
        currentData.ratingsCount + 1;
      updateEvent[`analytics/${addonId}/${currentDate}/ratingsSum`] =
        currentData.ratingsSum + rating;
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

  startDate = moment(startDate).format("YYYY MM DD");
  endDate = moment(endDate).format("YYYY MM DD");

  const analyticsDataSource = query(
    analyticsRef,
    orderByKey(),
    startAt(startDate),
    endAt(endDate)
  );

  try {
    const snapshot = await get(analyticsDataSource);

    return snapshot.val();
  } catch (error) {
    console.log(error);
  }
};

const getSum = (array: number[]) => {
  const sum = array.reduce((acc, value) => acc + value, 0);
  return sum;
};

export const expandAnalyticsData = async (addonId: string, startDate, endDate) => {
  try {
    const data = await getAnalyticsForAddon(addonId, startDate, endDate);

    const viewsPerDay = [];
    const downloadsPerDay = [];
    const ratingsPerDay = [];
    const ratingsCountDay = [];

    const addonNameSnapshot = await get(ref(database, `analytics/${addonId}/addonName`));
    const addonName = addonNameSnapshot.val();

    let datePoints;

    if (data) {
      datePoints = Object.keys(data).sort();
    } else {
      return {
        addonId,
        addonName,
        viewsPerDay: 0,
        downloadsPerDay: 0,
        totalViews: 0,
        totalDownloads: 0,
        downloadRate: 0,
        ratingsPerDay: 0,
        datePoints: 0,
        avgDailyRating: 0,
        totalRatings: 0,
      };
    }

    datePoints.forEach((dateKey) => {
      const dateData = data[dateKey];

      viewsPerDay.push(dateData.pageVisits);
      downloadsPerDay.push(dateData.downloads);
      ratingsCountDay.push(dateData.ratingsCount);

      const avgDailyRating = +(dateData.ratingsSum / dateData.ratingsCount).toFixed(2);

      if (Number.isNaN(avgDailyRating)) {
        ratingsPerDay.push(0);
      } else {
        ratingsPerDay.push(avgDailyRating);
      }
    });

    const filteredRatings = ratingsPerDay.filter((rating) => rating !== 0);
    let avgDailyRating =
      +((getSum(filteredRatings) / filteredRatings.length).toFixed(2)) || 0;

    const totalViews = getSum(viewsPerDay);
    const totalDownloads = getSum(downloadsPerDay);
    const totalRatings = getSum(ratingsCountDay);
    
    const downloadRate = +(totalViews / totalDownloads).toFixed(2) || 0;

    const result = {
      addonId,
      addonName,
      viewsPerDay,
      downloadsPerDay,
      totalViews,
      totalDownloads,
      downloadRate,
      ratingsPerDay,
      datePoints,
      avgDailyRating,
      totalRatings,
    };

    return result;
  } catch (error) {
    console.error('Error expanding analytics data:', error);
    throw error; // Rethrow the error for further handling
  }
};
