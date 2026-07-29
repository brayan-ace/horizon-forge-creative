import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: 'nz6n7tde',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01'
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)