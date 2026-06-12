import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'estimateBooking',
  title: 'Estimate Bookings',
  type: 'document',
  fields: [
    defineField({
      name: 'fromZip',
      title: 'From Zip',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'toZip',
      title: 'To Zip',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'movingDate',
      title: 'Moving Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'homeSize',
      title: 'Home Size',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'distanceKm',
      title: 'Distance (km)',
      type: 'number',
    }),
    defineField({
      name: 'movingCost',
      title: 'Moving Cost',
      type: 'number',
    }),
    defineField({
      name: 'laborHours',
      title: 'Labor Hours',
      type: 'number',
    }),
    defineField({
      name: 'laborCost',
      title: 'Labor Cost',
      type: 'number',
    }),
    defineField({
      name: 'totalEstimate',
      title: 'Total Estimate',
      type: 'number',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'phone',
      subtitle: 'movingDate',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Estimate Booking',
        subtitle: subtitle ? `Moving date: ${subtitle}` : 'No moving date',
      }
    },
  },
})
