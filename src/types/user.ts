// this is the format i want to return the data from the DB
export type User = {
    id: string;
    email: string;
    role: string;
    created_at: Date;
};

// this is how i want to store the user in my DB
export type DBUserRow = {
    id: string;
    email: string;
    role: string;
    created_at: Date;
};

export type DBUserWithPasswordRow = DBUserRow & {
    password_hash: string | null;
};

export type TokenPayload = {
    userId: string;
    email: string;
    role: string;
};