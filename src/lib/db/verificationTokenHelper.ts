import base from "../airtable";
import { VerificationToken } from "next-auth/adapters";

export async function getVerificationTokenByEmail(email: string): Promise<VerificationToken | null> {
    return new Promise((resolve, reject) => {
        base('verificationToken').select({
            filterByFormula: `identifier = "${email}"`
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
                token: records[0].get("token") as string,
                identifier: records[0].get("identifier") as string,
                expires: new Date(records[0].get("expires") as string)
            });
        });
    });
}

export async function createVerificationToken({
    identifier,
    token,
    expires
}: VerificationToken): Promise<VerificationToken | null> {
    return new Promise(async (resolve, reject) => {
        base('verificationToken').create({
            identifier,
            token,
            expires: expires.toISOString(),
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
                token: record.get("token") as string,
                identifier: record.get("identifier") as string,
                expires: new Date(record.get("expires") as string)
            });
        });
    });
}

export async function deleteVerificationToken(token: string): Promise<VerificationToken | null> {
    return new Promise((resolve, reject) => {
        base('verificationToken').select({
            filterByFormula: `token = "${token}"`,
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

            base('verificationToken').destroy(records[0].id, function (err, deletedRecord) {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                if (!deletedRecord) {
                    console.error("No record found");
                    resolve(null);
                    return;
                }

                resolve({
                    token: records[0].get("token") as string,
                    identifier: records[0].get("identifier") as string,
                    expires: new Date(records[0].get("expires") as string)
                });
            });
        })
    })
}
