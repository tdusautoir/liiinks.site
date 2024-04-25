import base from "../airtable";

type MagicLink = {
    id: string,
    email: string,
    createdAt: string
}

export async function getMagicLinkByEmail(email: string): Promise<MagicLink | null> {
    return new Promise((resolve, reject) => {
        base('magicLinks').select({
            filterByFormula: `email = "${email}"`
        }).firstPage(function (err, records) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            if (!records) {
                console.error("No records found");
                resolve(null);
                return;
            }

            if (!records.length) {
                console.error("No record found");
                resolve(null);
                return;
            }

            resolve({
                id: records[0].id,
                email: records[0].get("email") as string,
                createdAt: records[0].get("createdAt") as string
            });
        });
    });
}

export async function createMagicLinks({
    email,
}: {
    email: string
}) {
    return new Promise(async (resolve, reject) => {
        const magicLink = await getMagicLinkByEmail(email);

        if (magicLink) {
            base('magicLinks').destroy([magicLink.id], function (err, deletedRecords) {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
            });
        }

        base('magicLinks').create([{ fields: { email } }], function (err, records) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            resolve(records);
        });
    });
}