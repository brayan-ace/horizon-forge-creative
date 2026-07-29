import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'equipmentPage',
  title: 'Equipment Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageEyebrow',
      title: 'Page Eyebrow',
      type: 'string',
      initialValue: 'Equipment Rental',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'A maintained fleet, dispatched nationwide.',
    }),
    defineField({
      name: 'pageIntro',
      title: 'Page Intro',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Equipment Page'}
    },
  },
})
