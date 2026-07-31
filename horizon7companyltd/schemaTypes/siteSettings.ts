import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Global Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Global Description (Used in Footer & SEO)',
      type: 'text',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number (Display)',
      type: 'string',
    }),
    defineField({
      name: 'whatsappRaw',
      title: 'WhatsApp Number (For Link)',
      description: 'Only numbers and country code without +, e.g., 237693790123',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'string',
    }),
    defineField({
      name: 'mapLink',
      title: 'Google Maps Link',
      type: 'url',
    }),
    defineField({
      name: 'mapEmbed',
      title: 'Google Maps Embed URL',
      type: 'url',
    }),
    defineField({
      name: 'hours',
      title: 'Operating Hours',
      type: 'string',
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Accent Color (Hex)',
      description: 'Used for buttons and highlights (e.g., #F77F00)',
      type: 'string',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Background / Secondary Color (Hex)',
      description: 'Used for the main site background and footer (e.g., #0D1B2A)',
      type: 'string',
    }),
    defineField({
      name: 'navigation',
      title: 'Main Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'to', type: 'string', title: 'Path (e.g., /about)'},
          ],
        },
      ],
    }),
  ],
})
