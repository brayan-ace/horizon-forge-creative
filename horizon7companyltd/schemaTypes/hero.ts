import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: '01 — Horizon 7 Company Ltd',
    }),
    defineField({
      name: 'headingLine1',
      title: 'Heading Line 1',
      type: 'string',
      initialValue: 'Engineering Excellence.',
    }),
    defineField({
      name: 'headingLine2',
      title: 'Heading Line 2',
      type: 'string',
      initialValue: 'Industrial Precision.',
    }),
    defineField({
      name: 'headingLine3',
      title: 'Heading Line 3 (Highlighted)',
      type: 'string',
      initialValue: 'Built for Tomorrow.',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel1',
      title: 'CTA Button 1 Label',
      type: 'string',
      initialValue: 'Explore Services',
    }),
    defineField({
      name: 'ctaLabel2',
      title: 'CTA Button 2 Label',
      type: 'string',
      initialValue: 'Request a Quote',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Background Images',
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
      validation: (rule) => rule.min(1).max(6),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Hero Section'}
    },
  },
})
