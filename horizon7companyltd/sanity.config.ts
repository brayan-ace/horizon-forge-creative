import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const PREVIEW_SECRET = 'horizon7-preview-secret-2026'

export default defineConfig({
  name: 'default',
  title: 'horizon7companyltd',

  projectId: 'nz6n7tde',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  document: {
    productionUrl: async (prev, context) => {
      const {document} = context
      const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : ''
      let slug = '/'

      if (document._type === 'service' && document.slug?.current) {
        slug = `/services/${document.slug.current}`
      } else if (document._type === 'project' && document.slug?.current) {
        slug = `/projects`
      } else if (document._type === 'servicesPage') {
        slug = `/services`
      } else if (document._type === 'aboutPage') {
        slug = `/about`
      } else if (document._type === 'contactPage') {
        slug = `/contact`
      } else if (document._type === 'equipmentPage') {
        slug = `/equipment`
      } else if (document._type === 'safetyPage') {
        slug = `/safety`
      }

      return `${baseUrl}/api/preview?secret=${PREVIEW_SECRET}&slug=${encodeURIComponent(slug)}`
    },
  },

  schema: {
    types: schemaTypes,
  },
})
