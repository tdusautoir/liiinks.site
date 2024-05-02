import { isEmpty } from './../utils';
import base from "../airtable";

export type LinksType = Array<{
    id: string,
    username: string,
    facebook?: string,
    instagram?: string,
    linkedin?: string,
    twitter?: string,
    behance?: string,
    personalizedLinks?: string,
    updatedAt: string,
    createdAt: string,
}>

type UpdateLinkData = Omit<Omit<Omit<Omit<LinksType[0], 'updatedAt'>, 'createdAt'>, 'id'>, 'username'>;

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
                personalizedLinks: record.get("personalizedLinks") as string | undefined,
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
                personalizedLinks: record.get("personalizedLinks") as string | undefined,
                updatedAt: record.get("updatedAt") as string,
                createdAt: record.get("createdAt") as string,
            });
        });
    });
}

export const updateLink = async (id: string, data: UpdateLinkData): Promise<LinksType[0] | null> => {
    return new Promise((resolve, reject) => {
        base('links').update([
            {
                id,
                fields: data
            }
        ], function (err, records) {
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
                personalizedLinks: record.get("personalizedLinks") as string | undefined,
                updatedAt: record.get("updatedAt") as string,
                createdAt: record.get("createdAt") as string,
            });
        });

    });
}

export const createPersonalizedLinks = async (linkId: string, label: string, url: string): Promise<{ url: string, label: string } | null> => {
    return new Promise((resolve, reject) => {
        base('links').select(
            {
                filterByFormula: `RECORD_ID() = "${linkId}"`
            }
        ).firstPage(function (err, records) {
            if (err) {
                console.log('test');
                console.error(err);
                reject(err);
                return;
            }

            if (!records || records.length === 0) {
                console.error("No records found");
                resolve(null);
                return;
            }


            const personalizedLinks = records[0].get("personalizedLinks") as string | undefined;

            let formatPersonalizedLinks = [];
            try {
                formatPersonalizedLinks = personalizedLinks !== undefined ? JSON.parse(personalizedLinks) : [];
            } catch (error) {
                console.log('error', error);
            }

            if (formatPersonalizedLinks.length >= 5) {
                reject('tooManyLinks');
                return;
            }

            base('links').update([
                {
                    id: records[0].id,
                    fields: {
                        personalizedLinks: JSON.stringify([
                            ...formatPersonalizedLinks,
                            {
                                url,
                                label
                            }
                        ])
                    }
                }
            ], function (err, records) {
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
                    url,
                    label
                });
            });
        })
    });
}