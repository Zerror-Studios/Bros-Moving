import { defineField, defineType } from 'sanity'

const contentItem = {
  name: 'contentItem',
  title: 'Content Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'para',
      options: {
        layout: 'radio',
        list: [
          { title: 'Paragraph', value: 'para' },
          { title: 'Point', value: 'point' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'type',
    },
  },
}

export default defineType({
  name: 'post',
  title: 'Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'coverTitle',
      title: 'Cover Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'coverTitle', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cover_img',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'hero_img',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introSection',
      title: 'Intro Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          name: 'blogSection',
          title: 'Blog Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'contents',
              title: 'Contents',
              type: 'array',
              of: [contentItem],
            }),
            defineField({
              name: 'innerSections',
              title: 'Inner Sections',
              type: 'array',
              of: [
                {
                  name: 'innerSection',
                  title: 'Inner Section',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'InnerTitle',
                      title: 'Inner Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'contents',
                      title: 'Contents',
                      type: 'array',
                      of: [contentItem],
                    }),
                  ],
                  preview: {
                    select: { title: 'InnerTitle' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'coverTitle',
      subtitle: 'author',
      media: 'cover_img',
    },
  },
})
