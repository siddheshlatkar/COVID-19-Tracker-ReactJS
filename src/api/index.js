import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changableURL = url;
    if (country) {
        changableURL = `${url}/countries/${country}`
    }
    try {
        const {data : {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changableURL);
        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate,
        }

    } catch (e) {
        console.log('fetchData api failed');
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate,
        }));
        return modifiedData;
    } catch (e) {
        console.log("error in fetching daily data");
    }
};

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch(e) {
        console.log('error in fetching coutries');
    }
}
