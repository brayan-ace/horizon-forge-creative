import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'introBand',
  title: 'Intro Band Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'About',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      initialValue: 'A Cameroonian engineering firm building to international standards.',
    }),
    defineField({
      name: 'paragraph1',
      title: 'Paragraph 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'paragraph2',
      title: 'Paragraph 2',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      initialValue: 'Read our story',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Intro Band Section'}
    },
  },
})
