import { createClient } from 'next-sanity'

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

        return Response.json({ id: doc._id })
    } catch (err) {
        return Response.json(
            { error: err.message || 'Booking failed. Please try again.' },
            { status: 500 }
        )
    }
}
