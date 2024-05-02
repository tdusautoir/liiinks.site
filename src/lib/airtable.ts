import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base('appLn04nZzsaoTU8s');
export default base;