import { createClient } from 'next-sanity'
import nodemailer from 'nodemailer'

import { apiVersion, dataset, projectId } from '@/sanity/env'

const token = process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN

const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
})

const requiredFields = ['fromZip', 'toZip', 'date', 'homeSize', 'phone']

export async function POST(req) {
    try {
        if (!token) {
            return Response.json(
                { error: 'Sanity write token is missing.' },
                { status: 500 }
            )
        }

        const { form, estimate } = await req.json()

        if (!form || !estimate) {
            return Response.json(
                { error: 'Please calculate an estimate before booking.' },
                { status: 400 }
            )
        }

        const missingField = requiredFields.find((field) => !String(form[field] || '').trim())

        if (missingField) {
            return Response.json(
                { error: 'Please fill all fields before booking.' },
                { status: 400 }
            )
        }

        const doc = await writeClient.create({
            _type: 'estimateBooking',
            fromZip: form.fromZip.trim(),
            toZip: form.toZip.trim(),
            movingDate: form.date,
            homeSize: form.homeSize,
            phone: form.phone.trim(),
            distanceKm: Number(estimate.kms),
            movingCost: Number(estimate.movingCost),
            laborHours: Number(estimate.hours),
            laborCost: Number(estimate.laborCost),
            totalEstimate: Number(estimate.total),
            status: 'new',
            submittedAt: new Date().toISOString(),
        })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_USER,
                pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL_USER,
            to: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
            subject: 'New Estimate Booking - Bros Moving',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Estimate Booking Details</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">From Zip</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${form.fromZip}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">To Zip</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${form.toZip}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Moving Date</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${form.date}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Home Size</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${form.homeSize}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Phone Number</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${form.phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Distance</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${Number(estimate.kms).toFixed(1)} km</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Moving Cost</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">$${Number(estimate.movingCost).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Labor Cost</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">$${Number(estimate.laborCost).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Total Estimate</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">$${Number(estimate.total).toFixed(2)}</td>
                        </tr>
                    </table>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return Response.json({ id: doc._id })
    } catch (err) {
        return Response.json(
            { error: err.message || 'Booking failed. Please try again.' },
            { status: 500 }
        )
    }
}
