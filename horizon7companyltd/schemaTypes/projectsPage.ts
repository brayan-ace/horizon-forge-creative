import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'projectsPage',
  title: 'Projects Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageEyebrow',
      title: 'Page Eyebrow',
      type: 'string',
      initialValue: 'Portfolio',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Selected work across Cameroon.',
    }),
    defineField({
      name: 'pageIntro',
      title: 'Page Intro',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'ctaHeading',
      title: 'Bottom CTA Heading',
      type: 'string',
      initialValue: "Have a project in mind? Let's discuss the scope.",
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Projects Page'}
    },
  },
})
