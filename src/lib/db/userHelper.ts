import base from "../airtable";
import { LinksType, getLinkByUsername } from "./links";

export type UsersType = Array<{
    id: string,
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    bio: string | undefined,
    createdAt: string,
}>

const users: UsersType = [];

export default async function getAllUsers(): Promise<UsersType> {
    return new Promise((resolve, reject) => {
        base('users').select({
            view: "Vue de tableur"
        }).all(function (err, records) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            if (!records) {
                console.error("No records found");
                resolve([]);
                return;
            }

            records.forEach(function (record) {
                users.push({
                    id: record.id,
                    email: record.get("email") as string,
                    username: record.get("username") as string,
                    firstname: record.get("firstname") as string,
                    lastname: record.get("lastname") as string,
                    bio: record.get("bio") as string | undefined,
                    createdAt: record.get("createdAt") as string
                });
            });

            resolve(users);
        }
        )
    });
}

export async function getUserById(id: string): Promise<UsersType[0] | null> {
    return new Promise((resolve, reject) => {
        base('users').find(id, function (err, record) {
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
                email: record.get("email") as string,
                username: record.get("username") as string,
                firstname: record.get("firstname") as string,
                lastname: record.get("lastname") as string,
                bio: record.get("bio") as string | undefined,
                createdAt: record.get("createdAt") as string
            });
        });
    });
}

export async function getUserByEmail(email: string): Promise<UsersType[0] | null> {
    return new Promise((resolve, reject) => {
        base('users').select({
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
                username: records[0].get("username") as string,
                firstname: records[0].get("firstname") as string,
                lastname: records[0].get("lastname") as string,
                bio: records[0].get("bio") as string | undefined,
                createdAt: records[0].get("createdAt") as string
            });
        });
    });
}

export async function checkIfUsernameExist(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        base('users').select({
            filterByFormula: `username = "${username}"`
        }).firstPage(function (err, records) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            if (!records) {
                console.error("No records found");
                resolve(false);
                return;
            }

            if (!records.length) {
                console.error("No record found");
                resolve(false);
                return;
            }

            resolve(true);
        });
    });
}


export async function createUser({
    username,
    email,
    firstname,
    lastname
}: {
    username: string,
    email: string,
    firstname: string,
    lastname: string
}): Promise<{ email: string, username: string } | null> {
    return new Promise(async (resolve, reject) => {
        const emailAlreadyExist = await getUserByEmail(email);

        if (emailAlreadyExist) {
            reject('emailAlreadyExist');
            return;
        }

        const usernameAlreadyExist = await checkIfUsernameExist(username);

        if (usernameAlreadyExist) {
            reject('usernameAlreadyExist');
            return;
        }

        base('users').create({
            "email": email,
            "username": username,
            "firstname": firstname,
            "lastname": lastname
        }, function (err, record) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            resolve({ email, username });
        });
    });
}

export async function verifiedUser({
    id,
    emailVerified
}: {
    id: string
    emailVerified: string
}): Promise<{
    id: string,
    email: string,
    emailVerified: Date
} | null> {
    return new Promise((resolve, reject) => {
        base('users').update(id, {
            "emailVerified": emailVerified
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
                email: record.get("email") as string,
                emailVerified: new Date(record.get("emailVerified") as string)
            });
        });
    });
}

export const getUserByUsername = async (username: string): Promise<UsersType[0] | null> => {
    return new Promise((resolve, reject) => {
        base('users').select({
            filterByFormula: `username = "${username}"`
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
                username: records[0].get("username") as string,
                firstname: records[0].get("firstname") as string,
                lastname: records[0].get("lastname") as string,
                bio: records[0].get("bio") as string | undefined,
                createdAt: records[0].get("createdAt") as string
            });
        });
    });
}

export const getUserWithLinkByUsername = async (username: string): Promise<UsersType[0] & { link: LinksType[0] } & { bio: string | undefined } | null> => {
    return new Promise(async (resolve, reject) => {
        const user = await getUserByUsername(username);

        if (!user) {
            resolve(null);
            return;
        }

        const link = await getLinkByUsername(username);

        if (!link) {
            resolve(null);
            return;
        }

        resolve({
            ...user,
            link
        });
    });
}

export const updateUser = async ({
    email,
    username,
    firstname,
    lastname,
    bio,
}: {
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    bio: string | undefined
}): Promise<{ email: string, username: string, changeUsername: boolean } | null> => {
    return new Promise(async (resolve, reject) => {
        const user = await getUserByEmail(email);
        let changeUsername = false;

        if (!user) {
            reject('emailNotExist');
            return;
        }

        if (user.username !== username) {
            const usernameAlreadyExist = await checkIfUsernameExist(username);

            if (usernameAlreadyExist) {
                reject('usernameAlreadyExist');
                return;
            }

            changeUsername = true;
        }

        const link = await getLinkByUsername(user.username);

        if (!link) {
            reject('linkNotExist');
            return;
        }

        base('users').update(user.id, {
            "email": email,
            "username": username,
            "firstname": firstname,
            "lastname": lastname,
            "bio": bio
        }, function (err, record) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            base('links').update(link.id, {
                "username": username
            }, function (err, record) {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
            });

            resolve({ email, username, changeUsername });
        });
    });
}