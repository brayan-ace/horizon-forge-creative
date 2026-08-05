import { getCliClient } from 'sanity/cli';
import fs from 'fs';
import path from 'path';

async function run() {
  const client = getCliClient();
  const assetsDir = path.resolve(process.cwd(), '../src/assets');
  
  console.log('Fetching services from Sanity...');
  const services = await client.fetch(`*[_type == "service"] | order(index asc) { _id, index, name }`);
  console.log(`Found ${services.length} services.`);

  const totalImages = 82;
  const images: string[] = [];
  for (let i = 1; i <= totalImages; i++) {
    const p = path.join(assetsDir, `service (${i}).jpg`);
    if (fs.existsSync(p)) {
      images.push(p);
    } else {
      console.warn(`Warning: Image not found at ${p}`);
    }
  }

  console.log(`Found ${images.length} images on disk to upload.`);

  let imageIdx = 0;
  for (const service of services) {
    if (imageIdx >= images.length) break;

    // Distribute ~8 images per service
    const count = Math.min(8, images.length - imageIdx);
    const serviceImages = images.slice(imageIdx, imageIdx + count);
    imageIdx += count;

    console.log(`Uploading ${serviceImages.length} images for service: ${service.name}...`);
    
    const assetRefs: any[] = [];
    for (const imgPath of serviceImages) {
      console.log(`  Uploading ${path.basename(imgPath)}...`);
      const asset = await client.assets.upload('image', fs.createReadStream(imgPath), {
        filename: path.basename(imgPath)
      });
      assetRefs.push({
        _type: 'image',
        _key: asset._id,
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      });
    }

    console.log(`  Patching document ${service._id} with gallery...`);
    await client.patch(service._id)
      .set({ gallery: assetRefs })
      .commit();
      
    console.log(`  Finished updating ${service.name}.`);
  }

  console.log('Migration complete! All images have been pushed to Sanity.');
}

run().catch(console.error);
