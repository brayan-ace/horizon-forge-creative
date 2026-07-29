import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageEyebrow',
      title: 'Page Eyebrow',
      type: 'string',
      initialValue: 'About Horizon 7',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'A Cameroonian engineering company built for continental delivery.',
    }),
    defineField({
      name: 'pageIntro',
      title: 'Page Intro',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'storyEyebrow',
      title: 'Story Section Eyebrow',
      type: 'string',
      initialValue: 'Our Story',
    }),
    defineField({
      name: 'storyHeading',
      title: 'Story Section Heading',
      type: 'string',
      initialValue: 'Precision is not a promise. It is a procedure.',
    }),
    defineField({
      name: 'storyParagraph1',
      title: 'Story Paragraph 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'storyParagraph2',
      title: 'Story Paragraph 2',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'storyImage',
      title: 'Story Image',
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
      name: 'valuesEyebrow',
      title: 'Values Section Eyebrow',
      type: 'string',
      initialValue: 'Values',
    }),
    defineField({
      name: 'valuesHeading',
      title: 'Values Section Heading',
      type: 'string',
      initialValue: 'The commitments that shape our work.',
    }),
    defineField({
      name: 'values',
      title: 'Values',
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
      return {title: 'About Page'}
    },
  },
})
