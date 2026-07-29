import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'whyChooseUs',
  title: 'Why Choose Us Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: '03 — Why Horizon 7',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Six commitments we deliver on every project.',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'index',
              title: 'Index',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'index',
            },
          },
        },
      ],
      validation: (rule) => rule.max(8),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Why Choose Us Section'}
    },
  },
})
