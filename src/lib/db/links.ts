import base from "../airtable";

export type LinksType = Array<{
    id: string,
    username: string,
    facebook: string | undefined,
    instagram: string | undefined,
    linkedin: string | undefined,
    twitter: string | undefined,
    behance: string | undefined,
    personalizedLink: string | undefined,
    updatedAt: string,
    createdAt: string,
}>

export const getLinkByUsername = async (username: string): Promise<LinksType[0] | null> => {
    return new Promise((resolve, reject) => {
        base('links').select({
            filterByFormula: `{username} = "${username}"`
        }).firstPage(function (err, records) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            if (!records || records.length === 0) {
                console.error("No records found");
                resolve(null);
                return;
            }

            const record = records[0];

            resolve({
                id: record.id,
                username: record.get("username") as string,
                facebook: record.get("facebook") as string | undefined,
                instagram: record.get("instagram") as string | undefined,
                linkedin: record.get("linkedin") as string | undefined,
                twitter: record.get("twitter") as string | undefined,
                behance: record.get("behance") as string | undefined,
                personalizedLink: record.get("personalizedLink") as string | undefined,
                updatedAt: record.get("updatedAt") as string,
                createdAt: record.get("createdAt") as string,
            });
        });
    });
}

export const createLink = async (username: string): Promise<LinksType[0] | null> => {
    return new Promise((resolve, reject) => {
        base('links').create({
            username
        }, function (err, record) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            if (!record) {
                console.error("No record found");
                resolve(null);
                return;
            }

            resolve({
                id: record.id,
                username: record.get("username") as string,
                facebook: record.get("facebook") as string | undefined,
                instagram: record.get("instagram") as string | undefined,
                linkedin: record.get("linkedin") as string | undefined,
                twitter: record.get("twitter") as string | undefined,
                behance: record.get("behance") as string | undefined,
                personalizedLink: record.get("personalizedLink") as string | undefined,
                updatedAt: record.get("updatedAt") as string,
                createdAt: record.get("createdAt") as string,
            });
        });
    });
}