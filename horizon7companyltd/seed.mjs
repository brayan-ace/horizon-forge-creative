/**
 * Seed script — populates Sanity Studio with the current hardcoded content.
 *
 * Prerequisites:
 *   1. Generate a write token at https://sanity.io/manage → API → Tokens → Add API token (Editor)
 *   2. Run:  SANITY_TOKEN=sk-... node seed.mjs
 *
 * This script:
 *   - Uploads all local images from ../src/assets/ to Sanity
 *   - Creates singleton documents (hero, introBand, statsStrip, whyChooseUs, etc.)
 *   - Creates document-type entries (services, projects, testimonials, equipment)
 */

import {createClient} from '@sanity/client'
import {readFileSync, existsSync} from 'fs'
import {resolve, basename} from 'path'
import {fileURLToPath} from 'url'
import {dirname} from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌ Missing SANITY_TOKEN. Generate one at https://sanity.io/manage → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: 'nz6n7tde',
  dataset: 'production',
  token,
  useCdn: false,
  apiVersion: '2024-01-01',
})

const ASSETS_DIR = resolve(__dirname, '..', 'src', 'assets')

// ─── Image Upload ────────────────────────────────────────────
const imageCache = {}

async function uploadImage(filename) {
  if (imageCache[filename]) return imageCache[filename]

  const filePath = resolve(ASSETS_DIR, filename)
  if (!existsSync(filePath)) {
    console.warn(`⚠ Image not found: ${filePath}`)
    return null
  }

  console.log(`  📸 Uploading ${filename}...`)
  const buffer = readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, {
    filename,
  })

  const ref = {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
  imageCache[filename] = ref
  return ref
}

async function uploadImageWithAlt(filename, alt) {
  const base = await uploadImage(filename)
  if (!base) return null
  return {...base, alt}
}

// ─── Create or Replace Document ─────────────────────────────
async function upsert(doc) {
  const existing = await client.fetch(`*[_id == $id][0]`, {id: doc._id})
  if (existing) {
    console.log(`  ♻ Replacing ${doc._id}...`)
    await client.delete(doc._id)
  }
  console.log(`  ✅ Creating ${doc._id}...`)
  await client.create(doc)
}

// ═══════════════════════════════════════════════════════════════
//  SEED DATA
// ═══════════════════════════════════════════════════════════════

async function seedHero() {
  console.log('\n🏠 Hero Section')
  const images = await Promise.all([
    uploadImageWithAlt(
      'hero-welder.jpg',
      'Horizon 7 industrial engineering and construction in Cameroon',
    ),
    uploadImageWithAlt('civil-engineering.jpg', 'Civil engineering project'),
    uploadImageWithAlt('crane-dusk.jpg', 'Crane operations at dusk'),
    uploadImageWithAlt('fabrication-yard.jpg', 'Fabrication yard operations'),
  ])

  await upsert({
    _id: 'hero',
    _type: 'hero',
    eyebrow: '01 — Horizon 7 Company Ltd',
    headingLine1: 'Engineering Excellence.',
    headingLine2: 'Industrial Precision.',
    headingLine3: 'Built for Tomorrow.',
    subtitle:
      'Horizon 7 Company Ltd delivers world-class engineering, fabrication, construction and industrial solutions across Cameroon and Central Africa.',
    ctaLabel1: 'Explore Services',
    ctaLabel2: 'Request a Quote',
    heroImages: images.filter(Boolean),
  })
}

async function seedIntroBand() {
  console.log('\n📋 Intro Band')
  await upsert({
    _id: 'introBand',
    _type: 'introBand',
    eyebrow: 'About',
    heading: 'A Cameroonian engineering firm building to international standards.',
    paragraph1:
      'Horizon 7 Company Ltd is an industrial engineering and construction firm delivering coded welding, precision fabrication, civil works and heavy equipment services to refineries, power plants, mines and government infrastructure programs across Central Africa.',
    paragraph2:
      'Our discipline is engineering-led. Every scope is planned, executed and handed over with the documentation, safety record and quality control our clients expect from world-class contractors.',
    linkText: 'Read our story',
  })
}

async function seedStatsStrip() {
  console.log('\n📊 Stats Strip')
  await upsert({
    _id: 'statsStrip',
    _type: 'statsStrip',
    stats: [
      {_key: 's1', value: 12, suffix: '+', label: 'Years Building'},
      {_key: 's2', value: 180, suffix: '+', label: 'Projects Delivered'},
      {_key: 's3', value: 350, suffix: '+', label: 'Skilled Workforce'},
      {_key: 's4', value: 24, suffix: '/7', label: 'Field Response'},
    ],
  })
}

async function seedWhyChooseUs() {
  console.log('\n⭐ Why Choose Us')
  await upsert({
    _id: 'whyChooseUs',
    _type: 'whyChooseUs',
    eyebrow: '03 — Why Horizon 7',
    heading: 'Six commitments we deliver on every project.',
    items: [
      {
        _key: 'w1',
        index: '01',
        title: 'Experienced Professionals',
        body: 'Certified engineers, coded welders and site managers with decades of combined heavy-industry experience.',
      },
      {
        _key: 'w2',
        index: '02',
        title: 'Safety First',
        body: 'Zero-harm culture. Statutory HSE compliance, daily toolbox talks, permit-to-work discipline on every site.',
      },
      {
        _key: 'w3',
        index: '03',
        title: 'Quality Assurance',
        body: 'ISO-aligned QA/QC procedures with full documentation, NDT and traceability for every deliverable.',
      },
      {
        _key: 'w4',
        index: '04',
        title: 'Modern Equipment',
        body: 'Maintained fleet of excavators, cranes, welding sets and PWHT rigs — always inspection-ready.',
      },
      {
        _key: 'w5',
        index: '05',
        title: 'Reliable Delivery',
        body: 'Schedule-driven project management with weekly progress reporting and transparent cost control.',
      },
      {
        _key: 'w6',
        index: '06',
        title: 'Engineering Excellence',
        body: 'Engineering-led approach: we design it right, build it right, and hand it over inspection-ready.',
      },
    ],
  })
}

async function seedTeamGallery() {
  console.log('\n📷 Team At Work Gallery')
  const galleryFiles = [
    {file: 'fleet (6).jpg', alt: 'Horizon 7 heavy equipment operations'},
    {file: 'fleet (21).jpg', alt: 'Structural steel erection on site'},
    {file: 'fleet (3).jpg', alt: 'Industrial fabrication in progress'},
    {file: 'fleet (19).jpg', alt: 'Precision engineering works'},
    {file: 'fleet (11).jpg', alt: 'Site mobilisation and earthworks'},
    {file: 'fleet (8).jpg', alt: 'Heavy machinery deployment'},
    {file: 'fleet (23).jpg', alt: 'Large-scale construction project'},
    {file: 'fleet (14).jpg', alt: 'Welding and fabrication operations'},
    {file: 'fleet (5).jpg', alt: 'Equipment fleet on location'},
    {file: 'fleet (17).jpg', alt: 'Civil engineering infrastructure'},
    {file: 'fleet (9).jpg', alt: 'Industrial project execution'},
    {file: 'fleet (22).jpg', alt: 'On-site crane operations'},
    {file: 'fleet (12).jpg', alt: 'Steel structure assembly'},
    {file: 'fleet (16).jpg', alt: 'Field engineering works'},
    {file: 'fleet (10).jpg', alt: 'Heavy-duty machinery at work'},
  ]

  const images = []
  for (const g of galleryFiles) {
    const img = await uploadImageWithAlt(g.file, g.alt)
    if (img) images.push({...img, _key: `tg-${images.length}`})
  }

  await upsert({
    _id: 'teamGallery',
    _type: 'teamGallery',
    eyebrow: 'The Team at Work',
    heading: 'Precision in action.',
    headingHighlight: 'Every project, every day.',
    description:
      'From heavy-lift crane operations to coded welding — a glimpse into the discipline, scale and craftsmanship that define Horizon 7.',
    images,
  })
}

async function seedCtaBand() {
  console.log('\n📣 CTA Band')
  const bgImage = await uploadImage('crane-dusk.jpg')
  await upsert({
    _id: 'ctaBand',
    _type: 'ctaBand',
    heading: 'Ready to build with precision?',
    paragraph:
      "Speak to our engineering team. Share your scope, timeline and location — we'll come back within one working day.",
    ctaLabel1: 'Request a Quote',
    ctaLabel2: 'Contact Us',
    backgroundImage: bgImage,
  })
}

async function seedServices() {
  console.log('\n🔧 Services')
  const serviceData = [
    {
      slug: 'industrial-welding',
      index: '01',
      name: 'Industrial Welding',
      short: 'Certified welding for heavy structural and pressure systems.',
      description:
        'Certified MIG, TIG, arc and specialty welding delivered by qualified welders for structural, pressure and high-integrity industrial applications.',
      image: 'hero-welder.jpg',
      capabilities: [
        'Structural steel welding',
        'Pressure vessel welding',
        'MIG / TIG / SMAW / FCAW',
        'AWS D1.1 & ASME IX qualified procedures',
        'On-site and workshop fabrication',
      ],
    },
    {
      slug: 'mechanical-fabrication',
      index: '02',
      name: 'Mechanical Fabrication',
      short: 'Precision steel fabrication engineered to specification.',
      description:
        'In-house fabrication of steel structures, skids, tanks, ducting and custom mechanical assemblies — engineered to spec and delivered to site.',
      image: 'fabrication-yard.jpg',
      capabilities: [
        'Structural steel assemblies',
        'Process skids & modular units',
        'Tanks, hoppers, silos',
        'CNC plasma & press-brake forming',
        'Full traceability & QA/QC dossiers',
      ],
    },
    {
      slug: 'scaffolding-mounting',
      index: '03',
      name: 'Scaffolding & Mounting',
      short: 'Safe access solutions engineered for complex worksites.',
      description:
        'Engineered scaffolding, industrial mounting and safe access systems for refineries, plants and civil sites — built to international safety standards.',
      image: 'scaffolding.jpg',
      capabilities: [
        'Tube & fitting scaffold',
        'Cup-lock and system scaffold',
        'Suspended and cantilever platforms',
        'Certified scaffold inspectors',
        'Statutory HSE compliance',
      ],
    },
    {
      slug: 'post-weld-heat-treatment',
      index: '04',
      name: 'Post Weld Heat Treatment',
      short: 'Controlled thermal cycles for weld integrity and stress relief.',
      description:
        'Controlled electrical resistance and induction PWHT to eliminate residual stress and meet ASME / API standards for pipelines and pressure equipment.',
      image: 'heat-treatment.jpg',
      capabilities: [
        'Electrical resistance PWHT',
        'Induction heating',
        'Programmable thermal cycles',
        'Chart-recorded documentation',
        'ASME / API compliant procedures',
      ],
    },
    {
      slug: 'pipe-welding',
      index: '05',
      name: 'Pipe Welding',
      short: 'Coded pipe welding for oil, gas, power and process plants.',
      description:
        'Coded pipe welders and rigorous QA/QC for carbon steel, stainless and alloy pipework across oil & gas, power generation and process industries.',
      image: 'pipe-welding.jpg',
      capabilities: [
        'Carbon, stainless & duplex alloys',
        'GTAW root + fill/cap passes',
        'Orbital and manual welding',
        'NDT & radiographic acceptance',
        '6G qualified welders',
      ],
    },
    {
      slug: 'civil-engineering',
      index: '06',
      name: 'Civil Engineering',
      short: 'Infrastructure engineered for the terrain and the timeline.',
      description:
        'Foundations, roads, bridges, drainage and reinforced concrete works — engineered for African terrain and delivered on schedule.',
      image: 'civil-engineering.jpg',
      capabilities: [
        'Reinforced concrete works',
        'Roadworks & earthworks',
        'Bridge & culvert construction',
        'Foundations & pile caps',
        'Site drainage & utilities',
      ],
    },
    {
      slug: 'construction',
      index: '07',
      name: 'Construction',
      short: 'Turn-key construction from foundation to commissioning.',
      description:
        'Turn-key industrial and commercial construction — from foundation through structural erection, mechanical installation and final commissioning.',
      image: 'crane-dusk.jpg',
      capabilities: [
        'Industrial buildings & warehouses',
        'Commercial construction',
        'Structural steel erection',
        'MEP coordination',
        'Handover & commissioning',
      ],
    },
    {
      slug: 'equipment-rentals',
      index: '08',
      name: 'Equipment Rentals',
      short: 'Modern equipment fleet available across Cameroon.',
      description:
        'Modern excavators, cranes, boom lifts, forklifts and generators — maintained, inspected and dispatched with operators when required.',
      image: 'excavator.jpg',
      capabilities: [
        'Short and long-term rental',
        'Operator supply',
        'Preventive maintenance',
        '24/7 field support',
        'Nationwide dispatch',
      ],
    },
    {
      slug: 'heavy-duty-machinery',
      index: '09',
      name: 'Heavy Duty Machinery',
      short: 'Bulldozers, cranes and heavy transport for major projects.',
      description:
        'Bulldozers, tower cranes, dump trucks and heavy transport equipment for large-scale infrastructure, mining and industrial projects.',
      image: 'heavy-fleet.jpg',
      capabilities: [
        'Crawler & wheel dozers',
        'Tower and mobile cranes',
        'Articulated dump trucks',
        'Low-loader transport',
        'Certified operators',
      ],
    },
    {
      slug: 'industrial-rope-access',
      index: '10',
      name: 'Industrial Rope Access',
      short: 'Certified IRATA at-height engineering, welding & inspection.',
      description:
        'Certified IRATA Level 1–3 rope access technicians for high-altitude welding, NDT inspection, structural maintenance, and pipework in tight or elevated industrial environments without heavy scaffolding.',
      image: 'rope-access.png',
      capabilities: [
        'IRATA / SPRAT certified Level 1-3 technicians',
        'High-altitude & offshore structural welding',
        'Non-Destructive Testing (NDT) & flare stack inspection',
        'Confined space & high-elevation maintenance',
        'Rapid rigging & zero-ground-footprint deployment',
      ],
    },
  ]

  for (const s of serviceData) {
    const img = await uploadImageWithAlt(s.image, s.name)
    await upsert({
      _id: `service-${s.slug}`,
      _type: 'service',
      index: s.index,
      name: s.name,
      slug: {_type: 'slug', current: s.slug},
      short: s.short,
      description: s.description,
      image: img,
      capabilities: s.capabilities,
    })
  }
}

async function seedProjects() {
  console.log('\n🏗 Projects')
  const projectData = [
    {
      slug: 'coastal-fabrication',
      name: 'Coastal Structural Fabrication',
      category: 'Fabrication',
      location: 'Coastal Region, Cameroon',
      status: 'Completed',
      description:
        'Fabrication and erection of 2,400 tonnes of structural steel for a deep-water port expansion program.',
      image: 'fabrication-yard.jpg',
    },
    {
      slug: 'douala-refinery-shutdown',
      name: 'Refinery Turnaround Support',
      category: 'Welding & PWHT',
      location: 'Douala, Cameroon',
      status: 'Completed',
      description:
        '48-day refinery turnaround: pipe welding, PWHT and scaffolding for critical process units.',
      image: 'scaffolding.jpg',
    },
    {
      slug: 'yaounde-highway',
      name: 'Highway Bridge Construction',
      category: 'Civil Engineering',
      location: 'Centre Region',
      status: 'In Progress',
      description:
        'Design-and-build of a 320-metre reinforced concrete bridge on a national highway corridor.',
      image: 'civil-engineering.jpg',
    },
    {
      slug: 'limbe-power-plant',
      name: 'Power Plant Piping',
      category: 'Pipe Welding',
      location: 'Limbé, Cameroon',
      status: 'Completed',
      description:
        'Precision welding of high-pressure steam and cooling water piping for a thermal power facility.',
      image: 'pipe-welding.jpg',
    },
    {
      slug: 'bamenda-warehouse',
      name: 'Industrial Warehouse Complex',
      category: 'Construction',
      location: 'Bamenda, Cameroon',
      status: 'Completed',
      description:
        '18,000 m² pre-engineered warehouse complex with mezzanine, dock levellers and site infrastructure.',
      image: 'crane-dusk.jpg',
    },
    {
      slug: 'garoua-mining-support',
      name: 'Mining Equipment Deployment',
      category: 'Equipment',
      location: 'Garoua, Cameroon',
      status: 'In Progress',
      description:
        'Long-term deployment of heavy earthmoving fleet supporting a strategic mining operation.',
      image: 'heavy-fleet.jpg',
    },
  ]

  for (const p of projectData) {
    const img = await uploadImageWithAlt(p.image, p.name)
    await upsert({
      _id: `project-${p.slug}`,
      _type: 'project',
      name: p.name,
      slug: {_type: 'slug', current: p.slug},
      category: p.category,
      location: p.location,
      status: p.status,
      description: p.description,
      image: img,
    })
  }
}

async function seedTestimonials() {
  console.log('\n💬 Testimonials')
  const testimonialData = [
    {
      quote:
        "Horizon 7 executed our refinery turnaround on schedule and without a single lost-time incident. Their welders and QA discipline are on par with the best international contractors we've engaged.",
      author: 'Project Director',
      role: 'Downstream Operator, Douala',
    },
    {
      quote:
        'The precision of their fabrication and the professionalism on site is exceptional. Horizon 7 has become our first call for structural steel and heavy lifting.',
      author: 'Head of Engineering',
      role: 'EPC Contractor, Central Africa',
    },
    {
      quote:
        'We brought them in for emergency pipeline repair. Their team mobilized within hours and delivered flawless code-compliant welds under immense pressure.',
      author: 'Operations Manager',
      role: 'National Oil Company',
    },
    {
      quote:
        'Safety, speed, and accuracy. Horizon 7 redefined what we expect from local civil engineering partners. Their attention to international standards is remarkable.',
      author: 'Site Supervisor',
      role: 'Mining Corp, Garoua',
    },
    {
      quote:
        'Renting their heavy equipment fleet gave us the exact flexibility we needed. Outstanding maintenance records and highly skilled operators out of the box.',
      author: 'Procurement Lead',
      role: 'Infrastructure Group',
    },
    {
      quote:
        'They handled the steel erection for our 18,000 m² warehouse flawlessly. True engineering excellence down to the last bolt.',
      author: 'Logistics Director',
      role: 'Regional Distribution Center',
    },
    {
      quote:
        "Horizon 7 isn't just a contractor; they are a strategic partner. Their proactive problem-solving saved us millions on our recent power plant shutdown.",
      author: 'Plant Manager',
      role: 'Thermal Energy Facility',
    },
    {
      quote:
        'From planning to execution, their civil works team is unmatched in Central Africa. A seamless experience from day one.',
      author: 'Lead Architect',
      role: 'Urban Development Agency',
    },
  ]

  for (let i = 0; i < testimonialData.length; i++) {
    const t = testimonialData[i]
    await upsert({
      _id: `testimonial-${i + 1}`,
      _type: 'testimonial',
      quote: t.quote,
      author: t.author,
      role: t.role,
    })
  }
}

async function seedEquipment() {
  console.log('\n🚜 Equipment')
  const equipmentData = [
    {
      slug: 'excavators',
      name: 'Excavators & Earthmovers',
      category: 'Earthmoving',
      specs: [
        {label: 'Class', value: '20 – 45 t'},
        {label: 'Bucket', value: '0.9 – 2.4 m³'},
        {label: 'Reach', value: 'up to 11 m'},
      ],
      availability: 'Available',
      image: 'fleet (1).jpg',
    },
    {
      slug: 'bulldozers',
      name: 'Heavy Duty Bulldozers',
      category: 'Earthmoving',
      specs: [
        {label: 'Class', value: 'D6 – D9'},
        {label: 'Power', value: '215 – 410 HP'},
        {label: 'Blade', value: 'SU / U'},
      ],
      availability: 'Available',
      image: 'fleet (26).jpg',
    },
    {
      slug: 'cranes',
      name: 'Mobile & Tower Cranes',
      category: 'Lifting',
      specs: [
        {label: 'Capacity', value: '25 – 250 t'},
        {label: 'Type', value: 'Mobile / Tower'},
        {label: 'Reach', value: 'up to 60 m'},
      ],
      availability: 'Available',
      image: 'fleet (24).jpg',
    },
    {
      slug: 'dump-trucks',
      name: 'Articulated Dump Trucks',
      category: 'Haulage',
      specs: [
        {label: 'Payload', value: '15 – 40 t'},
        {label: 'Type', value: 'Rigid / Articulated'},
        {label: 'Drive', value: '6×4 / 6×6'},
      ],
      availability: 'Available',
      image: 'fleet (25).jpg',
    },
    {
      slug: 'heavy-duty-trucks',
      name: 'Heavy Duty Logistics Trucks',
      category: 'Transport',
      specs: [
        {label: 'Class', value: 'Prime movers'},
        {label: 'Payload', value: 'up to 60 t'},
        {label: 'Trailers', value: 'Low-loader / Flatbed'},
      ],
      availability: 'Available',
      image: 'fleet (25).jpg',
    },
    {
      slug: 'forklifts',
      name: 'Forklifts',
      category: 'Material Handling',
      specs: [
        {label: 'Capacity', value: '3 – 10 t'},
        {label: 'Lift', value: 'up to 6 m'},
        {label: 'Fuel', value: 'Diesel / LPG'},
      ],
      availability: 'Available',
      image: 'fabrication-yard.jpg',
    },
    {
      slug: 'boom-lifts',
      name: 'Boom Lifts',
      category: 'Access',
      specs: [
        {label: 'Height', value: 'up to 40 m'},
        {label: 'Type', value: 'Telescopic / Articulated'},
        {label: 'Capacity', value: '230 – 450 kg'},
      ],
      availability: 'Limited',
      image: 'scaffolding.jpg',
    },
    {
      slug: 'scaffolding',
      name: 'Scaffolding Systems',
      category: 'Access',
      specs: [
        {label: 'Type', value: 'Cup-lock / Tube'},
        {label: 'Height', value: 'engineered'},
        {label: 'Load', value: 'medium – heavy duty'},
      ],
      availability: 'Available',
      image: 'scaffolding.jpg',
    },
    {
      slug: 'generators',
      name: 'Generators',
      category: 'Power',
      specs: [
        {label: 'Output', value: '50 – 1,000 kVA'},
        {label: 'Fuel', value: 'Diesel'},
        {label: 'Config', value: 'Silent / Open'},
      ],
      availability: 'Available',
      image: 'heavy-fleet.jpg',
    },
  ]

  for (const e of equipmentData) {
    const img = await uploadImageWithAlt(e.image, e.name)
    await upsert({
      _id: `equipment-${e.slug}`,
      _type: 'equipmentItem',
      name: e.name,
      slug: {_type: 'slug', current: e.slug},
      category: e.category,
      specs: e.specs.map((s, i) => ({...s, _key: `sp-${i}`})),
      availability: e.availability,
      image: img,
    })
  }
}

async function seedAboutPage() {
  console.log('\n📖 About Page')
  const storyImage = await uploadImageWithAlt('engineer.jpg', 'Horizon 7 site engineer')
  await upsert({
    _id: 'aboutPage',
    _type: 'aboutPage',
    pageEyebrow: 'About Horizon 7',
    pageTitle: 'A Cameroonian engineering company built for continental delivery.',
    pageIntro:
      "Founded to raise the industrial engineering standard in Central Africa, Horizon 7 combines local knowledge with international discipline — engineering, fabricating, welding and constructing to the specifications the world's most demanding operators expect.",
    storyEyebrow: 'Our Story',
    storyHeading: 'Precision is not a promise. It is a procedure.',
    storyParagraph1:
      "Horizon 7 was built on a simple observation: Africa's most ambitious industrial projects deserve contractors who deliver to the same standards demanded in Europe, the Gulf or North America. We assembled a team of coded welders, chartered engineers and heavy-equipment specialists to close that gap.",
    storyParagraph2:
      'Today, we support refineries, mining operators, EPC contractors and government infrastructure programs from our base in Cameroon — with the safety culture, QA/QC documentation and delivery discipline that make us a first-call contractor.',
    storyImage,
    valuesEyebrow: 'Values',
    valuesHeading: 'The commitments that shape our work.',
    values: [
      {
        _key: 'v1',
        title: 'Engineering Excellence',
        body: "Every scope is engineered before it's built — from procedure qualification records to structural calculations.",
      },
      {
        _key: 'v2',
        title: 'Innovation',
        body: 'We adopt modern equipment, digital planning and international best practice to raise the industry standard.',
      },
      {
        _key: 'v3',
        title: 'Integrity',
        body: 'Transparent quotes, honest schedules, disciplined execution. Our word is our contract.',
      },
      {
        _key: 'v4',
        title: 'Safety',
        body: 'Zero-harm is a policy, not a slogan. Every site runs on permit-to-work discipline.',
      },
      {
        _key: 'v5',
        title: 'Client Satisfaction',
        body: 'Our best marketing is a client who calls us back. Long-term partnerships drive our delivery.',
      },
      {
        _key: 'v6',
        title: 'Professional Workforce',
        body: 'Coded welders, chartered engineers, certified scaffolders — training and re-certification never stop.',
      },
    ],
  })
}

async function seedServicesPage() {
  console.log('\n📄 Services Page')
  await upsert({
    _id: 'servicesPage',
    _type: 'servicesPage',
    pageEyebrow: 'Capabilities',
    pageTitle: 'Ten integrated services. One engineering standard.',
    pageIntro:
      'From coded pipe welding to civil infrastructure and heavy equipment supply, Horizon 7 covers the full industrial delivery chain — engineered, executed and documented to international standards.',
    ctaEyebrow: 'Bespoke Scope',
    ctaHeading: "Don't see your scope listed? We build to specification.",
  })
}

async function seedSafetyPage() {
  console.log('\n🦺 Safety Page')
  const commitImage = await uploadImageWithAlt(
    'scaffolding.jpg',
    'Certified scaffolding on an industrial facility',
  )
  await upsert({
    _id: 'safetyPage',
    _type: 'safetyPage',
    pageEyebrow: 'HSE & Quality',
    pageTitle: 'Zero harm. Documented quality. International discipline.',
    pageIntro:
      "Safety is not a department at Horizon 7 — it is how every project is planned, permitted and executed. Our HSE and QA/QC systems are aligned with international operators' expectations.",
    commitmentEyebrow: 'Commitment',
    commitmentHeading: 'Every shift ends the way it started — safely.',
    commitmentParagraph:
      "From high-risk refinery turnarounds to remote civil worksites, our HSE framework protects our people, our clients' assets and the communities we operate in.",
    commitmentImage: commitImage,
    pillarsEyebrow: 'Five Pillars',
    pillarsHeading: 'How safety and quality are embedded in every project.',
    pillars: [
      {
        _key: 'p1',
        title: 'Safety Culture',
        body: 'Zero-harm mindset embedded from board level to site level. Daily toolbox talks, pre-task risk assessments and permit-to-work discipline on every shift.',
      },
      {
        _key: 'p2',
        title: 'Certified Workforce',
        body: 'Coded welders, certified scaffold inspectors, trained rigging supervisors. Continuous training and re-certification is non-negotiable.',
      },
      {
        _key: 'p3',
        title: 'Quality Control',
        body: 'Documented QA/QC procedures, NDT partnerships, ITP compliance and full traceability on every fabrication and construction package.',
      },
      {
        _key: 'p4',
        title: 'Risk Management',
        body: 'HAZID / HAZOP-aligned risk registers, method statements reviewed before mobilization, and a proactive stop-work culture.',
      },
      {
        _key: 'p5',
        title: 'International Standards',
        body: 'Procedures aligned to ASME, AWS D1.1, API, ISO 9001 and OHSAS 18001 / ISO 45001 principles.',
      },
    ],
  })
}

async function seedProjectsPage() {
  console.log('\n📄 Projects Page')
  await upsert({
    _id: 'projectsPage',
    _type: 'projectsPage',
    pageEyebrow: 'Portfolio',
    pageTitle: 'Selected work across Cameroon.',
    pageIntro:
      'A cross-section of the projects our engineers, welders and site teams have delivered for industrial operators, EPC contractors and public infrastructure programs.',
    ctaHeading: "Have a project in mind? Let's discuss the scope.",
  })
}

async function seedContactPage() {
  console.log('\n📄 Contact Page')
  await upsert({
    _id: 'contactPage',
    _type: 'contactPage',
    pageEyebrow: 'Contact',
    pageTitle: 'Speak to our engineering team.',
    pageIntro:
      'Share your project scope, timeline and location. We reply to every enquiry within one working day, and mobilize where the work is.',
  })
}

async function seedEquipmentPage() {
  console.log('\n📄 Equipment Page')
  await upsert({
    _id: 'equipmentPage',
    _type: 'equipmentPage',
    pageEyebrow: 'Equipment Rental',
    pageTitle: 'A maintained fleet, dispatched nationwide.',
    pageIntro:
      'Modern equipment for earthmoving, lifting, access, haulage and power — inspected, serviced and dispatched with operators when required. Available for short-term and long-term contracts.',
  })
}

async function seedSiteSettings() {
  console.log('\n⚙️ Site Settings')
  await upsert({
    _id: 'siteSettings',
    _type: 'siteSettings',
    name: 'Horizon 7 Company Ltd',
    description:
      'Horizon 7 Company Ltd delivers world-class engineering, fabrication, construction and industrial solutions across Cameroon and Central Africa.',
    email: 'info@horizon7companyltd.org',
    whatsapp: '+237 693 790 123',
    whatsappRaw: '237693790123',
    address: 'Douala, Cameroon',
    hours: 'Mon – Fri · 08:00 – 18:00 WAT',
    primaryColor: '#F77F00',
    secondaryColor: '#0D1B2A',
    mapLink: 'https://maps.app.goo.gl/JPu61PXyQ14PC7wT9',
    mapEmbed: 'https://www.google.com/maps?q=HORIZON+7+Company+Ltd+Cameroon&output=embed',
    navigation: [
      {_key: 'n1', label: 'Home', to: '/'},
      {_key: 'n2', label: 'Services', to: '/services'},
      {_key: 'n3', label: 'Projects', to: '/projects'},
      {_key: 'n4', label: 'Equipment', to: '/equipment'},
      {_key: 'n5', label: 'Safety', to: '/safety'},
      {_key: 'n6', label: 'About', to: '/about'},
      {_key: 'n7', label: 'Contact', to: '/contact'},
    ],
  })
}

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════

async function main() {
  console.log('🚀 Seeding Sanity Studio for Horizon 7 Company Ltd\n')
  console.log(`   Project:  nz6n7tde`)
  console.log(`   Dataset:  production`)
  console.log(`   Assets:   ${ASSETS_DIR}\n`)

  await seedHero()
  await seedIntroBand()
  await seedStatsStrip()
  await seedWhyChooseUs()
  await seedTeamGallery()
  await seedCtaBand()
  await seedServices()
  await seedProjects()
  await seedTestimonials()
  await seedEquipment()
  await seedAboutPage()
  await seedServicesPage()
  await seedSafetyPage()
  await seedProjectsPage()
  await seedContactPage()
  await seedEquipmentPage()
  await seedSiteSettings()

  console.log('\n✅ Done! All content has been seeded to Sanity.')
  console.log('   Open your Sanity Studio to verify the data.')
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
