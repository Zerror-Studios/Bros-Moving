import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
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
      name: 'service',
      title: 'Service Interested In',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Additional Note',
      type: 'text',
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
      title: 'name',
      subtitle: 'service',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Anonymous Contact',
        subtitle: subtitle ? `Service: ${subtitle}` : 'No service specified',
      }
    },
  },
})
