// Curated destination dataset. In a larger app this would come from a CMS
// or travel API, but a static, well-structured dataset keeps the front-end
// assignment focused on the UI, motion, and integrations rather than a backend.

const destinations = [
  {
    slug: 'kyoto-japan',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    lat: 35.0116,
    lon: 135.7681,
    tagline: 'Temples, machiya streets, and a thousand shades of maple.',
    blurb:
      'Once the imperial capital, Kyoto keeps its wooden teahouses and Zen gravel gardens intact while the rest of Japan modernised around it. Best explored slowly, on foot or by bicycle.',
    bestTime: 'Late March–April (cherry blossom) or November (autumn colour)',
    famousPlaces: [
      { name: 'Fushimi Inari Taisha', note: 'Thousands of vermilion torii gates climbing the mountain — arrive at dawn.' },
      { name: 'Arashiyama Bamboo Grove', note: 'A quiet corridor of towering bamboo, best before 8am.' },
      { name: 'Kinkaku-ji (Golden Pavilion)', note: 'A gilded Zen temple reflected in its own pond.' },
      { name: 'Gion District', note: 'Historic geisha quarter with lantern-lit lanes and machiya restaurants.' },
    ],
  },
  {
    slug: 'lisbon-portugal',
    name: 'Lisbon',
    country: 'Portugal',
    region: 'Europe',
    lat: 38.7223,
    lon: -9.1393,
    tagline: 'Hillside trams, azulejo tiles, and the smell of the Atlantic.',
    blurb:
      'Lisbon is built across seven hills above the Tagus estuary, so every street ends in a viewpoint. Pastel façades, fado music drifting from Alfama, and some of Europe\'s best-value food.',
    bestTime: 'March–May or September–October, before the summer crowds and heat',
    famousPlaces: [
      { name: 'Belém Tower', note: '16th-century fortress marking where Portuguese ships once set sail.' },
      { name: 'Alfama District', note: 'The oldest quarter — narrow lanes, fado bars, river views.' },
      { name: 'Tram 28', note: 'A rattling yellow tram that threads the old town\'s tightest corners.' },
      { name: 'LX Factory', note: 'A former industrial complex turned into studios, bookshops and cafés.' },
    ],
  },
  {
    slug: 'marrakech-morocco',
    name: 'Marrakech',
    country: 'Morocco',
    region: 'Africa',
    lat: 31.6295,
    lon: -7.9811,
    tagline: 'Souks, riads, and the Atlas Mountains on the horizon.',
    blurb:
      'The Red City rewards getting lost. Behind unmarked doors in the medina, courtyard riads hide fountains and orange trees; outside the walls, the Atlas Mountains rise in the distance.',
    bestTime: 'October–November or March–April, avoiding peak summer heat',
    famousPlaces: [
      { name: 'Jemaa el-Fnaa', note: 'The main square — storytellers, food stalls, and snake charmers by dusk.' },
      { name: 'Bahia Palace', note: '19th-century palace with intricate zellige tilework and cedar ceilings.' },
      { name: 'Jardin Majorelle', note: 'A cobalt-blue garden once owned by Yves Saint Laurent.' },
      { name: 'Medina Souks', note: 'A maze of stalls selling lanterns, leather, spices, and rugs.' },
    ],
  },
  {
    slug: 'queenstown-new-zealand',
    name: 'Queenstown',
    country: 'New Zealand',
    region: 'Oceania',
    lat: -45.0312,
    lon: 168.6626,
    tagline: 'Alpine lake town built for adrenaline and stillness in equal measure.',
    blurb:
      'Set on Lake Wakatipu beneath the Remarkables range, Queenstown is New Zealand\'s adventure capital — bungee jumping was invented here — but it\'s just as suited to slow lakeside mornings.',
    bestTime: 'December–February (summer) or June–August (ski season)',
    famousPlaces: [
      { name: 'Lake Wakatipu', note: 'A glacier-carved lake ringed by mountains; take the TSS Earnslaw steamship.' },
      { name: 'Skyline Gondola', note: 'Cable car up Bob\'s Peak for panoramic views and luge tracks.' },
      { name: 'Fiordland National Park', note: 'Day trips to Milford Sound, a couple of hours away.' },
      { name: 'Glenorchy', note: 'A small settlement often called the gateway to Middle-earth filming spots.' },
    ],
  },
  {
    slug: 'oaxaca-mexico',
    name: 'Oaxaca City',
    country: 'Mexico',
    region: 'North America',
    lat: 17.0732,
    lon: -96.7266,
    tagline: 'Mezcal, mole, and the most vivid folk art in the Americas.',
    blurb:
      'Colonial architecture in ochre and blue, seven varieties of mole, and craft villages within reach — Oaxaca is Mexico\'s cultural capital, especially alive during Día de los Muertos.',
    bestTime: 'October–November (Day of the Dead) or March–April',
    famousPlaces: [
      { name: 'Monte Albán', note: 'Zapotec ruins on a flattened mountaintop overlooking the valley.' },
      { name: 'Santo Domingo Church', note: 'A baroque church with a gilded interior next to a botanical garden.' },
      { name: 'Hierve el Agua', note: 'Petrified mineral waterfalls that look frozen mid-flow.' },
      { name: 'Mercado Benito Juárez', note: 'A market for mezcal tastings, chapulines, and handwoven textiles.' },
    ],
  },
  {
    slug: 'reykjavik-iceland',
    name: 'Reykjavík',
    country: 'Iceland',
    region: 'Europe',
    lat: 64.1466,
    lon: -21.9426,
    tagline: 'The world\'s northernmost capital, and a launchpad for lava fields.',
    blurb:
      'Small, colourful, and easy to walk end to end in an afternoon, Reykjavík is really a base camp for glaciers, geysers, and the aurora — all within a couple of hours\' drive.',
    bestTime: 'June–August (midnight sun) or September–March (northern lights)',
    famousPlaces: [
      { name: 'Hallgrímskirkja', note: 'A concrete church shaped like basalt columns, with a city-view tower.' },
      { name: 'Golden Circle', note: 'A day loop past Þingvellir, Geysir, and Gullfoss waterfall.' },
      { name: 'Blue Lagoon', note: 'Geothermal spa in a black lava field, milky-blue and mineral-rich.' },
      { name: 'Harpa Concert Hall', note: 'A glass, honeycomb-façade building on the old harbour.' },
    ],
  },
  {
    slug: 'cape-town-south-africa',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    lat: -33.9249,
    lon: 18.4241,
    tagline: 'A mountain, two oceans, and a city that sits between them.',
    blurb:
      'Table Mountain anchors a city where vineyards, penguin colonies, and surf beaches are all a short drive apart. Layered history, big skies, and some of the best food in Africa.',
    bestTime: 'November–March, for warm dry summer weather',
    famousPlaces: [
      { name: 'Table Mountain', note: 'Cable car or hike to the flat-topped summit above the city.' },
      { name: 'Robben Island', note: 'Former prison island where Nelson Mandela was held, now a museum.' },
      { name: 'Boulders Beach', note: 'A sheltered beach shared with a colony of African penguins.' },
      { name: 'Cape of Good Hope', note: 'The dramatic, windswept tip of the Cape Peninsula.' },
    ],
  },
  {
    slug: 'ubud-indonesia',
    name: 'Ubud',
    country: 'Indonesia',
    region: 'Asia',
    lat: -8.5069,
    lon: 115.2625,
    tagline: 'Rice terraces, temples, and Bali\'s cultural heartland.',
    blurb:
      'Inland from Bali\'s beaches, Ubud is surrounded by terraced paddies and forest temples. It\'s slower-paced, big on yoga and craft, and the best base for exploring central Bali.',
    bestTime: 'April–October, the dry season',
    famousPlaces: [
      { name: 'Tegallalang Rice Terraces', note: 'Stepped emerald paddies carved into the hillside.' },
      { name: 'Sacred Monkey Forest', note: 'A jungle sanctuary with moss-covered temple ruins.' },
      { name: 'Tirta Empul', note: 'A holy spring temple where locals still come to bathe.' },
      { name: 'Campuhan Ridge Walk', note: 'An easy, scenic walk through grassy hills at sunrise.' },
    ],
  },
]

export default destinations

export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug)
}

export const regions = [...new Set(destinations.map((d) => d.region))].sort()
