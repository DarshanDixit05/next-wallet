import express from "express"
import prisma from "@next-wallet/db/client"

const app = express()

app.post('/hdfcWebhook', async(req:any, res:any)=>{
    const paymentData = {
        amount : req.body.amount,
        userId : req.body.userId,
        token : req.body.token
    }

    try {
        await prisma.$transaction([
            prisma.balance.update({
                where:{
                    userId:Number(paymentData.userId)
                },
                data:{
                    amount : {
                        increment : Number(paymentData.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where:{
                    token:paymentData.token
                },
                data:{
                    status:"Success"
                }
            })
        ])

        return res.status(200).json({
            message:"Completed"
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})