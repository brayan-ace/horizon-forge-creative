import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'ctaBand',
  title: 'CTA Band Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Ready to build with precision?',
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel1',
      title: 'CTA Button 1 Label',
      type: 'string',
      initialValue: 'Request a Quote',
    }),
    defineField({
      name: 'ctaLabel2',
      title: 'CTA Button 2 Label',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    prepare() {
      return {title: 'CTA Band Section'}
    },
  },
})
