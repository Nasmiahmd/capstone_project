import { minPassLen } from "../constants/minValues"
import { AppError } from "../errors/AppError"
import { signAccessToken } from "../lib/jwt"
import { createUser, findUserByEmail, findUserByEmailWithPassword } from "../repositories/user.repositories"
import bcrypt from 'bcrypt'

export async function registerUser(
    email: string,
    password: string
): Promise<void>{
    if(!email || !password){
        throw new AppError(400, "Email and password are required")
    }

    if(password.length < minPassLen){
        throw new AppError(400, "Password must be at least 6 characters long")
    }

    const normalizeEmail = email.toLowerCase().trim()

    // find the user if it's already present in db or not
    // if yes then we will not allow to register with the same email
    const existingUser = await findUserByEmail(normalizeEmail)

    if(existingUser){
        throw new AppError(409, "Email already present")
    }


    const passwordHash = await bcrypt.hash(password, 10)

    await createUser(normalizeEmail, passwordHash)
}

export async function loginUser(
    email: string,
    password: string,
): Promise<{accessToken: string}>{

    if(!email || !password){
        throw new AppError(400, "Email and password are required")
    }

    const normalizeEmail = email.toLowerCase().trim()

    const user =  await findUserByEmailWithPassword(normalizeEmail)

    if(!user?.password_hash){
        throw new AppError(401, "Invalid email or password")
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password_hash)

    if(!isPasswordValid){
        throw new AppError(401, "Invalid email or password")
    }

    const accessToken = signAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role
    })

    return {accessToken}
}
