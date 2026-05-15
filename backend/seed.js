require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('./src/models/JobRequest');

const sampleJobs = [
  {
    title: 'Leaking kitchen tap needs fixing',
    description: 'The cold water tap in my kitchen has been dripping constantly for two weeks. Looking for a reliable plumber to replace the washer or the tap unit.',
    category: 'Plumbing',
    location: 'Glasgow',
    contactName: 'Sarah Mitchell',
    contactEmail: 'sarah.mitchell@example.com',
    status: 'Open',
  },
  {
    title: 'Bathroom rewire required',
    description: 'Need a certified electrician to rewire the bathroom. Current sockets are not waterproof and the lighting circuit keeps tripping the breaker.',
    category: 'Electrical',
    location: 'Edinburgh',
    contactName: 'James Holt',
    contactEmail: 'james.holt@example.com',
    status: 'Open',
  },
  {
    title: 'Interior house painting — 3 bedrooms',
    description: 'Looking for a painter to repaint three bedrooms. Walls only, no ceilings. Neutral tones preferred. Paint will be supplied by the homeowner.',
    category: 'Painting',
    location: 'Manchester',
    contactName: 'Priya Sharma',
    contactEmail: 'priya.sharma@example.com',
    status: 'In Progress',
  },
  {
    title: 'Garden fence panels replacement',
    description: 'Storm damage took out four fence panels along the back of the garden. Need a joiner to supply and fit like-for-like timber panels.',
    category: 'Joinery',
    location: 'Leeds',
    contactName: 'Tom Brennan',
    contactEmail: 'tom.brennan@example.com',
    status: 'Open',
  },
  {
    title: 'Outside tap installation',
    description: 'Want an outside tap added to the rear of the house for the garden hose. Should be plumbed into the utility room supply. Frost-proof tap preferred.',
    category: 'Plumbing',
    location: 'Birmingham',
    contactName: 'Karen White',
    contactEmail: 'karen.white@example.com',
    status: 'Open',
  },
  {
    title: 'EV charger installation',
    description: 'Just bought an electric car and need a 7kW home charger installed in the driveway. Must be OZEV-approved installer to qualify for the grant.',
    category: 'Electrical',
    location: 'Bristol',
    contactName: 'Daniel Osei',
    contactEmail: 'daniel.osei@example.com',
    status: 'Open',
  },
  {
    title: 'Bespoke fitted wardrobe',
    description: 'Looking for a joiner to build a fitted wardrobe in the master bedroom alcove. Approximate size 2.4m wide x 2.2m high. Sliding doors preferred.',
    category: 'Joinery',
    location: 'Glasgow',
    contactName: 'Fiona Campbell',
    contactEmail: 'fiona.campbell@example.com',
    status: 'Closed',
  },
  {
    title: 'Exterior masonry painting',
    description: 'The front and side of a semi-detached house need a fresh coat of masonry paint. Some minor crack filling required before painting.',
    category: 'Painting',
    location: 'Liverpool',
    contactName: 'Michael Torres',
    contactEmail: 'michael.torres@example.com',
    status: 'Open',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await JobRequest.deleteMany({});
    console.log('Cleared existing jobs');

    const inserted = await JobRequest.insertMany(sampleJobs);
    console.log(`Inserted ${inserted.length} sample jobs`);

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
