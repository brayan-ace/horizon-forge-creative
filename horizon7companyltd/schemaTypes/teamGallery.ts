import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'teamGallery',
  title: 'Team At Work Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'The Team at Work',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Precision in action.',
    }),
    defineField({
      name: 'headingHighlight',
      title: 'Heading Highlight',
      type: 'string',
      description: 'Text displayed in accent color on a second line',
      initialValue: 'Every project, every day.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Team At Work Gallery'}
    },
  },
})
