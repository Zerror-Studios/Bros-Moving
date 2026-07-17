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

const requiredFields = ['name', 'phone', 'service']

export async function POST(req) {
    try {
        if (!token) {
            return Response.json(
                { error: 'Sanity write token is missing.' },
                { status: 500 }
            )
        }

        const { name, phone, service, note } = await req.json()

        const missingField = requiredFields.find((field) => {
            if (field === 'name') return !String(name || '').trim()
            if (field === 'phone') return !String(phone || '').trim()
            if (field === 'service') return !String(service || '').trim()
            return false
        })

        if (missingField) {
            return Response.json(
                { error: `Please fill in the required field: ${missingField}.` },
                { status: 400 }
            )
        }

        const doc = await writeClient.create({
            _type: 'contactSubmission',
            name: name.trim(),
            phone: phone.trim(),
            service: service.trim(),
            note: (note || '').trim(),
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
            subject: 'New Contact Form Submission - Bros Moving',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Contact Submission Details</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9; width: 30%;">Full Name</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Phone Number</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Service</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${service}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Note</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${note || 'N/A'}</td>
                        </tr>
                    </table>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return Response.json({ id: doc._id })
    } catch (err) {
        return Response.json(
            { error: err.message || 'Submission failed. Please try again.' },
            { status: 500 }
        )
    }
}
