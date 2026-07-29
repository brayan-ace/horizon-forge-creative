import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageEyebrow',
      title: 'Page Eyebrow',
      type: 'string',
      initialValue: 'Capabilities',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Ten integrated services. One engineering standard.',
    }),
    defineField({
      name: 'pageIntro',
      title: 'Page Intro',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'ctaEyebrow',
      title: 'Bottom CTA Eyebrow',
      type: 'string',
      initialValue: 'Bespoke Scope',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'Bottom CTA Heading',
      type: 'string',
      initialValue: "Don't see your scope listed? We build to specification.",
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Services Page'}
    },
  },
})
