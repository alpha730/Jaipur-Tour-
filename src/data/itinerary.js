// Content from "Jaipur Heritage & Craft Journey — 8 Days / 7 Nights" itinerary.
// Photos live in /public/photos; credits are in credits.json.

export const trip = {
  title: 'Jaipur Cultural Journey',
  subtitle: 'A Curated Odyssey through Textiles, Art, and Heritage',
  duration: '8 Days / 7 Nights',
  base: 'Jaipur, Rajasthan',
  overview:
    "Embark on an unforgettable journey through the vibrant and rich cultural tapestry of Jaipur, the pink city of India. This curated travel plan incorporates immersive experiences in textiles, art, and heritage, ensuring you'll return with memories and mementos that capture the essence of Jaipur.",
  quotes: [
    {
      original: 'केसरिया बालम आवो नी, पधारो म्हारे देस',
      text: 'Come, my saffron-clad beloved, come to my land.',
      source: 'Kesariya Balam, Rajasthani folk song',
    },
    {
      original: 'अतिथिदेवो भव',
      text: 'The guest is as God.',
      source: 'Taittiriya Upanishad',
    },
    {
      text: 'Nothing has been left undone, either by man or Nature, to make India the most extraordinary country that the sun visits on his rounds.',
      source: 'Mark Twain, Following the Equator (1897)',
    },
  ],
  pdf: 'Jaipur-Cultural-Journey-Itinerary.pdf',
  conclusion:
    'This travel plan promises to immerse you in the vibrant culture, art, and textiles of Jaipur, creating cherished memories and a deeper appreciation for the traditional crafts of this enchanting city.',
}

// `ac` is the day's accent colour, used sparingly for small details.
export const days = [
  {
    n: 1,
    hindi: 'पहला दिन',
    title: 'Arrival in Jaipur',
    place: 'Jaipur',
    tagline: 'Checking into heritage splendour and an evening feast of Rajasthani cuisine',
    ac: '#e07a8f',
    gate: { photo: 'gate-1', caption: 'Hawa Mahal, Jaipur' },
    hero: { photo: 'hero-1', caption: 'Courtyard, Rambagh Palace' },
    // Day 1 opens on Hawa Mahal, so its collage uses Jaipur scenes instead of the gate.
    collage: ['d1-checkin', 'd1-dinner', 'finale', 'd2-bazaar', 'd5-amer', 'd6-jantar'],
    activities: [
      { period: 'Afternoon', time: '12:00 PM – 03:00 PM', title: 'Arrival in Jaipur & Heritage Hotel Check-In', tag: 'Stay & Heritage', desc: 'Arrive in Jaipur. Check into your heritage hotel that reflects the rich architecture of the region.', photo: 'd1-checkin', caption: 'Samode Haveli, Jaipur' },
      { period: 'Evening', time: '07:30 PM onwards', title: 'Welcome Dinner featuring Traditional Rajasthani Cuisine', tag: 'Culinary', desc: 'A curated welcome dinner featuring traditional Rajasthani cuisine, setting the gastronomic stage for the days ahead.', photo: 'd1-dinner', caption: 'A Rajasthani thali' },
    ],
    overnight: 'Rest in the serene heritage ambience of your Jaipur hotel.',
  },
  {
    n: 2,
    hindi: 'दूसरा दिन',
    title: 'Textile Industry Visits',
    place: 'Sanganer & Jaipur Bazaars',
    tagline: "Hands-on artisan guidance in bandhani crafts and Sanganer's iconic wooden blocks",
    ac: '#6f86ff',
    gate: { photo: 'gate-2', caption: 'Patrika Gate, Jaipur' },
    hero: { photo: 'hero-2', caption: 'Bandhani, tie-and-dye' },
    activities: [
      { period: 'Morning', time: '09:30 AM – 12:30 PM', title: 'Visit to Tie and Dye Workshop', tag: 'Hands-on Workshop', desc: 'Experience the art of tie-dye, a traditional Rajasthani craft, where local artisans guide you in creating your own piece of art.', photo: 'd2-tiedye', caption: 'Tying bandhani by hand' },
      { period: 'Afternoon', time: '02:00 PM – 05:00 PM', title: 'Industry Visit: Sanganeri Prints', tag: 'Industry Visit', desc: 'Explore the vibrant Sanganeri block prints and witness the intricate process involved in making these iconic textiles.', photo: 'd2-sanganer', caption: 'Printing with a hand-carved block' },
      { period: 'Evening', time: '06:00 PM onwards', title: 'Hotel Relaxation or Local Bazaar Stroll', tag: 'Leisure', desc: 'Relax at the hotel or stroll through local bazaars to absorb the lively atmosphere.', photo: 'd2-bazaar', caption: 'Hawa Mahal Bazaar' },
    ],
    overnight: 'Second overnight stay in Jaipur.',
  },
  {
    n: 3,
    hindi: 'तीसरा दिन',
    title: 'Traditional Arts and Textiles',
    place: 'Bagru, Amer & Jaipur',
    tagline: "From Bagru's vegetable-dyed dabu blocks to lustrous gota patti gold work",
    ac: '#f0a04b',
    gate: { photo: 'gate-3', caption: 'Peacock Gate, City Palace' },
    hero: { photo: 'hero-3', caption: 'Textile printing, Jaipur' },
    activities: [
      { period: 'Morning', time: '09:00 AM – 01:00 PM', title: 'Industry Visit: Bagru Prints', tag: 'Craft Immersion', desc: 'Discover the unique Bagru printing technique and try your hand at block printing.', photo: 'd3-bagru', caption: 'Block printing in Bagru village' },
      { period: 'Afternoon', time: '02:30 PM – 05:00 PM', title: 'Gota Patti Work Visit', tag: 'Artisan Atelier', desc: 'Visit a workshop where you can see intricate gota patti (gold lace work) being applied to textiles. Engage with artisans and learn their craft.', photo: 'd3-gota', caption: 'Gota patti on a sari border' },
      { period: 'Evening', time: '05:30 PM – 07:30 PM', title: 'Visit Anokhi Museum', tag: 'Textile Museum', desc: "Dive deeper into Jaipur's textile history, exploring exhibitions focused on block printing and textile traditions.", photo: 'd3-anokhi', caption: 'Anokhi Museum, Amer' },
    ],
    overnight: 'Overnight in Jaipur.',
  },
  {
    n: 4,
    hindi: 'चौथा दिन',
    title: 'Pottery and Quilting',
    place: 'Jaipur Craft Quarters & Markets',
    tagline: 'Quartz-glazed cobalt pottery studios and the age-old art of the Jaipuri razai',
    ac: '#5aa9e6',
    gate: { photo: 'gate-4', caption: 'Chandra Mahal, City Palace' },
    hero: { photo: 'hero-4', caption: 'Jaipur blue pottery' },
    activities: [
      { period: 'Morning', time: '09:30 AM – 01:00 PM', title: 'Industry Visit: Blue Pottery', tag: 'Hands-on Pottery', desc: 'Experience the artistry of blue pottery. Participate in a workshop and create your pottery piece.', photo: 'd4-pottery', caption: 'Blue pottery pilgrim flask' },
      { period: 'Afternoon', time: '02:30 PM – 05:30 PM', title: 'Jaipur Quilt Making Industry Visit', tag: 'Quilt Atelier', desc: 'Understand the craft behind exquisite Jaipur quilts. Participate in a short session on quilting techniques.', photo: 'd4-quilt', caption: 'Hand quilting' },
      { period: 'Evening', time: '06:00 PM onwards', title: 'Unique Textile Shopping in Local Markets', tag: 'Bazaar Walk', desc: 'Visit local markets for unique textile shopping.', photo: 'd4-textiles', caption: 'Bandhani in the market' },
    ],
    overnight: 'Overnight in Jaipur.',
  },
  {
    n: 5,
    hindi: 'पाँचवाँ दिन',
    title: 'Weaving Heritage and Architectural Marvels',
    place: 'Jaipur, Amer & Jaigarh',
    tagline: 'Engage with master weavers, then ascend to hilltop bastions and panoramic vistas',
    ac: '#e8b04b',
    gate: { photo: 'gate-5', caption: 'Ganesh Pol, Amer Fort' },
    hero: { photo: 'hero-5', caption: 'Amer Fort above Maota Lake' },
    activities: [
      { period: 'Morning', time: '09:00 AM – 12:00 PM', title: 'Weavers Service Centre', tag: 'Loom Heritage', desc: 'Explore the art of weaving, dyeing and printing. Engage with the weavers and learn about their techniques.', photo: 'd5-weavers', caption: 'Weaving on a handloom' },
      { period: 'Afternoon', time: '01:30 PM – 06:00 PM', title: 'Heritage Monument Visits: Amer & Jaigarh Forts', tag: 'Fort Architecture', desc: "Amer Fort: marvel at the grandeur and intricate artistry of this hilltop fort. Jaigarh Fort: visit the fort that houses the world's largest cannon on wheels, and enjoy panoramic views of Jaipur.", photo: 'd5-amer', caption: 'Amer Fort' },
      { period: 'Evening', time: '07:30 PM onwards', title: 'Return to Hotel for Dinner & Relaxation', tag: 'Dinner & Rest', desc: 'Return to the hotel for dinner and relax.', photo: 'd5-dinner', caption: 'Rambagh Palace courtyard' },
    ],
    overnight: 'Overnight in Jaipur.',
  },
  {
    n: 6,
    hindi: 'छठा दिन',
    title: 'Architectural Exploration and Nature',
    place: 'Jaipur, Abhaneri & Wildlife Reserves',
    tagline: 'Celestial stone observatories, the descending stairs of Abhaneri, and evening safari choices',
    ac: '#d9748f',
    gate: { photo: 'gate-6', caption: 'Green Gate, City Palace' },
    hero: { photo: 'hero-6', caption: 'Chand Baori, Abhaneri' },
    activities: [
      { period: 'Morning', time: '08:30 AM – 12:00 PM', title: 'Jantar Mantar & City Palace', tag: 'Royal Landmark', desc: 'Visit these iconic landmarks that showcase royal heritage and astronomical prowess.', photo: 'd6-jantar', caption: 'Jantar Mantar, Jaipur' },
      { period: 'Afternoon', time: '01:30 PM – 04:30 PM', title: 'Abhaneri Stepwell', tag: 'Stepwell Wonder', desc: 'Proceed to Abhaneri to marvel at this architectural wonder, showcasing brilliant stepwell architecture.', photo: 'd6-abhaneri', caption: 'Chand Baori stepwell' },
      { period: 'Evening', time: '05:00 PM – 08:30 PM', title: 'Optional Wildlife Experience', tag: 'Wildlife Option', desc: 'Choose between Ranthambore, Jhalana Safari, or a short wildlife experience (availability based).', options: ['Ranthambore Tiger Reserve', 'Jhalana Leopard Safari', 'Short Wildlife Experience'], photo: 'd6-wildlife', caption: 'Bengal tiger, Ranthambore' },
    ],
    overnight: 'Overnight in Jaipur.',
  },
  {
    n: 7,
    hindi: 'सातवाँ दिन',
    title: 'Culture and Heritage',
    place: 'Pushkar & Jaipur',
    tagline: 'Sacred ghats, the Brahma temple, market delicacies, and royal Kundan & Meenakari jewellery',
    ac: '#3fbfa5',
    gate: { photo: 'gate-7', caption: 'Brahma Temple, Pushkar' },
    hero: { photo: 'hero-7', caption: 'Pushkar Lake at twilight' },
    activities: [
      { period: 'Morning', time: '08:00 AM – 01:00 PM', title: 'Visit to Pushkar', tag: 'Spiritual Heritage', desc: 'Experience the culture and spirituality of Pushkar. Explore the sacred lake and Brahma Temple.', photo: 'd7-pushkar', caption: 'The ghats of Pushkar' },
      { period: 'Afternoon', time: '01:30 PM – 04:30 PM', title: 'Local Markets & Cuisine Tasting', tag: 'Cuisine & Culture', desc: 'Explore local markets and taste delectable local cuisine.', photo: 'd7-market', caption: 'Pushkar market' },
      { period: 'Evening', time: '05:30 PM – 08:00 PM', title: 'Kundan Jewellery Workshop', tag: 'Artisan Workshop', desc: 'Engage with artisans in Kundan and Meenakari art. Create your own piece of jewellery.', photo: 'd7-kundan', caption: 'Kundan sarpech, 18th century' },
    ],
    overnight: 'Overnight in Jaipur.',
  },
  {
    n: 8,
    hindi: 'आठवाँ दिन',
    title: 'Haunted History and Departure',
    place: 'Bhangarh, Jaipur Bazaars & Airport',
    tagline: 'Mysterious 17th-century ramparts, fine handmade felt from Tonk, and the departure transfer',
    ac: '#c39bd3',
    gate: { photo: 'gate-8', caption: 'Bhangarh Fort entrance' },
    hero: { photo: 'hero-8', caption: 'The ruins of Bhangarh' },
    activities: [
      { period: 'Morning', time: '08:30 AM – 12:30 PM', title: 'Bhangarh Fort Visit', tag: 'Historical Ruins', desc: 'Explore the eerie ruins of this 17th-century fort rumoured to be haunted. Take guided tours to learn about its historical significance.', photo: 'd8-bhangarh', caption: 'Bhangarh' },
      { period: 'Afternoon', time: '01:00 PM – 04:30 PM', title: 'Leisurely Lunch & Rug Shopping', tag: 'Textiles & Lunch', desc: 'Leisurely lunch followed by shopping for Jaipur rugs and handmade felt from Tonk at local markets.', photo: 'd8-rugs', caption: 'Carpet weavers near Jaipur' },
      { period: 'Evening', time: '05:30 PM onwards', title: 'Airport Transfer for Departure', tag: 'Departure', desc: 'Transfer to the airport for your departure.', photo: 'd8-airport', caption: 'Jaipur International Airport' },
    ],
    overnight: null,
  },
]

// Relative to the site's base URL so it also works when hosted in a subfolder.
const base = import.meta.env?.BASE_URL ?? '/'
export const photo = (key) => `${base}photos/${key}.jpg`
export const asset = (file) => `${base}${file}`
