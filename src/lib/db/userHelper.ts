import base from "../airtable";

export type UsersType = Array<{
    id: string,
    email: string,
    firstname: string | null,
    lastname: string | null,
    createdAt: string | null
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
                    firstname: record.get("firstname") as string | null,
                    lastname: record.get("lastname") as string | null,
                    createdAt: record.get("createdAt") as string | null
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
                firstname: record.get("firstname") as string | null,
                lastname: record.get("lastname") as string | null,
                createdAt: record.get("createdAt") as string | null
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
                firstname: records[0].get("firstname") as string | null,
                lastname: records[0].get("lastname") as string | null,
                createdAt: records[0].get("createdAt") as string | null
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
}): Promise<{ email: string } | null> {
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
            "firstname": firstname,
            "lastname": lastname
        }, function (err, record) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            resolve({ email });
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