import {
  ref,
  set,
  get,
  query,
  startAt,
  endAt,
  orderByKey,
  update,
  remove,
} from "firebase/database";
import { database } from "../config/firebase.js";
import moment from "moment";


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

  const snapshotAddonDate = await get(analyticsRefToAddon);

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
            pageVisits: 1,
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

    if (!snapshot.exists()) {
      const newDate = {
        downloads: 0,
        pageVisits: 1,
        ratingsSum: 0,
        ratingsCount: 0,
      };

      await set(analyticsRefToDate, newDate);
      return;
    }

    const currentData = snapshot.val();

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

export const expandAnalyticsData = async (
  addonId: string,
  startDate: Date,
  endDate: Date,
) => {
  try {
    
    const data = await getAnalyticsForAddon(addonId, startDate, endDate);

    const viewsPerDay: number[] = [];
    const downloadsPerDay: number[] = [];
    const ratingsPerDay: number[] = [];
    const ratingsCountDay: number[] = [];

    const addonNameSnapshot = await get(
      ref(database, `analytics/${addonId}/addonName`)
    );
    const addonName = addonNameSnapshot.val();

    let datePoints;

    if (data) {
      datePoints = Object.keys(data).sort();
    } else {
      return {
        addonId,
        addonName,
        viewsPerDay: [0],
        downloadsPerDay: [0],
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

      const avgDailyRating = +(
        dateData.ratingsSum / dateData.ratingsCount
      ).toFixed(2);

      if (Number.isNaN(avgDailyRating)) {
        ratingsPerDay.push(0);
      } else {
        ratingsPerDay.push(avgDailyRating);
      }
    });

    const filteredRatings = ratingsPerDay.filter((rating) => rating !== 0);
    let avgDailyRating =
      +(getSum(filteredRatings) / filteredRatings.length).toFixed(2) || 0;

    const totalViews = getSum(viewsPerDay);
    const totalDownloads = getSum(downloadsPerDay);
    const totalRatings = getSum(ratingsCountDay);

    const downloadRate =
      totalDownloads !== 0 ? +(totalViews / totalDownloads).toFixed(2) : 0;

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
    console.error("Error expanding analytics data:", error);
    throw error; // Rethrow the error for further handling
  }
};

export const generateDataForBumpChart = (analyticsData) => {
  const result = analyticsData.map((addonData) => {
    let x = 1;

    let data;

    if(addonData.downloadsPerDay){
      data = addonData.downloadsPerDay.map((dayValue) => {
        return {
          x: x++,
          y: dayValue,
        };
      });
    }

    return {
      id: addonData.addonName,
      data,
    };
  });

  return result;
};

export const generateDataForLineChart = (analyticsData) => {

  const result = analyticsData.map((addonData) => {
    let x = 1;

    let data;

    if(addonData.downloadsPerDay){
      data = addonData.downloadsPerDay.map((dayValue) => {
        return {
          x: x++,
          y: dayValue,
        };
      });
    }

    return {
      id: addonData.addonName,
      data,
    };
  });

  return result;
};

export const generateDataForPieChart = (analyticsData) => {
  const result = analyticsData.map((addonData) => {
    return {
      id: addonData.addonName,
      label: addonData.addonName,
      value: addonData.totalDownloads,
    };
  });

  return result;
};

export const followAddon = async (addonId: string, userName: string) => {
  try {
    const updatedFollowing = {};

    updatedFollowing[`/users/${userName}/following/${addonId}`] = true;

    await update(ref(database), updatedFollowing);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Addon unfollowed");
  }
};

export const unfollowAddon = async (addonId: string, userName: string) => {
  try {
    const followRef = ref(database, `/users/${userName}/following/${addonId}`);
    await remove(followRef);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Addon unfollowed");
  }
};


export const checkIfAddonsIsFollowed = async(userName:string, addonId:string) => {

  const followingRef = ref(database, `/users/${userName}/following/${addonId}`);
  const snapshot = await get(followingRef);

  if(snapshot.exists()){
    return true;
  }

  return false;

}

export const getFollowedAddons = async(userName: string) => {

  const source = ref(database, `/users/${userName}/following/`);

  const snapshot = await get(source);

  if(snapshot.exists()){
    const objectWithFollowedAddons = snapshot.val();
    const result = Object.keys(objectWithFollowedAddons);
    
    return result;
  }
  
  return [];

}