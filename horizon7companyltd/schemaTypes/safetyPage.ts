import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'safetyPage',
  title: 'Safety Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageEyebrow',
      title: 'Page Eyebrow',
      type: 'string',
      initialValue: 'HSE & Quality',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Zero harm. Documented quality. International discipline.',
    }),
    defineField({
      name: 'pageIntro',
      title: 'Page Intro',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'commitmentEyebrow',
      title: 'Commitment Section Eyebrow',
      type: 'string',
      initialValue: 'Commitment',
    }),
    defineField({
      name: 'commitmentHeading',
      title: 'Commitment Heading',
      type: 'string',
      initialValue: 'Every shift ends the way it started — safely.',
    }),
    defineField({
      name: 'commitmentParagraph',
      title: 'Commitment Paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'commitmentImage',
      title: 'Commitment Section Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'pillarsEyebrow',
      title: 'Pillars Section Eyebrow',
      type: 'string',
      initialValue: 'Five Pillars',
    }),
    defineField({
      name: 'pillarsHeading',
      title: 'Pillars Section Heading',
      type: 'string',
      initialValue: 'How safety and quality are embedded in every project.',
    }),
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
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
            select: {title: 'title'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Safety Page'}
    },
  },
})
