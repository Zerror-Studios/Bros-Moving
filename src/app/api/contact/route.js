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

        return Response.json({ id: doc._id })
    } catch (err) {
        return Response.json(
            { error: err.message || 'Submission failed. Please try again.' },
            { status: 500 }
        )
    }
}
