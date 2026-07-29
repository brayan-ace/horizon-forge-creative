import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'statsStrip',
  title: 'Stats Strip',
  type: 'document',
  fields: [
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'e.g. "+", "/7"',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Stats Strip'}
    },
  },
})
