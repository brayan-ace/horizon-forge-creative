import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageEyebrow',
      title: 'Page Eyebrow',
      type: 'string',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Speak to our engineering team.',
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
      return {title: 'Contact Page'}
    },
  },
})
