import heroWelder from "@/assets/hero-welder.jpg";
import fabricationYard from "@/assets/fabrication-yard.jpg";
import pipeWelding from "@/assets/pipe-welding.jpg";
import scaffolding from "@/assets/scaffolding.jpg";
import excavator from "@/assets/excavator.jpg";
import engineer from "@/assets/engineer.jpg";
import craneDusk from "@/assets/crane-dusk.jpg";
import heatTreatment from "@/assets/heat-treatment.jpg";
import heavyFleet from "@/assets/heavy-fleet.jpg";
import civilEng from "@/assets/civil-engineering.jpg";

export const IMG = {
  heroWelder,
  fabricationYard,
  pipeWelding,
  scaffolding,
  excavator,
  engineer,
  craneDusk,
  heatTreatment,
  heavyFleet,
  civilEng,
};

export type Service = {
  slug: string;
  index: string;
  name: string;
  short: string;
  description: string;
  image: string;
  capabilities: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "industrial-welding",
    index: "01",
    name: "Industrial Welding",
    short: "Certified welding for heavy structural and pressure systems.",
    description:
      "Certified MIG, TIG, arc and specialty welding delivered by qualified welders for structural, pressure and high-integrity industrial applications.",
    image: heroWelder,
    capabilities: [
      "Structural steel welding",
      "Pressure vessel welding",
      "MIG / TIG / SMAW / FCAW",
      "AWS D1.1 & ASME IX qualified procedures",
      "On-site and workshop fabrication",
    ],
  },
  {
    slug: "mechanical-fabrication",
    index: "02",
    name: "Mechanical Fabrication",
    short: "Precision steel fabrication engineered to specification.",
    description:
      "In-house fabrication of steel structures, skids, tanks, ducting and custom mechanical assemblies — engineered to spec and delivered to site.",
    image: fabricationYard,
    capabilities: [
      "Structural steel assemblies",
      "Process skids & modular units",
      "Tanks, hoppers, silos",
      "CNC plasma & press-brake forming",
      "Full traceability & QA/QC dossiers",
    ],
  },
  {
    slug: "scaffolding-mounting",
    index: "03",
    name: "Scaffolding & Mounting",
    short: "Safe access solutions engineered for complex worksites.",
    description:
      "Engineered scaffolding, industrial mounting and safe access systems for refineries, plants and civil sites — built to international safety standards.",
    image: scaffolding,
    capabilities: [
      "Tube & fitting scaffold",
      "Cup-lock and system scaffold",
      "Suspended and cantilever platforms",
      "Certified scaffold inspectors",
      "Statutory HSE compliance",
    ],
  },
  {
    slug: "post-weld-heat-treatment",
    index: "04",
    name: "Post Weld Heat Treatment",
    short: "Controlled thermal cycles for weld integrity and stress relief.",
    description:
      "Controlled electrical resistance and induction PWHT to eliminate residual stress and meet ASME / API standards for pipelines and pressure equipment.",
    image: heatTreatment,
    capabilities: [
      "Electrical resistance PWHT",
      "Induction heating",
      "Programmable thermal cycles",
      "Chart-recorded documentation",
      "ASME / API compliant procedures",
    ],
  },
  {
    slug: "pipe-welding",
    index: "05",
    name: "Pipe Welding",
    short: "Coded pipe welding for oil, gas, power and process plants.",
    description:
      "Coded pipe welders and rigorous QA/QC for carbon steel, stainless and alloy pipework across oil & gas, power generation and process industries.",
    image: pipeWelding,
    capabilities: [
      "Carbon, stainless & duplex alloys",
      "GTAW root + fill/cap passes",
      "Orbital and manual welding",
      "NDT & radiographic acceptance",
      "6G qualified welders",
    ],
  },
  {
    slug: "civil-engineering",
    index: "06",
    name: "Civil Engineering",
    short: "Infrastructure engineered for the terrain and the timeline.",
    description:
      "Foundations, roads, bridges, drainage and reinforced concrete works — engineered for African terrain and delivered on schedule.",
    image: civilEng,
    capabilities: [
      "Reinforced concrete works",
      "Roadworks & earthworks",
      "Bridge & culvert construction",
      "Foundations & pile caps",
      "Site drainage & utilities",
    ],
  },
  {
    slug: "construction",
    index: "07",
    name: "Construction",
    short: "Turn-key construction from foundation to commissioning.",
    description:
      "Turn-key industrial and commercial construction — from foundation through structural erection, mechanical installation and final commissioning.",
    image: craneDusk,
    capabilities: [
      "Industrial buildings & warehouses",
      "Commercial construction",
      "Structural steel erection",
      "MEP coordination",
      "Handover & commissioning",
    ],
  },
  {
    slug: "equipment-rentals",
    index: "08",
    name: "Equipment Rentals",
    short: "Modern equipment fleet available across Cameroon.",
    description:
      "Modern excavators, cranes, boom lifts, forklifts and generators — maintained, inspected and dispatched with operators when required.",
    image: excavator,
    capabilities: [
      "Short and long-term rental",
      "Operator supply",
      "Preventive maintenance",
      "24/7 field support",
      "Nationwide dispatch",
    ],
  },
  {
    slug: "heavy-duty-machinery",
    index: "09",
    name: "Heavy Duty Machinery",
    short: "Bulldozers, cranes and heavy transport for major projects.",
    description:
      "Bulldozers, tower cranes, dump trucks and heavy transport equipment for large-scale infrastructure, mining and industrial projects.",
    image: heavyFleet,
    capabilities: [
      "Crawler & wheel dozers",
      "Tower and mobile cranes",
      "Articulated dump trucks",
      "Low-loader transport",
      "Certified operators",
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  location: string;
  status: "Completed" | "In Progress";
  description: string;
  image: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "coastal-fabrication",
    name: "Coastal Structural Fabrication",
    category: "Fabrication",
    location: "Coastal Region, Cameroon",
    status: "Completed",
    description:
      "Fabrication and erection of 2,400 tonnes of structural steel for a deep-water port expansion program.",
    image: fabricationYard,
  },
  {
    slug: "douala-refinery-shutdown",
    name: "Refinery Turnaround Support",
    category: "Welding & PWHT",
    location: "Douala, Cameroon",
    status: "Completed",
    description:
      "48-day refinery turnaround: pipe welding, PWHT and scaffolding for critical process units.",
    image: scaffolding,
  },
  {
    slug: "yaoundé-highway",
    name: "Highway Bridge Construction",
    category: "Civil Engineering",
    location: "Centre Region",
    status: "In Progress",
    description:
      "Design-and-build of a 320-metre reinforced concrete bridge on a national highway corridor.",
    image: civilEng,
  },
  {
    slug: "limbé-power-plant",
    name: "Power Plant Piping",
    category: "Pipe Welding",
    location: "Limbé, Cameroon",
    status: "Completed",
    description:
      "Precision welding of high-pressure steam and cooling water piping for a thermal power facility.",
    image: pipeWelding,
  },
  {
    slug: "bamenda-warehouse",
    name: "Industrial Warehouse Complex",
    category: "Construction",
    location: "Bamenda, Cameroon",
    status: "Completed",
    description:
      "18,000 m² pre-engineered warehouse complex with mezzanine, dock levellers and site infrastructure.",
    image: craneDusk,
  },
  {
    slug: "garoua-mining-support",
    name: "Mining Equipment Deployment",
    category: "Equipment",
    location: "Garoua, Cameroon",
    status: "In Progress",
    description:
      "Long-term deployment of heavy earthmoving fleet supporting a strategic mining operation.",
    image: heavyFleet,
  },
];

export type Equipment = {
  slug: string;
  name: string;
  category: string;
  specs: { label: string; value: string }[];
  availability: "Available" | "Limited" | "On Request";
  image: string;
};

export const EQUIPMENT: Equipment[] = [
  {
    slug: "excavators",
    name: "Excavators",
    category: "Earthmoving",
    specs: [
      { label: "Class", value: "20 – 45 t" },
      { label: "Bucket", value: "0.9 – 2.4 m³" },
      { label: "Reach", value: "up to 11 m" },
    ],
    availability: "Available",
    image: excavator,
  },
  {
    slug: "bulldozers",
    name: "Bulldozers",
    category: "Earthmoving",
    specs: [
      { label: "Class", value: "D6 – D9" },
      { label: "Power", value: "215 – 410 HP" },
      { label: "Blade", value: "SU / U" },
    ],
    availability: "Available",
    image: heavyFleet,
  },
  {
    slug: "forklifts",
    name: "Forklifts",
    category: "Material Handling",
    specs: [
      { label: "Capacity", value: "3 – 10 t" },
      { label: "Lift", value: "up to 6 m" },
      { label: "Fuel", value: "Diesel / LPG" },
    ],
    availability: "Available",
    image: fabricationYard,
  },
  {
    slug: "boom-lifts",
    name: "Boom Lifts",
    category: "Access",
    specs: [
      { label: "Height", value: "up to 40 m" },
      { label: "Type", value: "Telescopic / Articulated" },
      { label: "Capacity", value: "230 – 450 kg" },
    ],
    availability: "Limited",
    image: scaffolding,
  },
  {
    slug: "scaffolding",
    name: "Scaffolding Systems",
    category: "Access",
    specs: [
      { label: "Type", value: "Cup-lock / Tube" },
      { label: "Height", value: "engineered" },
      { label: "Load", value: "medium – heavy duty" },
    ],
    availability: "Available",
    image: scaffolding,
  },
  {
    slug: "cranes",
    name: "Cranes",
    category: "Lifting",
    specs: [
      { label: "Capacity", value: "25 – 250 t" },
      { label: "Type", value: "Mobile / Tower" },
      { label: "Reach", value: "up to 60 m" },
    ],
    availability: "On Request",
    image: craneDusk,
  },
  {
    slug: "generators",
    name: "Generators",
    category: "Power",
    specs: [
      { label: "Output", value: "50 – 1,000 kVA" },
      { label: "Fuel", value: "Diesel" },
      { label: "Config", value: "Silent / Open" },
    ],
    availability: "Available",
    image: heavyFleet,
  },
  {
    slug: "dump-trucks",
    name: "Dump Trucks",
    category: "Haulage",
    specs: [
      { label: "Payload", value: "15 – 40 t" },
      { label: "Type", value: "Rigid / Articulated" },
      { label: "Drive", value: "6×4 / 6×6" },
    ],
    availability: "Available",
    image: heavyFleet,
  },
  {
    slug: "heavy-duty-trucks",
    name: "Heavy Duty Trucks",
    category: "Transport",
    specs: [
      { label: "Class", value: "Prime movers" },
      { label: "Payload", value: "up to 60 t" },
      { label: "Trailers", value: "Low-loader / Flatbed" },
    ],
    availability: "Available",
    image: heavyFleet,
  },
];

export const WHY_CHOOSE_US = [
  {
    index: "01",
    title: "Experienced Professionals",
    body: "Certified engineers, coded welders and site managers with decades of combined heavy-industry experience.",
  },
  {
    index: "02",
    title: "Safety First",
    body: "Zero-harm culture. Statutory HSE compliance, daily toolbox talks, permit-to-work discipline on every site.",
  },
  {
    index: "03",
    title: "Quality Assurance",
    body: "ISO-aligned QA/QC procedures with full documentation, NDT and traceability for every deliverable.",
  },
  {
    index: "04",
    title: "Modern Equipment",
    body: "Maintained fleet of excavators, cranes, welding sets and PWHT rigs — always inspection-ready.",
  },
  {
    index: "05",
    title: "Reliable Delivery",
    body: "Schedule-driven project management with weekly progress reporting and transparent cost control.",
  },
  {
    index: "06",
    title: "Engineering Excellence",
    body: "Engineering-led approach: we design it right, build it right, and hand it over inspection-ready.",
  },
];

export const STATS = [
  { value: 12, suffix: "+", label: "Years Building" },
  { value: 180, suffix: "+", label: "Projects Delivered" },
  { value: 350, suffix: "+", label: "Skilled Workforce" },
  { value: 24, suffix: "/7", label: "Field Response" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Horizon 7 executed our refinery turnaround on schedule and without a single lost-time incident. Their welders and QA discipline are on par with the best international contractors we've engaged.",
    author: "Project Director",
    role: "Downstream Operator, Douala",
  },
  {
    quote:
      "The precision of their fabrication and the professionalism on site is exceptional. Horizon 7 has become our first call for structural steel and heavy lifting.",
    author: "Head of Engineering",
    role: "EPC Contractor, Central Africa",
  },
  {
    quote:
      "We brought them in for emergency pipeline repair. Their team mobilized within hours and delivered flawless code-compliant welds under immense pressure.",
    author: "Operations Manager",
    role: "National Oil Company",
  },
  {
    quote:
      "Safety, speed, and accuracy. Horizon 7 redefined what we expect from local civil engineering partners. Their attention to international standards is remarkable.",
    author: "Site Supervisor",
    role: "Mining Corp, Garoua",
  },
  {
    quote:
      "Renting their heavy equipment fleet gave us the exact flexibility we needed. Outstanding maintenance records and highly skilled operators out of the box.",
    author: "Procurement Lead",
    role: "Infrastructure Group",
  },
  {
    quote:
      "They handled the steel erection for our 18,000 m² warehouse flawlessly. True engineering excellence down to the last bolt.",
    author: "Logistics Director",
    role: "Regional Distribution Center",
  },
  {
    quote:
      "Horizon 7 isn't just a contractor; they are a strategic partner. Their proactive problem-solving saved us millions on our recent power plant shutdown.",
    author: "Plant Manager",
    role: "Thermal Energy Facility",
  },
  {
    quote:
      "From planning to execution, their civil works team is unmatched in Central Africa. A seamless experience from day one.",
    author: "Lead Architect",
    role: "Urban Development Agency",
  }
];
