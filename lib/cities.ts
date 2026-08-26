export type CityFaq = { q: string; a: string };
export type CityImage = { src: string; alt: string };
export type CityVideo = {
  variant: "featured" | "authentic";
  youtubeId: string;
  posterImage?: string;
  customerName?: string;
  customerNeighborhood?: string;
};

export type CityServiceContent = {
  title: string;
  description: string;
  h1: string;
  introParagraphs: string[];
  climateSection: { heading: string; body: string };
  neighborhoodsSection: { heading: string; intro: string };
  homeStylesSection: { heading: string; body: string };
  whyLocalSection: { heading: string; body: string };
  faqs: CityFaq[];
  featuredVideo: CityVideo;
  authenticVideos: CityVideo[];
  customerPhotos: CityImage[];
  beforeAfterPhotos: { before: CityImage; after: CityImage }[];
  closingCta: string;
  // Optional per-service hero/OG overrides. Exterior omits these and falls back
  // to the city-level hero/ogImage; interior sets them to interior job photos.
  hero?: CityImage;
  ogImage?: string;
};

export type City = {
  slug: string;
  name: string;
  displayName: string;
  county: string;
  zips: string[];
  neighborhoods: string[];
  hero: CityImage;
  ogImage: string;
  aggregateRating: { value: string; count: number };
  exterior: CityServiceContent;
  interior: CityServiceContent;
};

export const CITIES: City[] = [
  // ────────────────────────────────────────────────────────────────
  // SUGAR LAND
  // ────────────────────────────────────────────────────────────────
  {
    slug: "sugar-land",
    name: "Sugar Land",
    displayName: "Sugar Land, Texas",
    county: "Fort Bend County",
    zips: ["77478", "77479", "77498"],
    neighborhoods: ["Riverstone", "Telfair", "First Colony", "New Territory", "Greatwood", "Sugar Creek"],
    hero: {
      src: "/images/exterior-sugar-land.jpg",
      alt: "Exterior house painting in Sugar Land TX with two-story brick home and freshly painted trim",
    },
    ogImage: "/images/exterior-painting-happy-customer-sugar-land-tx.jpg",
    aggregateRating: { value: "5.0", count: 124 },
    exterior: {
      title: "Exterior Painting in Sugar Land TX | Proud Paintbrush",
      description:
        "Exterior painting in Sugar Land, TX for Riverstone, Telfair & First Colony. HOA-compliant colors, Texas-grade prep. Free estimate: (832) 605-0493.",
      h1: "Exterior Painting in Sugar Land, Texas",
      introParagraphs: [
        "Sugar Land homes work hard. Between August humidity that sits above 80 percent for weeks, sudden hard freezes like the one that hit Riverstone and Telfair in February 2021, and clay soil that shifts every dry summer, the paint on a Sugar Land exterior is under constant pressure. The Proud Paintbrush is based right here in 77498, and exterior painting is the work we do most. We know what fails first on a Sugar Land home and how to keep it from failing again.",
        "We paint everything from the 1980s wood-trim two-stories in First Colony to the newer stucco-and-stone elevations in Riverstone and Telfair. Every project starts with a walk-through of your specific elevation, an honest assessment of what needs repair before paint touches the surface, and a written estimate that lays out the color, the product, the prep, and the timeline.",
      ],
      climateSection: {
        heading: "Why Sugar Land Exteriors Need Specific Prep",
        body: "Sugar Land sits on the same Brazos River clay belt that runs through most of Fort Bend County. That soil expands when wet and contracts when dry, and over a few seasons it pulls at fascia boards, opens hairline gaps in stucco corners, and stresses caulk lines around window trim. Add summer UV that breaks down lower-grade exterior coatings in five to seven years, and you have the two main reasons Sugar Land exteriors need a real prep phase — not a quick wash and spray. On every Sugar Land project we pressure wash to remove pollen and mildew, scrape and sand failing coating, replace rotted trim before priming, re-caulk every dynamic joint, and prime bare wood, stucco patches, and chalky surfaces individually. Skipping any of those steps is why repaints in this market often start failing within three years.",
      },
      neighborhoodsSection: {
        heading: "Sugar Land Neighborhoods We Paint Most",
        intro: "We paint exteriors across every Sugar Land subdivision, but a handful come up week after week. Each one has its own paint history, its own HOA color rules, and its own common failure points.",
      },
      homeStylesSection: {
        heading: "Sugar Land Home Styles and HOA Color Compliance",
        body: "Most Sugar Land neighborhoods have an active HOA that maintains an approved color palette. Riverstone, Telfair, and Greatwood in particular require color submissions before exterior repaints, and we can walk you through that process. The most common Sugar Land elevations we paint are two-story brick-and-Hardie hybrids built between 1998 and 2012, full-stucco Mediterranean elevations more common in Telfair and Riverstone, and the older 1980s wood-trim traditionals in First Colony and Sugar Creek. Each one calls for a different prep strategy and a different product line — Hardie siding accepts coatings differently than stucco, and stucco corner cracks need to be addressed before any coating gets applied.",
      },
      whyLocalSection: {
        heading: "Why Sugar Land Homeowners Choose The Proud Paintbrush",
        body: "We live and work in Sugar Land. That matters because we have already painted houses on the streets near yours, we know the color palettes your HOA accepts, and we can usually show you a finished home within ten minutes of your address. We are insured, and locally owned — not a franchise running off a national playbook. Every estimate is delivered by the person who will be running your job, and every project carries our written warranty.",
      },
      faqs: [
        {
          q: "Do you handle Sugar Land HOA color approval submissions?",
          a: "Yes. We are familiar with the approval processes for Riverstone, Telfair, Greatwood, First Colony, and New Territory and can prepare the documentation most boards request, including color codes, product specs, and sample photos.",
        },
        {
          q: "How long does an exterior paint job last in Sugar Land?",
          a: "With proper prep and a quality coating system, most Sugar Land exteriors hold up well for seven to ten years on Hardie siding and brick, and five to eight years on stucco depending on sun exposure. South- and west-facing elevations always weather faster.",
        },
        {
          q: "What is the best time of year to paint a Sugar Land exterior?",
          a: "October through early May is ideal — lower humidity and stable temperatures help coatings cure properly. We work year-round, but we plan summer projects around the heat of the day and time application carefully to avoid coating failure.",
        },
        {
          q: "Do you paint stucco homes in Riverstone and Telfair?",
          a: "Yes. Stucco is one of our most common Sugar Land surfaces. We address hairline cracks, corner separations, and any efflorescence before applying an elastomeric or premium acrylic coating matched to the elevation.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "6P4_4GHaYP8",
        customerName: "Featured Sugar Land customer",
        customerNeighborhood: "Riverstone",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "4K_j8zfo2zQ" },
        { variant: "authentic", youtubeId: "gxB9xw9m34U" },
        { variant: "authentic", youtubeId: "LNmUGCgmTS0" },
      ],
      customerPhotos: [
        { src: "/images/migrated/white-modern-farmhouse-exterior-sugar-land-tx.webp", alt: "White modern farmhouse exterior freshly painted in Sugar Land, TX by The Proud Paintbrush" },
        { src: "/images/migrated/tan-stucco-exterior-repaint-sugar-land-tx.webp", alt: "Large tan stucco home exterior repainted in Sugar Land, TX by The Proud Paintbrush" },
        { src: "/images/migrated/brick-ranch-home-exterior-sugar-land-tx.webp", alt: "Brick ranch home exterior with fresh trim paint in Sugar Land, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_SUGAR_LAND_BEFORE_1.jpg", alt: "Sugar Land TX home exterior before repainting" },
          after: { src: "/images/exterior-sugar-land.jpg", alt: "Sugar Land TX home exterior after repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "If you live in Sugar Land and your exterior is fading, peeling, or just due for a refresh, we can have a free written estimate to you within a few days. Call (832) 605-0493 or book a walkthrough online.",
    },
    interior: {
      title: "Interior Painting in Sugar Land TX | Proud Paintbrush",
      description:
        "Expert interior painting in Sugar Land, TX. Serving Greatwood, Riverstone, First Colony & more. Locally owned, 5-star rated. Get your free estimate today!",
      h1: "Interior Painting in Sugar Land, TX",
      hero: {
        src: "/images/interior-painting-happy-customer-sugar-land-tx.jpg",
        alt: "Interior painting customer in Sugar Land TX standing in a freshly painted living room",
      },
      ogImage: "/images/interior-painting-project-happy-customer-sugar-land-tx.jpg",
      introParagraphs: [
        "We've painted interiors throughout Greatwood, New Territory, Sweetwater, Riverstone, Avalon at Riverstone, Sugar Creek, and First Colony. Sugar Land homes deal with high humidity and aggressive AC cycling that causes paint to bubble, peel, and show moisture stains faster than in drier climates. We use the right primers and paints for the Gulf Coast environment so your interior finish holds up — not just looks good on day one.",
        "Inside a Sugar Land home the work is less about weather and more about how the house actually lives. Tall foyers in Riverstone and Telfair, long sightlines between great rooms and kitchens, and the bright Gulf Coast light coming through two stories of windows all show every roller mark and missed cut line. We prep, prime, and cut by hand so the finish reads clean from across the room and up close.",
      ],
      climateSection: {
        heading: "How Sugar Land's Climate Shows Up Indoors",
        body: "Sugar Land's humidity does not stop at the front door. When outdoor air sits above 80 percent for weeks and the AC runs hard to fight it, the temperature swing between a cold supply vent and a warm exterior wall drives condensation inside closets, behind furniture on north walls, and across bathroom and laundry ceilings. On low-grade or poorly prepped surfaces that moisture lifts paint, blisters the sheen, and leaves the gray bloom of surface mildew. We handle it the way the problem actually works: a mildew-killing wash on any area that has bloomed, a moisture-resistant primer in bathrooms, laundry rooms, and the closets that back to exterior walls, and a scrubbable acrylic in a sheen matched to the room. Kitchens and baths get a satin or semi-gloss that wipes down; living areas get a matte or eggshell that hides the drywall texture common in 77479 and 77498 builds.",
      },
      neighborhoodsSection: {
        heading: "Sugar Land Neighborhoods We Paint Inside",
        intro: "We have rolled, cut, and cabinet-painted our way through Greatwood, New Territory, Sweetwater, Riverstone, Avalon at Riverstone, Sugar Creek, and First Colony. Each one has its own builder, its own wall texture, and its own interior quirks — and we adjust the prep accordingly.",
      },
      homeStylesSection: {
        heading: "Sugar Land Interior Surfaces and Finishes",
        body: "First Colony and Sugar Creek homes from the 1980s and early 1990s tend to have heavier wall and ceiling texture, original stained trim, and the occasional popcorn ceiling that owners want gone or repainted. Newer Riverstone and Telfair interiors lean toward two-story family rooms, painted built-ins, and large open kitchens where the wall color carries across several connected spaces — which makes color continuity and clean transitions matter more than in a closed floor plan. We handle walls, ceilings, trim, doors, closets, garages, and cabinets, and we match the product to the surface: a bonding primer and cabinet-grade enamel on kitchen cabinets, a stain-blocking primer over old oak trim before it goes white, and a flat ceiling paint that hides the lap lines two-story rooms love to reveal. Garages are their own conversation in Sugar Land — many homeowners in Telfair and Riverstone want the drywall and trim finished to the same standard as the interior, and we coat them with a scuffable, easy-clean product built for that warmer, less-conditioned space.",
      },
      whyLocalSection: {
        heading: "Why Sugar Land Homeowners Choose The Proud Paintbrush",
        body: "We are based in 77498 and interior repaints are a large share of what we do here. That means the crew taping off your baseboards has already painted homes on streets near yours, knows how the light moves through a Riverstone two-story by mid-afternoon, and can show you a finished interior nearby before you commit to a color. We are insured, and locally owned — not a franchise running a national script. The person who walks your home for the estimate is the same person running the job, every room is protected with drop cloths and plastic, and we clean up at the end of each day so you can live in the house while we work. We also keep the project on a clear schedule: most single rooms wrap in a day, a kitchen-cabinet refinish runs two to three days with proper dry time between coats, and a whole-home repaint in a Greatwood or New Territory two-story typically takes four to five working days. You get a written scope before we start, a daily walk-through if you want one, and a final inspection where we touch up anything you point out before we call the job done.",
      },
      faqs: [
        {
          q: "What interior surfaces do you paint in Sugar Land?",
          a: "We paint walls, ceilings, trim, doors, closets, garages, and cabinets throughout Sugar Land. We can handle a single room or a whole-home repaint.",
        },
        {
          q: "How does Sugar Land's humidity affect interior paint?",
          a: "High humidity and AC condensation can cause paint failure on poorly prepped or low-quality surfaces. We use moisture-resistant primers in bathrooms, laundry rooms, and other high-humidity spaces.",
        },
        {
          q: "Do you help with interior color selection in Sugar Land?",
          a: "Yes. We offer color consultation as part of our process and can help you select a palette that works with your home's lighting, finishes, and style.",
        },
        {
          q: "How long does an interior paint job take in Sugar Land?",
          a: "A single room typically takes one day. A whole-home repaint runs 3-5 days depending on size, prep needed, and number of colors.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "shzynACJsEw",
        customerName: "Featured Sugar Land interior customer",
        customerNeighborhood: "Riverstone",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "W96cOO6v1LA" },
        { variant: "authentic", youtubeId: "zT_z3yxJcL0" },
      ],
      customerPhotos: [
        { src: "/images/migrated/arched-window-living-room-repaint-sugar-land-tx.webp", alt: "Living room with arched windows freshly painted in Sugar Land, TX by The Proud Paintbrush" },
        { src: "/images/migrated/white-kitchen-marble-island-repaint-sugar-land-tx.webp", alt: "Bright kitchen with white cabinets and marble island painted in Sugar Land, TX by The Proud Paintbrush" },
        { src: "/images/migrated/white-brick-fireplace-repaint-sugar-land-tx.webp", alt: "Whitewashed brick fireplace painted in a Sugar Land, TX home by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_SUGAR_LAND_INTERIOR_BEFORE_1.jpg", alt: "Sugar Land TX interior before repainting" },
          after: { src: "/images/interior-painting-project-happy-customer-sugar-land-tx.jpg", alt: "Sugar Land TX interior after repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "Ready to refresh your Sugar Land home's interior? Get your free estimate today.",
    },
  },

  // ────────────────────────────────────────────────────────────────
  // MISSOURI CITY
  // ────────────────────────────────────────────────────────────────
  {
    slug: "missouri-city",
    name: "Missouri City",
    displayName: "Missouri City, Texas",
    county: "Fort Bend County",
    zips: ["77459", "77489"],
    neighborhoods: ["Sienna", "Quail Valley", "Lake Olympia", "Vicksburg", "Riverstone (Missouri City side)"],
    hero: {
      src: "/images/customer-missouri-city.webp",
      alt: "Exterior painting customer in Missouri City TX standing in front of freshly painted home",
    },
    ogImage: "/images/customer-missouri-city.webp",
    aggregateRating: { value: "5.0", count: 124 },
    exterior: {
      title: "Exterior Painting in Missouri City TX | Proud Paintbrush",
      description:
        "Exterior painting in Missouri City, TX serving Sienna, Quail Valley & Lake Olympia. Stucco repair, HOA-ready prep. Call (832) 605-0493.",
      h1: "Exterior Painting in Missouri City, Texas",
      introParagraphs: [
        "Missouri City exteriors face a very specific set of conditions: heavy clay soil shifting under foundations, full-sun Texas summers that bleach south-facing elevations, and stucco-heavy home designs throughout Sienna that need a different approach than the brick-and-Hardie homes in older Quail Valley. The Proud Paintbrush services all of 77459 and 77489, and exterior painting is the work we are best known for in Missouri City.",
        "On a typical Missouri City project we are looking at twelve- to twenty-year-old homes that have either never been repainted or had a cheap repaint that failed inside three years. The fix is not more paint — it is the right prep, the right product on each surface, and a crew that understands stucco corner cracks, fascia rot, and what humid Gulf Coast air does to coatings.",
      ],
      climateSection: {
        heading: "What Makes Painting in Missouri City Different",
        body: "Missouri City sits in the same Brazos clay belt as Sugar Land, but Sienna and Lake Olympia have a higher concentration of full-stucco homes than most surrounding cities. Stucco moves with temperature swings and develops hairline cracks at corners, around windows, and where the substrate transitions to brick or stone. Painting over those cracks without addressing them traps moisture and accelerates failure. We use elastomeric or premium acrylic coatings on Missouri City stucco depending on the substrate condition, and on brick and Hardie elevations we use traditional 100 percent acrylic exteriors rated for the Gulf Coast humidity. Every project also gets a fresh perimeter caulk pass — most three-year coating failures in this market trace back to caulk lines that were skipped during the original paint.",
      },
      neighborhoodsSection: {
        heading: "Missouri City Neighborhoods We Paint Most",
        intro: "Sienna alone covers thousands of homes built in waves from the late 1990s through today, and each phase has its own elevation styles and HOA color rules. Quail Valley and Lake Olympia bring an older, more varied housing stock. We have painted in every major subdivision in 77459.",
      },
      homeStylesSection: {
        heading: "Missouri City Home Styles and What They Need",
        body: "Sienna homes lean stucco-and-stone with brick accents — the most common repaint failure we see is stucco hairline cracks that were not addressed before the previous coating. Quail Valley has a mix of older traditional brick homes with painted wood trim and full-trim two-stories from the late 1980s. Lake Olympia includes more contemporary elevations with mixed siding and stucco. Each one calls for different surface prep and a different product. We walk every elevation and write the prep into the estimate so you know exactly what is happening before we start.",
      },
      whyLocalSection: {
        heading: "Why Missouri City Homeowners Choose The Proud Paintbrush",
        body: "We are a local Sugar Land–Missouri City business, not a national franchise. The person who quotes your job is the person running your job, and we have already painted homes on most of the streets you would consider neighbors. We are insured, and every Missouri City project carries our written warranty.",
      },
      faqs: [
        {
          q: "Do you handle Sienna and Quail Valley HOA color approvals?",
          a: "Yes. We have submitted color packages to the Sienna Residential Association and Quail Valley HOA dozens of times and know what each board typically requires.",
        },
        {
          q: "Can you repair stucco hairline cracks before painting?",
          a: "Yes. Stucco prep is a standard part of every Missouri City exterior project. We rake out hairline cracks where needed, patch with an appropriate material, and prime before topcoats go down.",
        },
        {
          q: "What product do you use on Sienna stucco homes?",
          a: "It depends on the condition of the existing coating and substrate. For homes with active hairline cracking or prior coating failure, we recommend an elastomeric system. For sound stucco, a premium acrylic exterior performs well and stays more breathable.",
        },
        {
          q: "How quickly can you start a Missouri City exterior project?",
          a: "Lead time varies by season. In October through April, we are usually two to four weeks out. In peak summer, we are typically four to six weeks out. We will give you a real start window in writing.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "E_GicxQ676A",
        customerName: "Featured Missouri City customer",
        customerNeighborhood: "Sienna",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "E_GicxQ676A" },
        { variant: "authentic", youtubeId: "shzynACJsEw" },
      ],
      customerPhotos: [
        { src: "/images/migrated/white-modern-farmhouse-exterior-missouri-city-tx.webp", alt: "White modern farmhouse exterior freshly painted in Missouri City, TX by The Proud Paintbrush" },
        { src: "/images/migrated/stucco-stone-home-exterior-missouri-city-tx.webp", alt: "Stucco and stone home exterior repainted in Missouri City, TX by The Proud Paintbrush" },
        { src: "/images/migrated/white-black-stucco-exterior-repaint-missouri-city-tx.webp", alt: "White and black stucco two-story home exterior in Missouri City, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_MISSOURI_CITY_BEFORE_1.jpg", alt: "Missouri City TX home before exterior repainting" },
          after: { src: "/images/customer-missouri-city.webp", alt: "Missouri City TX home after exterior repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "If your Missouri City exterior is showing fade, hairline cracks, or peeling, we can put together a real written estimate for you within a few days. Call (832) 605-0493 or book a walkthrough online.",
    },
    interior: {
      title: "Interior Painting in Missouri City TX | Proud Paintbrush",
      description:
        "Professional interior painting in Missouri City, TX. Serving Sienna, Quail Valley, Lake Olympia & more. Locally owned, 5-star rated. Free estimates.",
      h1: "Interior Painting in Missouri City, TX",
      hero: {
        src: "/images/customer-satisfied-interior.jpg",
        alt: "Interior painting customer in Missouri City TX in a freshly painted open-concept living space",
      },
      ogImage: "/images/customer-satisfied-interior.jpg",
      introParagraphs: [
        "We've worked inside homes throughout Sienna, Quail Valley, Lake Olympia, and Brightwater. Missouri City's newer construction often features open floor plans with tall ceilings, extensive trim work, and connected living spaces that require careful color planning and clean execution. We protect your floors, furniture, and finishes throughout the process so the only thing that changes is the paint.",
        "The thing about a modern Missouri City floor plan is that there is nowhere for a sloppy line to hide. When the entry, dining, kitchen, and family room all flow into one another under nine- and ten-foot ceilings, a single wall color often wraps three or four rooms, and every inside corner, every ceiling line, and every door casing is visible at a glance. We plan those transitions before we open a can, so the color breaks land where they should and the cut lines stay razor-clean.",
      ],
      climateSection: {
        heading: "What Sienna's Climate Does to Interior Paint",
        body: "Missouri City sits in the same humid Gulf Coast band as Sugar Land, and Sienna's tightly sealed newer homes actually trap that moisture more efficiently — great for energy bills, harder on paint in the wrong rooms. Bathrooms without run-on exhaust fans, laundry rooms, and the master closets that back to exterior walls are where we see condensation lift a builder's thin paint first. We prime those rooms with a moisture-resistant sealer and finish them in a scrubbable satin or semi-gloss that takes a wipe-down without burnishing. Across the rest of the home we use a quality low-sheen acrylic that resists the scuffing an active household generates and holds its color under the bright south-facing light common across 77459. We also pay attention to how the fine dust that blows off nearby open land settles on walls over time and dulls a finish; it comes off in our pre-paint cleaning so the new coat bonds to a sound surface rather than a film.",
      },
      neighborhoodsSection: {
        heading: "Missouri City Neighborhoods We Paint Inside",
        intro: "We have painted interiors throughout Sienna, Quail Valley, Lake Olympia, and Brightwater — from first repaints in the newest Sienna villages to full refreshes in established Quail Valley homes.",
      },
      homeStylesSection: {
        heading: "Missouri City Interior Surfaces and Ceilings",
        body: "Sienna's newer construction leans toward open-concept living, tall two-story family rooms, and a mix of smooth and lightly textured walls, while Quail Valley and Lake Olympia hold an older stock where popcorn and knockdown ceilings are still common. We handle all of it — flat, vaulted, and two-story ceilings, popcorn ceilings we either repaint cleanly or talk through removing, and the extensive trim and door packages these homes carry. On cabinets we use a bonding primer and a hard cabinet enamel; on ceilings we use a dead-flat product that keeps the eye from catching roller laps in those tall Sienna rooms. Sienna's village-by-village build-out also means wall textures change from phase to phase — orange-peel in the earlier sections, a finer knockdown in the newer ones — so we test a patch before we spray to make sure the new texture and sheen match what is already there. In Quail Valley and Lake Olympia, where homes are older, we budget time for drywall repair, nail-pop fills, and the settling cracks that come with two or three decades of Gulf Coast humidity cycles.",
      },
      whyLocalSection: {
        heading: "Why Missouri City Homeowners Choose The Proud Paintbrush",
        body: "Sienna is one of our most active neighborhoods, so the crew working in your home has likely already painted a near-identical floor plan a few streets over. We move standard furniture, mask and protect your floors and remaining pieces, and seal off the rooms we are working in so the dust and smell stay contained. We are insured, and locally owned, the estimator is the person who runs your job, and we leave each room cleaner than we found it. We also keep you in the loop on timing: a single Missouri City bedroom is usually a one-day job, while a full repaint across an open Sienna floor plan runs three to five days depending on ceiling height and color count. Tall two-story family rooms add a day for safe staging, and we factor that into the written estimate up front rather than surprising you mid-project.",
      },
      faqs: [
        {
          q: "Do you paint interiors in Sienna Plantation?",
          a: "Yes — Sienna is one of our most active areas in Missouri City for both interior and exterior painting.",
        },
        {
          q: "Can you paint popcorn or textured ceilings in Missouri City?",
          a: "Yes. We handle popcorn ceilings, knockdown texture, and smooth ceilings throughout Missouri City. We can paint over existing texture or discuss removal options.",
        },
        {
          q: "Do you move furniture before painting interiors in Missouri City?",
          a: "We move standard furniture as part of our process. Large or specialty items should be cleared in advance. We protect all flooring and remaining furniture with drop cloths.",
        },
        {
          q: "How do I prepare my Missouri City home for interior painting?",
          a: "We'll walk you through prep during your estimate. Generally: remove small décor and valuables, clear countertops, and let us handle the rest.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "yrbeE2EwCcA",
        customerName: "Featured Missouri City interior customer",
        customerNeighborhood: "Sienna",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "5rhZR2sQC2g" },
        { variant: "authentic", youtubeId: "AnJpFabDhOw" },
      ],
      customerPhotos: [
        { src: "/images/migrated/white-living-room-marble-floor-repaint-missouri-city-tx.webp", alt: "White living room with marble floors freshly painted in Missouri City, TX by The Proud Paintbrush" },
        { src: "/images/migrated/cream-formal-living-room-repaint-missouri-city-tx.webp", alt: "Cream formal living room repainted in a Missouri City, TX home by The Proud Paintbrush" },
        { src: "/images/migrated/gray-media-room-striped-accent-wall-missouri-city-tx.webp", alt: "Media room with gray striped accent wall painted in Missouri City, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_MISSOURI_CITY_INTERIOR_BEFORE_1.jpg", alt: "Missouri City TX interior before repainting" },
          after: { src: "/images/customer-satisfied-interior.jpg", alt: "Missouri City TX interior after repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "Missouri City homeowners — get a cleaner, fresher interior with The Proud Paintbrush. Free estimate today.",
    },
  },

  // ────────────────────────────────────────────────────────────────
  // KATY
  // ────────────────────────────────────────────────────────────────
  {
    slug: "katy",
    name: "Katy",
    displayName: "Katy, Texas",
    county: "Harris / Fort Bend / Waller counties",
    zips: ["77450", "77494", "77493", "77449"],
    neighborhoods: ["Cinco Ranch", "Falcon Point", "Cane Island", "Firethorne", "Tamarron", "Cross Creek Ranch"],
    hero: {
      src: "/images/ext-customer-katy.jpg",
      alt: "Exterior painting customer in Katy TX in front of freshly painted brick home",
    },
    ogImage: "/images/happy-customer-exterior-brick-painting-katy-tc.jpg",
    aggregateRating: { value: "5.0", count: 124 },
    exterior: {
      title: "Exterior Painting in Katy TX | The Proud Paintbrush",
      description:
        "Exterior painting in Katy, TX serving Cinco Ranch, Falcon Point & Cane Island. Hardie siding and brick specialists. HOA-ready. Free estimate: (832) 605-0493.",
      h1: "Exterior Painting in Katy, Texas",
      introParagraphs: [
        "Katy is one of the largest residential markets in the Houston metro, and the housing stock here has a few defining characteristics: Hardie siding is everywhere, Cinco Ranch alone is the size of a small city, and most exteriors have lived through both Hurricane Harvey and the 2021 winter storm. The Proud Paintbrush services every Katy ZIP from 77450 through 77493, and we are familiar with what each subdivision needs before we ever pull up to the curb.",
        "Most Katy exteriors we look at fall into one of two buckets — Hardie-and-brick two-stories built between 2003 and 2015 in Cinco Ranch and Falcon Point, or newer 2018-plus elevations in Cross Creek Ranch and Cane Island that have not had a first repaint yet but already show fade on south-facing walls. Each one needs a different conversation, and we will have it before any paint touches the house.",
      ],
      climateSection: {
        heading: "What Makes Painting in Katy Different",
        body: "Katy sits west of Houston and catches the full afternoon sun, which means south- and west-facing elevations bleach faster here than in most surrounding cities. Combined with the Gulf humidity that pushes mildew into shaded brick and trim, the typical Katy exterior coating cycle runs seven to ten years on Hardie and five to eight on stucco. Hardie siding also requires a specific prep approach — the factory primer fails over time, especially at field cuts and around fasteners, and skipping spot-priming during a repaint is the number-one reason coatings fail early in Cinco Ranch. We hand-inspect every elevation, spot-prime where the factory coating has failed, and apply a 100 percent acrylic exterior rated for Gulf Coast weather.",
      },
      neighborhoodsSection: {
        heading: "Katy Neighborhoods We Paint Most",
        intro: "Cinco Ranch dominates by volume, but Katy has dozens of distinct subdivisions. Each one has its own HOA, its own elevation styles, and its own paint history. We have worked across every major Katy community.",
      },
      homeStylesSection: {
        heading: "Katy Home Styles and HOA Realities",
        body: "Cinco Ranch enforces one of the more involved HOA approval processes in the Houston metro, and Falcon Point, Firethorne, and Cross Creek Ranch each have their own boards with their own palettes. Most Katy elevations combine brick on the lower portion with Hardie siding above, and a smaller share of homes — particularly in Cane Island — are full stucco. We carry sample colors and have submitted to most of the major Katy HOAs, so we can walk you through the approval steps without slowing the project down.",
      },
      whyLocalSection: {
        heading: "Why Katy Homeowners Choose The Proud Paintbrush",
        body: "We are not a franchise running off a national script. We are a locally owned, Sugar Land–based crew that has been painting Katy homes for years, and the person you talk to on the estimate is the person who runs your job. Every project is insured, and backed by a written warranty.",
      },
      faqs: [
        {
          q: "Do you submit color approvals to the Cinco Ranch HOA?",
          a: "Yes. We are familiar with the Cinco Ranch Residential Association approval process and the submission package they typically require, including color codes, exterior elevation photos, and product specifications.",
        },
        {
          q: "How do you prep Hardie siding before repainting?",
          a: "We pressure wash, inspect for factory coating failure (especially around field cuts and fasteners), spot-prime any bare or chalky areas, address caulking at every joint, and apply a 100 percent acrylic exterior. Spot-priming Hardie is the step most repaints skip.",
        },
        {
          q: "How long will an exterior paint job last in Katy?",
          a: "On Hardie and brick elevations with proper prep, seven to ten years is realistic. On stucco, five to eight years is more typical. South- and west-facing walls always weather first.",
        },
        {
          q: "Can you handle full-stucco homes in Cane Island?",
          a: "Yes. Cane Island stucco needs the same prep as other Katy stucco — hairline crack repair, corner detail, and an elastomeric or premium acrylic system depending on substrate condition.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "B3mAxVXwDoM",
        customerName: "Featured Katy customer",
        customerNeighborhood: "Cinco Ranch",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "jF9-nlPZAYE" },
        { variant: "authentic", youtubeId: "SItjnyqD0o8" },
        { variant: "authentic", youtubeId: "tLfUJtXRwss" },
      ],
      customerPhotos: [
        { src: "/images/migrated/white-brick-two-story-exterior-katy-tx.webp", alt: "White painted brick two-story home exterior in Katy, TX by The Proud Paintbrush" },
        { src: "/images/migrated/two-story-brick-home-exterior-katy-tx.webp", alt: "Two-story brick home exterior freshly painted in Katy, TX by The Proud Paintbrush" },
        { src: "/images/migrated/stucco-courtyard-tile-patio-katy-tx.webp", alt: "Stucco home with courtyard and tile patio painted in Katy, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_KATY_BEFORE_1.jpg", alt: "Katy TX home before exterior repainting" },
          after: { src: "/images/ext-customer-katy.jpg", alt: "Katy TX home after exterior repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "Whether you are in Cinco Ranch, Cane Island, or any of the newer Katy subdivisions, we can put together a real written estimate within a few days. Call (832) 605-0493 or book a walkthrough online.",
    },
    interior: {
      title: "Interior Painting in Katy TX | The Proud Paintbrush",
      description:
        "Top-rated interior painting in Katy, TX. Serving Cinco Ranch, Lakecrest, Grand Lakes & surrounding communities. Locally owned. Free estimates.",
      h1: "Interior Painting in Katy, TX",
      hero: {
        src: "/images/happy-customer-cabinet-painting-katy-tx.jpg",
        alt: "Interior cabinet painting customer in Katy TX in a freshly painted kitchen",
      },
      ogImage: "/images/happy-customer-cabinet-painting-katy-tx.jpg",
      introParagraphs: [
        "Katy's master-planned communities — Cinco Ranch, Lakecrest, Grand Lakes, Kelliwood, Firethorne, Grayson Lakes, Pine Mill Ranch, and Woodcreek Reserve — are filled with homes that deserve interiors as sharp as their exteriors. Whether you're updating a builder-grade paint job, refreshing after years of family life, or preparing to sell, we deliver clean lines, crisp trim work, and a finish your family will notice every day.",
        "Most of the Katy interiors we are called into started with the same thing: a fast, thin coat of flat builder paint that looked fine at the walkthrough and started showing scuffs, handprints, and touch-up flashing within a couple of years. A real interior repaint is not just a new color — it is a better product, a proper sheen for each room, and the kind of prep that makes the finish wipe clean instead of smearing. That is the upgrade Katy families notice every single day.",
      ],
      climateSection: {
        heading: "How Katy's Climate Affects Interior Paint",
        body: "West of Houston, Katy catches strong afternoon sun, and the rooms on the south and west sides of the house take a real beating of UV through large windows — colors that are not lightfast can shift or fade on those walls within a few years. Combined with Gulf humidity that pushes moisture into bathrooms and laundry rooms, the two things that protect a Katy interior are a fade-resistant quality paint and moisture-rated coatings where the water lives. We prime high-moisture rooms with a sealing primer, finish them in a scrubbable satin or semi-gloss, and use durable low-sheen acrylics through the living spaces so the south-facing great rooms hold their color as long as the rest of the house. Katy also sees big day-to-night temperature swings in spring and fall, and rooms over the garage or under an attic can run warm enough to flash a coating if it is applied in the heat of the afternoon — so we sequence those rooms for the cooler part of the day to let the paint level out and cure evenly.",
      },
      neighborhoodsSection: {
        heading: "Katy Neighborhoods We Paint Inside",
        intro: "Cinco Ranch, Lakecrest, Grand Lakes, Kelliwood, Firethorne, Grayson Lakes, Pine Mill Ranch, and Woodcreek Reserve all keep us busy — and after years of Katy interiors we know which builders used which textures and where the touch-up trouble spots tend to be.",
      },
      homeStylesSection: {
        heading: "Katy Interior Surfaces, Cabinets, and Trim",
        body: "Katy's master-planned homes share a recognizable interior: two-story entries, open kitchens that flow into family rooms, generous trim and door packages, and kitchen cabinets that are usually the first thing owners want refreshed. Cabinet painting is one of our most-requested Katy services, and we treat it as the precision job it is — degrease, sand, bonding primer, and a sprayed cabinet-grade enamel that stands up to daily use. On walls and trim we deliver crisp lines and clean transitions; on ceilings we use a flat product that hides lap marks in the tall Cinco Ranch rooms. Many Katy homes also have an upstairs game room or media room that takes the hardest wear in the house, and those are prime candidates for a more durable scrubbable finish rather than the builder's flat. Where kids' rooms and hallways have years of scuffs, handprints, and the occasional crayon, we spot-prime stains so they do not bleed through, then finish in an eggshell or satin that actually wipes clean.",
      },
      whyLocalSection: {
        heading: "Why Katy Families Choose The Proud Paintbrush",
        body: "We work efficiently room by room so families can stay in the house while we paint — we seal off the active work area, protect floors and furniture, and clean up every day rather than leaving a job-site mess overnight. We are insured, and locally owned, not a franchise, and the person who quotes your Katy home is the one running the crew inside it. Whether you are upgrading builder-grade paint, refreshing after years of family life, or prepping to sell, the finish is built to last. We schedule Katy projects around your family's routine, work the busiest shared spaces first or last depending on what disrupts you least, and keep the job contained to one zone at a time so the rest of the house stays livable. Every project is backed by our written warranty, and the final coat does not get signed off until you have walked it with us.",
      },
      faqs: [
        {
          q: "Do you paint interiors in Cinco Ranch?",
          a: "Yes — Cinco Ranch is one of our primary service areas in Katy for interior painting.",
        },
        {
          q: "Can you paint kitchen cabinets in Katy?",
          a: "Yes. Cabinet painting is one of our most requested services in Katy. We use proper bonding primers and cabinet-specific finishes for a result that holds up to daily use.",
        },
        {
          q: "Do you paint new construction interiors in Katy?",
          a: "Yes. New construction often has builder-grade paint that shows wear quickly. We repaint to a higher standard using better products and proper prep.",
        },
        {
          q: "How disruptive is interior painting for a family in Katy?",
          a: "We work efficiently room by room to minimize disruption. Most families stay home during the project. We seal off work areas and clean up daily.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "JqY3L7IJOOY",
        customerName: "Featured Katy interior customer",
        customerNeighborhood: "Cinco Ranch",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "yrbeE2EwCcA" },
        { variant: "authentic", youtubeId: "6P4_4GHaYP8" },
      ],
      customerPhotos: [
        { src: "/images/migrated/greige-living-room-tray-ceiling-repaint-katy-tx.webp", alt: "Living room with greige walls and tray ceiling painted in Katy, TX by The Proud Paintbrush" },
        { src: "/images/migrated/cream-living-room-fireplace-repaint-katy-tx.jpg", alt: "Cream living room with fireplace repainted in a Katy, TX home by The Proud Paintbrush" },
        { src: "/images/migrated/gray-blue-kitchen-cabinet-repaint-katy-tx.webp", alt: "Kitchen with gray-blue painted cabinets in Katy, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_KATY_INTERIOR_BEFORE_1.jpg", alt: "Katy TX interior before repainting" },
          after: { src: "/images/happy-customer-cabinet-painting-katy-tx.jpg", alt: "Katy TX interior after repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "Katy families trust The Proud Paintbrush for interior painting that lasts. Get your free estimate today.",
    },
  },

  // ────────────────────────────────────────────────────────────────
  // ROSENBERG
  // ────────────────────────────────────────────────────────────────
  {
    slug: "rosenberg",
    name: "Rosenberg",
    displayName: "Rosenberg, Texas",
    county: "Fort Bend County",
    zips: ["77471"],
    neighborhoods: ["Bonbrook Plantation", "Walnut Creek", "Briarwood Crossing", "Old Rosenberg historic district"],
    hero: {
      src: "/images/exterior-painting-happy-customer-richmond-tx.jpg",
      alt: "Exterior painting customer in Rosenberg TX area in front of freshly painted home",
    },
    ogImage: "/images/exterior-painting-happy-customer-richmond-tx.jpg",
    aggregateRating: { value: "5.0", count: 124 },
    exterior: {
      title: "Exterior Painting in Rosenberg TX | The Proud Paintbrush",
      description:
        "Exterior painting in Rosenberg, TX from a local Fort Bend crew. Older homes, newer subdivisions, fence and trim work. Free estimate: (832) 605-0493.",
      h1: "Exterior Painting in Rosenberg, Texas",
      introParagraphs: [
        "Rosenberg has one of the most varied housing stocks in Fort Bend County. The historic district near downtown holds older wood-clad homes from the early- and mid-twentieth century, while subdivisions like Bonbrook Plantation, Walnut Creek, and Briarwood Crossing add newer brick-and-Hardie construction from the last fifteen years. The Proud Paintbrush works across all of 77471, and exterior painting is the project we run most often here.",
        "What makes Rosenberg different from Sugar Land or Missouri City is that HOAs are generally less restrictive — homeowners have more freedom on color and style, and older homes in the historic district can keep their character through thoughtful color choices instead of being locked into a beige palette. That is a real advantage if you want to do something distinctive.",
      ],
      climateSection: {
        heading: "What Makes Painting in Rosenberg Different",
        body: "Older wood-clad homes in Rosenberg have very different prep needs than newer subdivision construction. Wood siding develops checking, alligatoring, and end-grain failure that primer alone will not fix — those surfaces need to be scraped back to sound material, spot-primed with a flexible exterior primer, and topped with a high-build acrylic. On the newer Hardie-and-brick homes in Bonbrook and Briarwood Crossing, the failure points are factory primer breakdown and caulk-joint separation, and the prep follows the same pattern as Sugar Land and Katy: pressure wash, spot prime, re-caulk every joint, and topcoat with a Gulf-Coast-rated 100 percent acrylic. Rosenberg sits on the same shifting clay soil as the rest of Fort Bend, so fascia and trim work is almost always part of the project.",
      },
      neighborhoodsSection: {
        heading: "Rosenberg Areas We Paint Most",
        intro: "From the historic core to the newer subdivisions along the FM 762 corridor, we have painted across every part of Rosenberg.",
      },
      homeStylesSection: {
        heading: "Rosenberg Home Styles",
        body: "Historic Rosenberg homes tend to be wood-clad, often with painted brick foundations and decorative trim that benefits from a careful brush-and-roll finish rather than a fast spray-only application. Newer subdivisions like Bonbrook Plantation are dominated by Hardie siding with brick veneer, and a smaller portion of newer construction in Walnut Creek includes stucco accents. We tailor the prep and product choice to the elevation in front of us, not a one-size approach.",
      },
      whyLocalSection: {
        heading: "Why Rosenberg Homeowners Choose The Proud Paintbrush",
        body: "We are a local Fort Bend–based crew and we treat Rosenberg projects with the same level of prep and warranty as anything we do in Sugar Land. Insured, locally owned, and the person who estimates the job is the person who runs the crew on site.",
      },
      faqs: [
        {
          q: "Do you paint older wood-clad homes in historic Rosenberg?",
          a: "Yes, and we approach them very differently from newer construction. Older wood siding needs careful scraping, spot priming with a flexible exterior primer, and a high-quality acrylic topcoat — not a fast wash-and-spray.",
        },
        {
          q: "Can I choose a non-standard color in Rosenberg?",
          a: "In most Rosenberg neighborhoods, yes. Historic district and subdivision rules vary, but Rosenberg is generally less restrictive than Sugar Land or Katy, which gives you real freedom on color.",
        },
        {
          q: "Do you handle fascia and trim rot repair before painting?",
          a: "Yes. Carpentry-level repair for rotted fascia, trim, and corner boards is a standard part of our exterior projects. We write the repairs into the estimate before the project starts.",
        },
        {
          q: "How quickly can you start an exterior project in Rosenberg?",
          a: "We can usually start within two to five weeks depending on the season. Cooler months book up first because the weather window is ideal for exterior work.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "jF9-nlPZAYE",
        customerName: "Featured Rosenberg customer",
        customerNeighborhood: "Bonbrook Plantation",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "B3mAxVXwDoM" },
        { variant: "authentic", youtubeId: "-bnDu_8HApE" },
      ],
      customerPhotos: [
        { src: "/images/migrated/modern-stone-exterior-pool-patio-rosenberg-tx.webp", alt: "Modern stone home exterior with pool patio in Rosenberg, TX by The Proud Paintbrush" },
        { src: "/images/migrated/brick-stone-home-exterior-rosenberg-tx.webp", alt: "Brick and stone two-story home exterior in Rosenberg, TX by The Proud Paintbrush" },
        { src: "/images/migrated/white-stucco-exterior-repaint-rosenberg-tx.webp", alt: "White stucco home exterior with stone base repainted in Rosenberg, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_ROSENBERG_BEFORE_1.jpg", alt: "Rosenberg TX home before exterior repainting" },
          after: { src: "/images/exterior-painting-happy-customer-richmond-tx.jpg", alt: "Rosenberg TX home after exterior repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "If you are in Rosenberg and looking at an exterior repaint — historic home or new build — we can put together a real written estimate within a few days. Call (832) 605-0493 or book a walkthrough online.",
    },
    interior: {
      title: "Interior Painting in Rosenberg TX | The Proud Paintbrush",
      description:
        "Expert interior painting in Rosenberg, TX. Serving Kingdom Heights, Bonbrook, Seabourne area & more. Locally owned, 5-star rated. Free estimates.",
      h1: "Interior Painting in Rosenberg, TX",
      hero: {
        src: "/images/warranty-white-cabinets.jpg",
        alt: "Interior cabinet painting in a Rosenberg TX home with crisp white cabinets",
      },
      ogImage: "/images/warranty-white-cabinets.jpg",
      introParagraphs: [
        "Rosenberg homeowners in Kingdom Heights, Bonbrook, and the Seabourne area get the same quality interior painting as our Sugar Land clients — same crew, same products, same prep standards, same warranty. Whether you're refreshing a single room or repainting your entire home, we show up on time, protect your belongings, and leave the space cleaner than we found it.",
        "The thing Rosenberg homeowners tell us they appreciate most is that nothing changes between our Sugar Land jobs and our Rosenberg jobs except the drive — it is the same crew, the same products, the same prep standards, and the same written warranty. A repaint here gets full attention, whether it is one bedroom or the whole house.",
      ],
      climateSection: {
        heading: "How the Gulf Coast Climate Affects Rosenberg Interiors",
        body: "Rosenberg sits in the same humid Fort Bend belt as the rest of our service area, so the interior trouble spots are the familiar ones: bathrooms, laundry rooms, and closets on exterior walls where condensation and steam break down a thin or poorly prepped coat first. We prime those rooms with a moisture-resistant sealer and finish them in a scrubbable satin or semi-gloss that wipes clean. Across the rest of the home we use a durable low-sheen acrylic chosen to stand up to daily wear. Rosenberg's mix of older homes and newer subdivision builds means we read each surface before we quote, rather than assuming every house needs the same product. Rosenberg's older homes near the historic core add another wrinkle indoors: some still have original single-pane windows and less insulation, which means more condensation on interior walls in winter and more temperature variation room to room. We account for that when we choose primers and sheens, leaning on moisture-tolerant products in the rooms that need them rather than treating the whole house the same. Newer Bonbrook and Kingdom Heights builds are tighter and more uniform, so there the focus shifts to upgrading thin builder paint to something that stands up to family traffic.",
      },
      neighborhoodsSection: {
        heading: "Rosenberg Areas We Paint Inside",
        intro: "Kingdom Heights, Bonbrook, and the Seabourne area are part of our regular Rosenberg interior service area, alongside the older homes nearer the historic core.",
      },
      homeStylesSection: {
        heading: "Rosenberg Interior Surfaces, Trim, and Color Matching",
        body: "Rosenberg's housing runs from newer Hardie-and-brick subdivision homes with smooth-to-lightly-textured walls to older homes with more dated trim, heavier texture, and the occasional popcorn ceiling. We handle walls, ceilings, trim, baseboards, doors, and window casings throughout, matching product to surface — a stain-blocking primer where old trim is going lighter, a flat ceiling paint that hides lap lines, and a hard enamel on trim and doors. We can color-match your existing paint exactly when you only want to freshen what is already there, or help you choose something new, and we work with all the major paint brands. Accent walls, two-tone trim, and refreshed cabinet doors are popular requests in Rosenberg's newer subdivisions, where homeowners want to personalize a builder-standard interior without a full remodel. In the older homes, we spend more time on prep — filling settling cracks, sealing previously oil-painted trim, and addressing any water staining — because a careful surface is the difference between a finish that lasts a decade and one that fails in a couple of years. Either way, we write the exact scope into the estimate so you know what you are paying for.",
      },
      whyLocalSection: {
        heading: "Why Rosenberg Homeowners Choose The Proud Paintbrush",
        body: "We give Rosenberg the same quality our Sugar Land clients get — same crew, same products, same standards, same warranty. We show up on time, protect your belongings and floors, contain each work area, and leave the space cleaner than we found it. The Proud Paintbrush is fully insured for all interior work in Rosenberg and Fort Bend County, and the person who estimates your home is the one running the job. Being a Fort Bend–based crew means Rosenberg is a short drive, not an afterthought tacked onto the end of a route, so we show up when we say we will and finish on the timeline we quote. A single room is typically a one-day job; a whole-home interior runs three to five days depending on size and color count. We protect floors and furniture, contain dust to the active room, and back every interior project with the same written warranty we stand behind in Sugar Land.",
      },
      faqs: [
        {
          q: "Do you paint interiors in Kingdom Heights Rosenberg?",
          a: "Yes — Kingdom Heights and surrounding Rosenberg communities are part of our regular interior painting service area.",
        },
        {
          q: "Can you match my existing interior paint color in Rosenberg?",
          a: "Yes. We can color-match existing paint or help you select something new. We work with all major paint brands.",
        },
        {
          q: "Do you paint interior trim and doors in Rosenberg?",
          a: "Yes. Trim, baseboards, doors, and window casings are included in our interior painting services throughout Rosenberg.",
        },
        {
          q: "Is The Proud Paintbrush insured for interior work in Rosenberg?",
          a: "Yes — fully insured for all interior painting in Rosenberg and Fort Bend County.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "gY1VnnU308o",
        customerName: "Featured Rosenberg interior customer",
        customerNeighborhood: "Kingdom Heights",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "gN2iVF5ig_8" },
        { variant: "authentic", youtubeId: "gzCLxCBP1o0" },
      ],
      customerPhotos: [
        { src: "/images/migrated/rosenberg-tx-luxury-neutral-living-room-painting.webp", alt: "Neutral luxury living room repainted in a Rosenberg, TX home by The Proud Paintbrush" },
        { src: "/images/migrated/master-bedroom-ceiling-walls-trim-crown-rosenberg-tx.webp", alt: "Master bedroom walls, ceiling, trim, and crown molding painted in Rosenberg, TX by The Proud Paintbrush" },
        { src: "/images/migrated/color-drenched-living-room-walls-ceiling-trim-rosenberg-tx.webp", alt: "Color-drenched living room with painted walls, ceiling, and trim in Rosenberg, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_ROSENBERG_INTERIOR_BEFORE_1.jpg", alt: "Rosenberg TX interior before repainting" },
          after: { src: "/images/warranty-white-cabinets.jpg", alt: "Rosenberg TX interior after repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "Rosenberg homeowners — same Sugar Land quality, right in your neighborhood. Free estimate today.",
    },
  },

  // ────────────────────────────────────────────────────────────────
  // RICHMOND
  // ────────────────────────────────────────────────────────────────
  {
    slug: "richmond",
    name: "Richmond",
    displayName: "Richmond, Texas",
    county: "Fort Bend County",
    zips: ["77406", "77407", "77469"],
    neighborhoods: ["Aliana", "Pecan Grove", "Bridlewood Estates", "Long Meadow Farms", "Old Richmond historic district"],
    hero: {
      src: "/images/hero-stucco-richmond.webp",
      alt: "Exterior painting on a stucco home in Richmond TX with freshly painted trim",
    },
    ogImage: "/images/exterior-painting-happy-customer-richmond-tx.jpg",
    aggregateRating: { value: "5.0", count: 124 },
    exterior: {
      title: "Exterior Painting in Richmond TX | The Proud Paintbrush",
      description:
        "Exterior painting in Richmond, TX serving Aliana, Pecan Grove & Long Meadow Farms. Stucco, brick, and Hardie specialists. Free estimate: (832) 605-0493.",
      h1: "Exterior Painting in Richmond, Texas",
      introParagraphs: [
        "Richmond covers a wide stretch of Fort Bend County, and the housing stock reflects it — newer master-planned communities like Aliana and Long Meadow Farms on one side, established neighborhoods like Pecan Grove and Bridlewood Estates in the middle, and the historic core of old Richmond on the other. Each part needs a different exterior strategy. The Proud Paintbrush services every Richmond ZIP — 77406, 77407, and 77469 — and exterior painting is the work we run most often here.",
        "What we hear from Richmond homeowners is usually one of two things: 'this is the first repaint since we moved in,' or 'the last paint job started failing in two years.' Both are fixable. The difference between a coating that lasts ten years and one that fails in three is almost entirely in the prep — and on a Richmond elevation, prep means stucco crack repair, fascia inspection, and proper caulking at every joint.",
      ],
      climateSection: {
        heading: "What Makes Painting in Richmond Different",
        body: "Richmond exteriors deal with the same Brazos River clay belt that runs through Sugar Land and Missouri City, so foundation movement and trim stress are part of every project. Aliana has a high concentration of stucco-and-stone elevations that develop hairline cracks within five to seven years, and the older neighborhoods of Pecan Grove and Bridlewood have aging wood trim that almost always needs some carpentry repair before paint. We handle the rot repair, the stucco patching, the spot priming, and the topcoat as part of one written scope — not a series of change orders.",
      },
      neighborhoodsSection: {
        heading: "Richmond Neighborhoods We Paint Most",
        intro: "Richmond is geographically large, and each subdivision has its own elevation style and HOA rules. We have worked across all the major ones.",
      },
      homeStylesSection: {
        heading: "Richmond Home Styles and HOA Considerations",
        body: "Aliana is dominated by stucco-and-stone Mediterranean elevations from the 2010s, Long Meadow Farms leans Hardie-and-brick, and Pecan Grove holds a mix of older brick traditionals and wood-trim two-stories from the 1980s and 1990s. Each elevation calls for a different product line. Aliana stucco often performs best with an elastomeric system after crack repair, Hardie-and-brick in Long Meadow does well with a premium acrylic, and older Pecan Grove wood needs flexible primer and a high-build topcoat. HOA rules are stricter in Aliana and Long Meadow than in Pecan Grove — we can walk you through the approval steps for either.",
      },
      whyLocalSection: {
        heading: "Why Richmond Homeowners Choose The Proud Paintbrush",
        body: "We are local, insured, and not a franchise. Every Richmond project is run by the person who estimated it, and every job is backed by our written warranty. We have already painted homes on most Richmond streets you would consider neighbors.",
      },
      faqs: [
        {
          q: "Do you handle Aliana HOA color approvals?",
          a: "Yes. The Aliana ARC requires a color submission for exterior repaints, and we have prepared that package many times. We can walk you through what they typically approve.",
        },
        {
          q: "Can you repair stucco hairline cracks on Aliana homes?",
          a: "Yes. Stucco crack repair is standard for Aliana exteriors. We rake out hairline cracks, patch with the right material, prime, and topcoat with the appropriate system based on substrate condition.",
        },
        {
          q: "Do you do carpentry repair on Pecan Grove trim?",
          a: "Yes. Older Pecan Grove wood trim almost always needs some level of rot repair before paint. We write the carpentry into the estimate so there are no surprises mid-project.",
        },
        {
          q: "How long does an exterior paint job last in Richmond?",
          a: "Seven to ten years on Hardie and brick with proper prep, and five to eight years on stucco depending on exposure. South- and west-facing walls weather faster than the rest.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "gN2iVF5ig_8",
        customerName: "Featured Richmond customer",
        customerNeighborhood: "Aliana",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "xHFK54C4mc0" },
        { variant: "authentic", youtubeId: "Z208PaNZY4U" },
      ],
      customerPhotos: [
        { src: "/images/migrated/richmond-tx-spanish-style-exterior-house-painting.webp", alt: "Spanish-style stucco home exterior freshly painted in Richmond, TX by The Proud Paintbrush" },
        { src: "/images/migrated/backyard-pool-home-exterior-richmond-tx.webp", alt: "Brick home exterior with backyard pool in Richmond, TX by The Proud Paintbrush" },
        { src: "/images/migrated/richmond-tx-large-exterior-house-painting.webp", alt: "Large home exterior repainted in Richmond, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_RICHMOND_BEFORE_1.jpg", alt: "Richmond TX home before exterior repainting" },
          after: { src: "/images/hero-stucco-richmond.webp", alt: "Richmond TX home after exterior repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "Whether you are in Aliana, Pecan Grove, Long Meadow Farms, or anywhere else in Richmond, we can put together a real written estimate within a few days. Call (832) 605-0493 or book a walkthrough online.",
    },
    interior: {
      title: "Interior Painting in Richmond TX | The Proud Paintbrush",
      description:
        "Expert interior painting in Richmond, TX. Serving Long Meadow Farms, Harvest Green, Aliana & more. Locally owned, 5-star rated. Free estimates.",
      h1: "Interior Painting in Richmond, TX",
      hero: {
        src: "/images/cabinet-kitchen-richmond.jpg",
        alt: "Interior kitchen cabinet painting in a Richmond TX home with freshly painted cabinets",
      },
      ogImage: "/images/cabinet-kitchen-richmond.jpg",
      introParagraphs: [
        "Richmond's fast-growing communities — Long Meadow Farms, Harvest Green, Lakes of Bella Terra, Aliana, Grand Mission, Pecan Grove, and Veranda — are home to families who take pride in how their homes look inside and out. We've painted interiors throughout Richmond and bring the same level of prep, protection, and craftsmanship to every room we touch.",
        "Richmond's newer communities are full of homes still on their first coat of paint, and the question we hear most is whether a repaint is really worth it on a house that is only a few years old. It is — builder paint is sprayed fast and thin to hit a price, and a proper interior repaint with quality product and real prep transforms how a room feels and how long it stays looking new. We bring that standard to every room, from a single accent wall to a full-home refresh.",
      ],
      climateSection: {
        heading: "How Richmond's Climate Shows Up Indoors",
        body: "Richmond shares the Fort Bend humidity profile, and the same Gulf moisture that stresses exteriors finds its way into interior problem spots — bathrooms, laundry rooms, and closets along exterior walls in Long Meadow Farms, Harvest Green, and Aliana. Where a builder used a thin flat paint in those rooms, condensation and steam break it down early. We prime moisture-prone rooms with a sealing primer and finish them in a wipeable satin or semi-gloss, then run a durable, low-VOC acrylic through the rest of the home. Because so many Richmond households have young children and pets, we lean on low- and zero-VOC products and keep the home ventilated throughout, so the air is comfortable to be in while we work and after. Richmond's master-planned homes are also tightly sealed for energy efficiency, which is great for utility bills but means paint fumes and dust linger longer without active ventilation — so we run air movement through the work zone and schedule the lowest-odor products for bedrooms and nurseries. In the summer, when the AC is fighting triple-digit heat, we time application so coatings cure in stable indoor conditions rather than during the hardest part of the cooling cycle.",
      },
      neighborhoodsSection: {
        heading: "Richmond Neighborhoods We Paint Inside",
        intro: "Long Meadow Farms, Harvest Green, Lakes of Bella Terra, Aliana, Grand Mission, Pecan Grove, and Veranda all fall inside our regular Richmond interior service area, from brand-new builds to established homes due for their first real repaint.",
      },
      homeStylesSection: {
        heading: "Richmond Interior Surfaces and Ceilings",
        body: "Richmond's master-planned homes carry a lot of ceiling variety — flat ceilings in the bedrooms, vaulted ceilings over family rooms, and tray and coffered ceilings in the dining and primary suites that builders use as a selling feature. Those detailed ceilings reward careful cutting and the right flat product, and they are easy to do badly in a rush. We also handle the heavy trim and door packages these homes carry and the kitchen cabinets that are one of our most-requested Richmond projects. Whole-home repaints and cabinet painting are the two jobs we run most often in Richmond's newer communities, and each gets surface-specific prep and product. Two-story foyers and the open stair walls common in Long Meadow Farms and Harvest Green need proper staging to reach and finish evenly, and we come equipped for that rather than improvising off a ladder. We also see a lot of requests to take builder-beige interiors to a brighter, more current palette, which usually means an extra coat for full coverage — something we build into the estimate so the price does not move once we start.",
      },
      whyLocalSection: {
        heading: "Why Richmond Homeowners Choose The Proud Paintbrush",
        body: "Richmond families take pride in how their homes look inside and out, and we bring the same prep, protection, and craftsmanship to an interior that we bring to an exterior. We are insured, and locally owned; we protect floors and furniture, contain dust and fumes room by room, and use family- and pet-safe products as the default. The person who estimates your Richmond home is the person running the job, and every project is backed by our written warranty. Timing in Richmond is straightforward: a single room is usually one day, cabinet painting runs two to three days with dry time between coats, and a full-home repaint takes four to five working days depending on size and ceiling height. You get that schedule in writing, a contained work zone so the rest of the house stays usable, and a final walk-through before we consider the job finished.",
      },
      faqs: [
        {
          q: "Do you paint interiors in Long Meadow Farms?",
          a: "Yes — Long Meadow Farms is one of our confirmed service areas in Richmond for interior painting.",
        },
        {
          q: "What's the most popular interior painting project in Richmond?",
          a: "Whole-home repaints and kitchen cabinet painting are our most requested interior services in Richmond's newer communities.",
        },
        {
          q: "Do you paint ceilings in Richmond homes?",
          a: "Yes. We paint flat ceilings, vaulted ceilings, tray ceilings, and coffered ceilings throughout Richmond.",
        },
        {
          q: "Is interior painting safe for my family and pets in Richmond?",
          a: "Yes. We use low-VOC and zero-VOC paint options and ensure proper ventilation throughout the project. We'll recommend the safest products for your home.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "Z208PaNZY4U",
        customerName: "Featured Richmond interior customer",
        customerNeighborhood: "Long Meadow Farms",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "4K_j8zfo2zQ" },
        { variant: "authentic", youtubeId: "gxB9xw9m34U" },
      ],
      customerPhotos: [
        { src: "/images/migrated/great-room-kitchen-neutral-walls-richmond-tx.webp", alt: "Great room and kitchen with neutral walls painted in Richmond, TX by The Proud Paintbrush" },
        { src: "/images/migrated/gray-two-story-living-room-repaint-richmond-tx.webp", alt: "Two-story living room with gray walls repainted in Richmond, TX by The Proud Paintbrush" },
        { src: "/images/migrated/cream-dining-room-vaulted-ceiling-repaint-richmond-tx.webp", alt: "Cream dining room with vaulted ceiling repainted in Richmond, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_RICHMOND_INTERIOR_BEFORE_1.jpg", alt: "Richmond TX interior before repainting" },
          after: { src: "/images/cabinet-kitchen-richmond.jpg", alt: "Richmond TX interior after repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "Richmond homeowners — freshen up your interior with a team you can trust. Free estimate today.",
    },
  },

  // ────────────────────────────────────────────────────────────────
  // FULSHEAR
  // ────────────────────────────────────────────────────────────────
  {
    slug: "fulshear",
    name: "Fulshear",
    displayName: "Fulshear, Texas",
    county: "Fort Bend County",
    zips: ["77441"],
    neighborhoods: ["Cross Creek Ranch", "Fulbrook on Fulshear Creek", "Jordan Ranch", "Tamarron (Fulshear side)", "Polo Ranch"],
    hero: {
      src: "/images/happy-customer-fulshear-tx-door-refinishing.jpg",
      alt: "Exterior painting customer in Fulshear TX in front of freshly painted home and refinished door",
    },
    ogImage: "/images/happy-customer-fulshear-tx-door-refinishing.jpg",
    aggregateRating: { value: "5.0", count: 124 },
    exterior: {
      title: "Exterior Painting in Fulshear TX | The Proud Paintbrush",
      description:
        "Exterior painting in Fulshear, TX serving Cross Creek Ranch, Fulbrook & Jordan Ranch. New-build touch-ups & full repaints. Call (832) 605-0493.",
      h1: "Exterior Painting in Fulshear, Texas",
      introParagraphs: [
        "Fulshear is one of the fastest-growing communities in Fort Bend County, and most of the housing here is newer — Cross Creek Ranch, Fulbrook on Fulshear Creek, and Jordan Ranch hold thousands of homes built since 2010. That changes what an exterior project looks like compared to Sugar Land or Pecan Grove. The Proud Paintbrush services all of 77441, and we do a steady volume of Fulshear exterior work — both first-time repaints on the oldest homes in Cross Creek and targeted touch-up projects on newer builds.",
        "Because so many Fulshear homes are still under ten years old, the question is usually 'do I need to repaint the whole thing, or just refresh the south-facing trim?' We will tell you straight. If a partial scope is the right answer, that is what we will recommend.",
      ],
      climateSection: {
        heading: "What Makes Painting in Fulshear Different",
        body: "Newer construction has its own failure pattern. The factory primer on Hardie siding starts breaking down around year seven, especially around field cuts and fastener heads, and the south- and west-facing elevations bleach a full shade before anything else. On stucco-accent homes in Cross Creek Ranch and Fulbrook, the corners and window returns are the first places to develop hairline cracks. We address all of that with spot priming, caulk replacement, and a Gulf-Coast-rated acrylic system — not a quick wash-and-spray that leaves the failure points untouched.",
      },
      neighborhoodsSection: {
        heading: "Fulshear Neighborhoods We Paint Most",
        intro: "Fulshear is dominated by master-planned communities, and we have worked across the major ones.",
      },
      homeStylesSection: {
        heading: "Fulshear Home Styles and HOA Realities",
        body: "Cross Creek Ranch enforces strict architectural review for exterior repaints, and Fulbrook on Fulshear Creek and Jordan Ranch each maintain their own approved color palettes. Most Fulshear elevations are Hardie-and-brick or Hardie-and-stone hybrids, with a smaller share of full-stucco contemporary builds. We carry color samples and have submitted to each of the major Fulshear HOAs, so the approval process does not slow the project.",
      },
      whyLocalSection: {
        heading: "Why Fulshear Homeowners Choose The Proud Paintbrush",
        body: "We are a local Fort Bend crew, not a national franchise. The person estimating your job is the person running the crew, and every Fulshear project is insured, and backed by our written warranty.",
      },
      faqs: [
        {
          q: "Do you submit color approvals to the Cross Creek Ranch HOA?",
          a: "Yes. We have submitted color packages to the Cross Creek Ranch architectural review committee and are familiar with what they require, including approved palettes and submission documentation.",
        },
        {
          q: "Can you do partial-scope repaints on newer Fulshear homes?",
          a: "Yes. If your home is under ten years old and only the south- or west-facing trim has weathered, we will quote a partial scope rather than push a full repaint you do not need.",
        },
        {
          q: "How do you handle Hardie siding spot-priming?",
          a: "We hand-inspect every elevation for factory coating failure — especially around field cuts and fasteners — spot-prime the affected areas, and topcoat with a 100 percent acrylic exterior rated for the Gulf Coast.",
        },
        {
          q: "When is the best time to repaint in Fulshear?",
          a: "October through May is ideal — lower humidity helps coatings cure properly. We work year-round but schedule summer projects carefully to avoid coating failure from heat.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "LNmUGCgmTS0",
        customerName: "Featured Fulshear customer",
        customerNeighborhood: "Cross Creek Ranch",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "sbTOOc-S7nE" },
        { variant: "authentic", youtubeId: "W96cOO6v1LA" },
      ],
      customerPhotos: [
        { src: "/images/migrated/tan-stucco-two-story-home-exterior-fulshear-tx.webp", alt: "Tan stucco two-story home exterior freshly painted in Fulshear, TX by The Proud Paintbrush" },
        { src: "/images/migrated/stucco-stone-limewash-exterior-fulshear-tx.webp", alt: "Limewashed stucco and stone home exterior in Fulshear, TX by The Proud Paintbrush" },
        { src: "/images/migrated/brick-two-story-home-exterior-fulshear-tx.webp", alt: "Brick two-story home exterior repainted in Fulshear, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_FULSHEAR_BEFORE_1.jpg", alt: "Fulshear TX home before exterior repainting" },
          after: { src: "/images/happy-customer-fulshear-tx-door-refinishing.jpg", alt: "Fulshear TX home after exterior repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "If you are in Cross Creek Ranch, Fulbrook, Jordan Ranch, or anywhere else in Fulshear, we can put together a real written estimate within a few days. Call (832) 605-0493 or book a walkthrough online.",
    },
    interior: {
      title: "Interior Painting in Fulshear TX | The Proud Paintbrush",
      description:
        "Professional interior painting in Fulshear, TX. Serving Cross Creek Ranch & surrounding communities. Locally owned, 5-star rated. Free estimates.",
      h1: "Interior Painting in Fulshear, TX",
      hero: {
        src: "/images/cabinet-fulshear.webp",
        alt: "Interior cabinet painting in a Fulshear TX home with freshly painted kitchen cabinets",
      },
      ogImage: "/images/cabinet-fulshear.webp",
      introParagraphs: [
        "Cross Creek Ranch homes in Fulshear are beautifully designed, and the interiors deserve the same level of care as the exteriors. We work with Fulshear homeowners on everything from full interior repaints to accent walls, trim refreshes, and cabinet painting. Newer homes often have builder-grade finishes that show scuffs and wear faster than premium paint — we upgrade that standard and make it last.",
        "Because so much of Fulshear is newer construction, most interior projects here start from builder-grade paint — applied quickly and thinly to hit a build budget, and prone to showing scuffs, marks, and touch-up flashing within a year or two. Upgrading that to a properly prepped, quality finish is the single biggest difference you can make inside a newer Cross Creek Ranch home, and it is the work we do most in Fulshear.",
      ],
      climateSection: {
        heading: "How Fulshear's Climate Affects Interior Paint",
        body: "Fulshear sits in the same humid stretch of west Fort Bend that Cross Creek Ranch's exteriors contend with, and the newer, tightly built homes here hold indoor moisture efficiently. That makes the bathrooms, laundry rooms, and exterior-wall closets the first places thin builder paint fails. We prime those rooms with a moisture-resistant sealer and finish them in a scrubbable satin, and we run a durable low-sheen acrylic through the living spaces so the bright natural light these homes are designed around does not wash out or fade the color. The result holds up to a young, active household far better than the original coat. Fulshear's newest sections are still filling in, which means a lot of homes here are hitting the five-to-eight-year mark where the original builder paint starts looking tired all at once — chalky in the high-traffic halls, scuffed around switch plates, and uneven where the builder's sprayer thinned out. That is the moment a quality repaint pays off most, and it is the bulk of what we are called in for across Cross Creek Ranch.",
      },
      neighborhoodsSection: {
        heading: "Fulshear Areas We Paint Inside",
        intro: "Cross Creek Ranch is our primary Fulshear interior service area, and we work throughout the surrounding Fulshear communities — from full repaints to single accent walls and trim refreshes.",
      },
      homeStylesSection: {
        heading: "Fulshear Interior Surfaces and Finishes",
        body: "Cross Creek Ranch homes are beautifully designed and lean modern: open floor plans, smooth or lightly textured walls, generous trim, and kitchens built around their cabinetry. That makes a few projects especially popular in Fulshear — accent walls that define a space without a full repaint, trim and door refreshes that sharpen a room, and cabinet painting that updates a kitchen without replacing it. We match product to surface throughout: a bonding primer and hard enamel on cabinets, clean enamel on trim and doors, and a low-sheen wall paint that wears far better than the builder's flat. Color consultation is part of the process, so the palette works with your flooring, light, and finishes. Open-concept Fulshear floor plans mean a single color often carries from the entry through the kitchen and great room, so we plan the cut lines and color breaks at natural stopping points — inside corners, beam lines, and door casings — rather than ending a color in the middle of a wall. Two-story family rooms and the tall stair walls in many Cross Creek homes get proper staging so the finish is even top to bottom, not just within ladder reach.",
      },
      whyLocalSection: {
        heading: "Why Fulshear Homeowners Choose The Proud Paintbrush",
        body: "We are a local Fort Bend crew, not a franchise, and we treat a Fulshear interior with the same prep and protection standards we bring to any job. We protect floors and furniture, contain each work area, and clean up daily. The person who walks your home for the estimate is the one running the crew, every project is insured, and we help you pick colors that work with your home rather than handing you a fan deck and walking away. We keep Fulshear projects on a clear schedule — a single room in a day, an accent wall or trim refresh often the same, and a full interior in three to five working days — and we share that timeline in writing before we start. The work zone stays contained so the rest of your home stays livable, and we do a final walk-through together so anything you want touched up gets handled before we call it done.",
      },
      faqs: [
        {
          q: "Do you paint interiors in Cross Creek Ranch?",
          a: "Yes — Cross Creek Ranch is our primary service area in Fulshear for interior painting.",
        },
        {
          q: "My Fulshear home is newer. Is interior painting worth it?",
          a: "Absolutely. Builder-grade paint is applied quickly and thinly. A proper interior repaint with quality products looks dramatically better and holds up far longer.",
        },
        {
          q: "Can you paint accent walls and partial rooms in Fulshear?",
          a: "Yes. We handle everything from single accent walls to full multi-room repaints in Fulshear.",
        },
        {
          q: "Do you offer interior color consultation in Fulshear?",
          a: "Yes. We help Fulshear homeowners select colors that work with their natural light, flooring, and design style.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "4K_j8zfo2zQ",
        customerName: "Featured Fulshear interior customer",
        customerNeighborhood: "Cross Creek Ranch",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "bzbgrgyHxow" },
        { variant: "authentic", youtubeId: "E_GicxQ676A" },
      ],
      customerPhotos: [
        { src: "/images/migrated/fulshear-tx-warm-inviting-living-room-painting.webp", alt: "Warm, inviting living room freshly painted in Fulshear, TX by The Proud Paintbrush" },
        { src: "/images/migrated/game-room-pool-table-fulshear-tx.webp", alt: "Game room with pool table freshly painted in Fulshear, TX by The Proud Paintbrush" },
        { src: "/images/migrated/white-shiplap-fireplace-vaulted-ceiling-fulshear-tx.webp", alt: "White shiplap fireplace with vaulted ceiling painted in Fulshear, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_FULSHEAR_INTERIOR_BEFORE_1.jpg", alt: "Fulshear TX interior before repainting" },
          after: { src: "/images/cabinet-fulshear.webp", alt: "Fulshear TX interior after repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "Fulshear homeowners — upgrade your interior beyond builder grade. Get your free estimate today.",
    },
  },

  // ────────────────────────────────────────────────────────────────
  // WEST HOUSTON
  // ────────────────────────────────────────────────────────────────
  {
    slug: "west-houston",
    name: "West Houston",
    displayName: "West Houston, Texas",
    county: "Harris County",
    zips: ["77024", "77042", "77079", "77077"],
    neighborhoods: ["Memorial", "Energy Corridor", "Westchase", "Briargrove", "Walnut Bend"],
    hero: {
      src: "/images/exterior-west-houston.jpg",
      alt: "Exterior house painting in West Houston TX with mature trees and freshly painted siding",
    },
    ogImage: "/images/exterior-west-houston.jpg",
    aggregateRating: { value: "5.0", count: 124 },
    exterior: {
      title: "Exterior Painting in West Houston TX | Proud Paintbrush",
      description:
        "Exterior painting in West Houston TX serving Memorial, Energy Corridor & Briargrove. Mature-tree mildew, custom homes, premium prep. Call (832) 605-0493.",
      h1: "Exterior Painting in West Houston, Texas",
      introParagraphs: [
        "West Houston is a different market than the Fort Bend suburbs. The housing here is older on average — many homes in Memorial, Briargrove, and Walnut Bend were built between the 1960s and 1990s — and the lots are heavily shaded by mature oaks. That combination changes the exterior painting equation in real ways: more mildew in shaded areas, more wood trim to inspect, fewer master-planned HOA restrictions, and more custom architecture worth treating carefully. The Proud Paintbrush services West Houston ZIPs 77024, 77042, 77079, and 77077 with the same prep-first approach we bring to Sugar Land.",
        "Most West Houston jobs we look at involve some level of carpentry repair before paint. Mature-tree neighborhoods drop debris on roofs and into gutters, which holds moisture against fascia and starts rot at the eaves. We handle the rot repair, the stripping of failing coating, and the repaint as one project with one written scope.",
      ],
      climateSection: {
        heading: "What Makes Painting in West Houston Different",
        body: "Shade and humidity are the two defining factors. Mature-tree neighborhoods like Memorial and Walnut Bend collect mildew on north and east elevations, and that mildew will bleed through any new coating if it is not killed and pressure washed off the surface first. We treat mildew-prone areas with the right cleaning solution before any prep, and on heavily shaded elevations we recommend a mildewcide-fortified topcoat. Most West Houston wood-trim homes also have decades of paint layers that can crack and lift under the new coating if the failing layers are not feathered out — proper sanding and spot priming are the difference between a five-year repaint and a ten-year repaint.",
      },
      neighborhoodsSection: {
        heading: "West Houston Neighborhoods We Paint Most",
        intro: "West Houston covers a large area with very different housing stock from neighborhood to neighborhood. We have worked across the major ones.",
      },
      homeStylesSection: {
        heading: "West Houston Home Styles",
        body: "Memorial and Briargrove hold a lot of mid-century to 1990s custom homes with brick, painted wood trim, and cedar siding accents. Energy Corridor leans newer Hardie-and-brick. Walnut Bend and Westchase mix mid-century ranches with townhomes. Each one needs a different conversation. Most West Houston neighborhoods do not have the strict HOA color-approval processes that Cinco Ranch or Sienna have, which gives custom-home owners more freedom on color.",
      },
      whyLocalSection: {
        heading: "Why West Houston Homeowners Choose The Proud Paintbrush",
        body: "Older custom homes deserve a contractor who knows how to read what an elevation needs — not a franchise running a template. We are locally owned, insured, and every West Houston project carries our written warranty.",
      },
      faqs: [
        {
          q: "Do you handle mildew on shaded north and east elevations?",
          a: "Yes. Mildew treatment and proper cleaning are the first step on any mature-tree-shaded elevation. We use a mildewcide cleaner before pressure washing and recommend a mildewcide-fortified topcoat where the conditions warrant it.",
        },
        {
          q: "Can you do carpentry repair on older Memorial homes?",
          a: "Yes. Rot repair on fascia, soffits, corner boards, and trim is a standard part of older West Houston projects. We write the carpentry scope into the estimate.",
        },
        {
          q: "Do you paint cedar siding?",
          a: "Yes. Cedar siding needs careful prep — sanding back to sound material, spot priming with a stain-blocking exterior primer, and topcoating with a high-build acrylic. We work on cedar regularly on older Memorial-area homes.",
        },
        {
          q: "How long does an exterior paint job last in West Houston?",
          a: "Seven to ten years on brick and Hardie with proper prep, and five to seven years on cedar or older wood trim depending on shade and substrate condition.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "3rIAxmF9ow0",
        customerName: "Featured West Houston customer",
        customerNeighborhood: "Memorial",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "3rIAxmF9ow0" },
        { variant: "authentic", youtubeId: "5rhZR2sQC2g" },
      ],
      customerPhotos: [
        { src: "/images/migrated/tan-stucco-luxury-home-exterior-repaint-west-houston-tx.webp", alt: "Tan stucco luxury home exterior repainted in West Houston, TX by The Proud Paintbrush" },
        { src: "/images/migrated/gray-brick-exterior-repaint-west-houston-tx.webp", alt: "Gray painted brick two-story home exterior in West Houston, TX by The Proud Paintbrush" },
        { src: "/images/migrated/brick-home-backyard-pool-patio-west-houston-tx.webp", alt: "Brick home exterior with backyard pool patio in West Houston, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_WEST_HOUSTON_BEFORE_1.jpg", alt: "West Houston TX home before exterior repainting" },
          after: { src: "/images/exterior-west-houston.jpg", alt: "West Houston TX home after exterior repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "If you are in Memorial, Energy Corridor, Briargrove, or anywhere else in West Houston, we can put together a real written estimate within a few days. Call (832) 605-0493 or book a walkthrough online.",
    },
    interior: {
      title: "Interior Painting in West Houston TX | Proud Paintbrush",
      description:
        "Top-rated interior painting in West Houston, TX. Serving Memorial, Energy Corridor, Briar Forest, Royal Oaks & more. Locally owned. Free estimates.",
      h1: "Interior Painting in West Houston, TX",
      hero: {
        src: "/images/commerical-interior-painting-happy-customer-west-houston.jpg",
        alt: "Interior painting customer in West Houston TX in a freshly painted high-end home",
      },
      ogImage: "/images/commerical-interior-painting-happy-customer-west-houston.jpg",
      introParagraphs: [
        "West Houston homeowners in Memorial, Memorial Villages, Bunker Hill, the Energy Corridor, Briar Forest, Royal Oaks, Westchase, and Spring Branch West expect a high standard of workmanship — and we deliver it. Many West Houston homes feature architectural details, custom millwork, and high-end finishes that require a careful hand and an eye for detail. We have both.",
        "West Houston interiors tend to ask more of a painter than a standard suburban repaint. Custom millwork, paneled studies, coffered and beamed ceilings, two-story entries, and high-end finishes leave no room for shortcuts — the difference between a good crew and a careless one is obvious the moment the light hits a wall. We bring the patience and the hand-cutting these homes require.",
      ],
      climateSection: {
        heading: "How West Houston's Setting Affects Interiors",
        body: "Many West Houston homes in Memorial, Bunker Hill, and Spring Branch West sit under heavy, mature tree cover, which keeps north and east rooms shaded and humid and makes the bathrooms and closets on those sides slower to dry. Combined with standard Gulf Coast humidity, that means moisture-prone rooms need a sealing primer and a wipeable, mildew-resistant finish, not a thin flat coat. Older homes in the area also carry decades of paint layers on their trim and millwork, and those layers have to be sanded and spot-primed so the new enamel lays down smooth instead of telegraphing every old brush mark. We read each surface and prep it for what it actually is. West Houston's older homes also tend to have had multiple owners and multiple repaints, which means layered colors, patched drywall and plaster, and the occasional surprise behind a built-in or under a layer of wallpaper. We budget for that discovery work rather than pretending an older home will behave like a new build, and we flag anything structural — water intrusion, settling cracks that keep returning — before we coat over it. The humidity that mature-tree lots trap also makes proper dry time between coats non-negotiable, so we do not rush a job just to get off site.",
      },
      neighborhoodsSection: {
        heading: "West Houston Neighborhoods We Paint Inside",
        intro: "Memorial, the Memorial Villages, Bunker Hill, the Energy Corridor, Briar Forest, Royal Oaks, Westchase, and Spring Branch West are all active interior service areas for us, from custom estates to high-end townhomes.",
      },
      homeStylesSection: {
        heading: "West Houston Interior Detail and High Ceilings",
        body: "West Houston homes are defined by their detail — architectural millwork, built-in cabinetry, paneled walls, and the kind of trim packages that reward a careful enamel finish and crisp hand-cut lines. They also tend to run tall, with two-story entryways, vaulted ceilings, and open stairwell walls that need the right equipment and a steady approach to reach safely and finish evenly. We are fully equipped for that scale, and we treat the higher-value homes in the area with the level of care and precision they require, from protecting hardwood floors and stair runners to masking custom finishes we are working around. Paneled studies, wainscoting, and coffered or beamed ceilings are common in Memorial and Bunker Hill, and each of those details is slow, hand-cut work that a production crew tends to rush — we price the time it actually takes. On stained millwork that an owner wants painted, we degloss, prime with the right bonding sealer, and finish in a hard enamel so the wood grain does not telegraph and the surface holds up to handling.",
      },
      whyLocalSection: {
        heading: "Why West Houston Homeowners Choose The Proud Paintbrush",
        body: "Homeowners in the area expect a high standard of workmanship, and pre-sale interior painting is one of our most-requested West Houston services because a fresh, well-executed interior measurably moves buyer perception and sale price. We are locally owned and insured; the estimator is the person running the job, the work areas are protected and contained, and the finish is built to read clean from across a great room and up close on the millwork. We treat scheduling in higher-end West Houston homes as part of the service: we coordinate around your routine or your listing date, keep one zone active at a time so the home stays functional, and protect floors, runners, and finished surfaces throughout. Every project is backed by our written warranty, and we do not consider a job complete until you have walked every room with us and signed off on the detail work.",
      },
      faqs: [
        {
          q: "Do you paint interiors in the Memorial area of West Houston?",
          a: "Yes — Memorial and surrounding Memorial Villages are active service areas for interior painting.",
        },
        {
          q: "Can you paint high ceilings and stairwells in West Houston?",
          a: "Yes. We're fully equipped for two-story entryways, vaulted ceilings, and stairwell walls throughout West Houston.",
        },
        {
          q: "Do you handle interior painting for larger or higher-end homes in West Houston?",
          a: "Yes. We regularly work in West Houston's higher-value homes and understand the level of detail and care those properties require.",
        },
        {
          q: "Do you offer interior painting for home sales preparation in West Houston?",
          a: "Yes. Pre-sale interior painting is one of our most requested services in West Houston. A fresh interior significantly impacts buyer perception and sale price.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "tLfUJtXRwss",
        customerName: "Featured West Houston interior customer",
        customerNeighborhood: "Memorial",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "gY1VnnU308o" },
        { variant: "authentic", youtubeId: "jF9-nlPZAYE" },
      ],
      customerPhotos: [
        { src: "/images/migrated/taupe-dining-room-wall-repaint-west-houston-tx.jpg", alt: "Dining room with taupe walls repainted in West Houston, TX by The Proud Paintbrush" },
        { src: "/images/migrated/living-room-brick-fireplace-repaint-west-houston-tx.webp", alt: "Living room with brick fireplace and built-ins painted in West Houston, TX by The Proud Paintbrush" },
        { src: "/images/migrated/upstairs-game-loft-painted-west-houston-tx.webp", alt: "Upstairs game loft freshly painted in a West Houston, TX home by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_WEST_HOUSTON_INTERIOR_BEFORE_1.jpg", alt: "West Houston TX interior before repainting" },
          after: { src: "/images/commerical-interior-painting-happy-customer-west-houston.jpg", alt: "West Houston TX interior after repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "West Houston homeowners — precision interior painting for homes that demand the best. Free estimate today.",
    },
  },

  // ────────────────────────────────────────────────────────────────
  // SOUTHWEST HOUSTON
  // ────────────────────────────────────────────────────────────────
  {
    slug: "southwest-houston",
    name: "Southwest Houston",
    displayName: "Southwest Houston, Texas",
    county: "Harris County",
    zips: ["77036", "77074", "77096", "77035"],
    neighborhoods: ["Sharpstown", "Westbury", "Meyerland", "Maplewood", "Willowbend"],
    hero: {
      src: "/images/exterior-southwest-houston.jpg",
      alt: "Exterior house painting in Southwest Houston TX on a mid-century ranch home with freshly painted brick",
    },
    ogImage: "/images/exterior-southwest-houston.jpg",
    aggregateRating: { value: "5.0", count: 124 },
    exterior: {
      title: "Exterior Painting Southwest Houston TX | Proud Paintbrush",
      description:
        "Exterior painting in Southwest Houston TX serving Sharpstown, Westbury & Meyerland. Mid-century brick, painted trim, post-flood repaints. Call (832) 605-0493.",
      h1: "Exterior Painting in Southwest Houston, Texas",
      introParagraphs: [
        "Southwest Houston is one of the most architecturally distinctive areas in the Houston metro. Sharpstown, Westbury, Meyerland, and Maplewood hold thousands of mid-century ranch and split-level homes from the 1950s, 60s, and 70s, many with painted brick, original wood trim, and the kind of low-slung horizontal lines you do not see in newer suburbs. The Proud Paintbrush works across 77036, 77074, 77096, and 77035, and exterior painting on these mid-century homes is some of our favorite work.",
        "There is also a real share of Southwest Houston exteriors that need a repaint as part of a broader post-flood recovery — Meyerland in particular took serious water during Harvey and prior floods. We work on those projects regularly, and we know how to handle flood-affected substrates, including masonry that has wicked moisture and trim that needs full replacement rather than patching.",
      ],
      climateSection: {
        heading: "What Makes Painting in Southwest Houston Different",
        body: "Mid-century brick is a different surface than modern Hardie siding. Painted brick from the 1960s often has fifty-plus years of coating layers, and those layers can be unstable — the right approach is to identify any failing layers, strip them back to sound material, prime with a masonry-appropriate primer, and topcoat with a breathable acrylic that lets the brick continue to release moisture. The wrong approach is to slap a thick elastomeric over everything, which traps moisture and accelerates failure. On the wood trim that defines so many Southwest Houston elevations, the same careful prep matters — sanding, spot priming, and a high-build topcoat. Houston humidity makes mildew a year-round factor here, so cleaning is the first step on every project.",
      },
      neighborhoodsSection: {
        heading: "Southwest Houston Neighborhoods We Paint Most",
        intro: "Each Southwest Houston neighborhood has its own architectural character. We have worked across the major ones.",
      },
      homeStylesSection: {
        heading: "Southwest Houston Home Styles",
        body: "Sharpstown and Westbury are dominated by 1950s and 60s ranch homes with painted brick and wood trim — many never repainted since the 1990s. Meyerland mixes original mid-century ranches with newer custom builds replacing flood-damaged homes. Maplewood and Willowbend hold a similar mid-century stock. Each elevation has its own paint history, and we read the surface before we quote — what looks like one job from the curb often turns out to be a different job on close inspection.",
      },
      whyLocalSection: {
        heading: "Why Southwest Houston Homeowners Choose The Proud Paintbrush",
        body: "Mid-century homes deserve a contractor who respects the architecture and brings real prep to the project. We are locally owned, insured, and every Southwest Houston job is backed by our written warranty.",
      },
      faqs: [
        {
          q: "Can you repaint mid-century painted brick homes?",
          a: "Yes — and we treat them very specifically. We identify failing layers, strip back to sound material, prime with a masonry-appropriate primer, and topcoat with a breathable acrylic that allows the brick to release moisture rather than trap it.",
        },
        {
          q: "Do you work on flood-affected homes in Meyerland?",
          a: "Yes. We have worked on flood-recovery exteriors and know how to handle wicked masonry, replaced trim, and substrates that need additional dry time before any coating is applied.",
        },
        {
          q: "Should I use elastomeric on my mid-century brick?",
          a: "Usually no. Elastomeric traps moisture in older masonry, which accelerates failure. A high-quality breathable acrylic is almost always the better choice for mid-century painted brick.",
        },
        {
          q: "How long does an exterior repaint last on a Southwest Houston ranch?",
          a: "With proper prep and a breathable acrylic, eight to twelve years on painted brick is realistic. Wood trim usually needs attention again earlier — five to seven years depending on shade and exposure.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "sbTOOc-S7nE",
        customerName: "Featured Southwest Houston customer",
        customerNeighborhood: "Meyerland",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "tLfUJtXRwss" },
        { variant: "authentic", youtubeId: "XHhGMUESFL8" },
      ],
      customerPhotos: [
        { src: "/images/migrated/white-stucco-exterior-two-story-home-southwest-houston-tx.webp", alt: "White stucco two-story home exterior freshly painted in Southwest Houston, TX by The Proud Paintbrush" },
        { src: "/images/migrated/red-brick-house-black-shutters-southwest-houston-tx.webp", alt: "Red brick home with black shutters in Southwest Houston, TX by The Proud Paintbrush" },
        { src: "/images/migrated/tan-two-story-home-exterior-southwest-houston-tx.webp", alt: "Tan two-story home exterior repainted in Southwest Houston, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_SOUTHWEST_HOUSTON_BEFORE_1.jpg", alt: "Southwest Houston TX home before exterior repainting" },
          after: { src: "/images/exterior-southwest-houston.jpg", alt: "Southwest Houston TX home after exterior repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "If you are in Sharpstown, Westbury, Meyerland, Maplewood, or anywhere else in Southwest Houston, we can put together a real written estimate within a few days. Call (832) 605-0493 or book a walkthrough online.",
    },
    interior: {
      title: "Interior Painting Southwest Houston TX | Proud Paintbrush",
      description:
        "Professional interior painting in Southwest Houston. Serving West University, Meyerland, Westbury, Braeswood & more. Locally owned. Free estimates.",
      h1: "Interior Painting in Southwest Houston, TX",
      hero: {
        src: "/images/interior-crown-molding.jpg",
        alt: "Interior painting of crown molding and woodwork in a Southwest Houston TX character home",
      },
      ogImage: "/images/interior-crown-molding.jpg",
      introParagraphs: [
        "Southwest Houston's established neighborhoods — West University, Meyerland, Westbury, and the Braeswood pockets — are full of homes with character, history, and unique interior details. Older homes in this area often have plaster walls, original woodwork, and architectural details that require a careful, experienced hand. We respect what makes these homes special and bring the craftsmanship they deserve.",
        "Painting inside an older Southwest Houston home is a different craft than rolling out a new-build interior. Plaster instead of drywall, original woodwork instead of finger-jointed trim, and decades of previous paint mean the prep is where the job is won or lost. We slow down, read each surface, and bring the techniques these character homes actually need rather than a one-size new-construction routine.",
      ],
      climateSection: {
        heading: "How Age and Climate Affect Southwest Houston Interiors",
        body: "The mid-century homes of Westbury, Meyerland, and the Braeswood pockets combine Houston's year-round humidity with older, sometimes settling walls, which is a recipe for hairline cracks, nail pops, and moisture staining if a previous repaint skipped the prep. Plaster in particular behaves differently than drywall — it can be chalky, previously oil-painted, or patched in ways that need the right bonding primer before a waterborne topcoat will hold. We assess the surface condition first, use the appropriate primers for plaster and for any glossy old trim, and finish moisture-prone rooms in a wipeable, mildew-resistant coat so the work lasts in homes that have already stood for fifty or sixty years. Many of these homes have also been through at least one flood event or major storm over the decades, and old water staining on ceilings and lower walls will bleed straight through a fresh coat if it is not sealed with a stain-blocking primer first. We check for that before we paint rather than after it shows up. The older mechanical systems in some Westbury and Meyerland homes also run more humid in summer, so the moisture-prone rooms get the same wipeable, mildew-resistant treatment we would give a bathroom.",
      },
      neighborhoodsSection: {
        heading: "Southwest Houston Neighborhoods We Paint Inside",
        intro: "West University, Meyerland, Westbury, and the Braeswood area are part of our active Southwest Houston interior service area, where most homes carry real history and real interior character.",
      },
      homeStylesSection: {
        heading: "Southwest Houston Plaster, Woodwork, and Built-Ins",
        body: "These neighborhoods are full of original detail — plaster walls, solid-wood interior doors, picture-rail and crown moldings, and built-in shelving and cabinetry that are some of our favorite projects to bring back to life. Plaster needs different prep than drywall: cracks raked and filled, chalky areas sealed, and a bonding primer where old oil coatings are still in place. Original woodwork and built-ins reward a careful enamel and a patient hand far more than a fast spray pass. We respect what makes these homes special and finish them in a way that honors the architecture rather than flattening it. Plaster repair is its own skill: we re-key loose sections where we can, fill and feather cracks so they do not telegraph, and avoid the heavy skim-and-spray shortcut that erases the hand-troweled texture these homes are known for. On original doors and hardware-heavy trim, we take the time to mask or remove fixtures rather than painting around them, because a crisp edge on a sixty-year-old casing is what separates a careful job from a sloppy one.",
      },
      whyLocalSection: {
        heading: "Why Southwest Houston Homeowners Choose The Proud Paintbrush",
        body: "Character homes deserve a contractor who treats them like more than a square-footage number. We work room by room in occupied homes, seal off the active area, protect floors and furniture, and clean up daily so you can keep living in the house through the project. We are locally owned and insured, the estimator is the person running the crew, and the prep we bring is built for the plaster, woodwork, and history these Southwest Houston homes carry. We also keep older, occupied homes livable through the work: one zone active at a time, daily cleanup, and dust containment that matters more in a home with plaster and decades of settled material than in a sealed new build. Scheduling is honest — a single room in a day, larger plaster-and-woodwork projects longer because the prep is real — and we share that timeline in writing up front. Every project carries our written warranty.",
      },
      faqs: [
        {
          q: "Do you paint interiors in Meyerland and Westbury?",
          a: "Yes — Meyerland, Westbury, and the Braeswood area are part of our active interior painting service area.",
        },
        {
          q: "Can you paint plaster walls in older Southwest Houston homes?",
          a: "Yes. Plaster walls require different prep than drywall. We assess the surface condition and use the appropriate primers and techniques for a smooth, lasting finish.",
        },
        {
          q: "Do you paint interior woodwork and built-ins in Southwest Houston?",
          a: "Yes. Original woodwork, built-in shelving, and architectural details are some of our favorite interior projects in Southwest Houston.",
        },
        {
          q: "How do you handle interior painting in occupied Southwest Houston homes?",
          a: "We work room by room, seal off work areas, protect flooring and furniture, and clean up daily so you can continue living in your home throughout the project.",
        },
      ],
      featuredVideo: {
        variant: "featured",
        youtubeId: "zT_z3yxJcL0",
        customerName: "Featured Southwest Houston interior customer",
        customerNeighborhood: "Meyerland",
      },
      authenticVideos: [
        { variant: "authentic", youtubeId: "6P4_4GHaYP8" },
        { variant: "authentic", youtubeId: "a20JwINRrNc" },
      ],
      customerPhotos: [
        { src: "/images/migrated/open-concept-living-dining-room-southwest-houston-tx.webp", alt: "Open-concept living and dining room freshly painted in Southwest Houston, TX by The Proud Paintbrush" },
        { src: "/images/migrated/curved-staircase-foyer-repaint-southwest-houston-tx.webp", alt: "Curved staircase foyer repainted in a Southwest Houston, TX home by The Proud Paintbrush" },
        { src: "/images/migrated/gray-living-room-repaint-southwest-houston-tx.webp", alt: "Living room with gray accent walls repainted in Southwest Houston, TX by The Proud Paintbrush" },
      ],
      beforeAfterPhotos: [
        {
          before: { src: "/images/TODO_SOUTHWEST_HOUSTON_INTERIOR_BEFORE_1.jpg", alt: "Southwest Houston TX interior before repainting" },
          after: { src: "/images/interior-crown-molding.jpg", alt: "Southwest Houston TX interior after repainting by The Proud Paintbrush" },
        },
      ],
      closingCta:
        "Southwest Houston's character homes deserve interior painting done right. Get your free estimate today.",
    },
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}
