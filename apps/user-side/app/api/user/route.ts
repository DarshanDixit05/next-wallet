import { PrismaClient } from '@next-wallet/db/client';
import { NextResponse } from 'next/server';

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email:"email.com",
            name:"test",
            number:"1919",
            password:"12121"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}