// Builds content/reviews.json from real, attributable Google reviews.
// Only genuine customer reviews belong here (Google policy + truthfulness).
// Run: node migration/build-reviews.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "content", "reviews.json");

// service tag (when clearly identifiable) powers per-hub review snippets.
const reviews = [
  {
    author: "Travis Phillips",
    rating: 5,
    text: `The Proud Paintbrush did an incredible job on our home, and I can't recommend them enough. From the very beginning, Chris Petkau (the owner) was professional, honest, and easy to work with. The paint crew, led by a different Chris and his assistant Alex, were nothing short of amazing. They were incredibly hospitable to me and my family — always respectful, kind, and patient. No question ever felt like a burden, and they took the time to walk us through every step of the process. We couldn't be happier with the results, and we'll definitely be calling them again for future projects.`,
  },
  {
    author: "Derrick McCain",
    rating: 5,
    service: "exterior",
    text: `Our family had decided to undertake a large project, painting the exterior of our home and lime washing the stone. After an extensive search for the right contractor to help bring our vision to life we were lucky enough to have found Chris and his company Proud Paintbrush. Chris and his team executed flawlessly with meticulous attention to detail, keeping us informed throughout the process through to completion. Our family could not be happier with the result, and if you are considering a contractor for similar work you will not be disappointed. Thanks again to Chris and his team, excellent work.`,
  },
  {
    author: "Megan Scott",
    rating: 5,
    service: "exterior",
    text: `Chris and his team did a great job on our exterior. They replaced some wood rot, offered a suggestion for a gutter supplier, and did a thorough, clean job. Fast, efficient, and affordable.`,
  },
  {
    author: "Catherine Harter",
    rating: 5,
    service: "cabinet",
    text: `Chris was an excellent communicator, letting us know timelines, arrival times, and changes as needed. Drenching the entire kitchen including the cabinets was completed in a little over a week. Kitchen looks bright and modern.`,
  },
  {
    author: "Joey D'Eramo",
    rating: 5,
    service: "exterior",
    text: `We are so pleased with the job they did for our home exterior! It had become very off-color and dirty over the years. These guys not only made it beautiful again, but they power washed and repaired parts of our siding as well. They took care of the details beyond just the painting. All of it for a very reasonable price. They did an A+ job and I would use them again in a heart beat.`,
  },
  {
    author: "Brooke Lebowitz",
    rating: 5,
    text: `We couldn't be happier with the incredible job The Proud Paintbrush did on our home! From start to finish, Leo, Chris, and Alex were professional, efficient, and a pleasure to work with. Their attention to detail and commitment to quality really show in the final result—our house looks absolutely fantastic. The entire crew was friendly, respectful, and provided outstanding customer service throughout the process. We highly recommend The Proud Paintbrush to anyone looking for top-notch painting work. Thank you again for making our home look amazing!`,
  },
  {
    author: "Kyle Phillips",
    rating: 5,
    service: "exterior",
    text: `Highly recommend The Proud Paintbrush after they did a great job applying the lime wash to our brick home. From the start, Chris provided prompt, professional and informative communications, as he showed up the next day to personally review the job and gave an estimate total price that beat almost every other vendor. Chris personally showed up with his crew on the day of the job, his crew was able to take care of a last minute paint job request and he continuously checked to make sure we were happy with the work, including the final walk through before his crew departed. The entire process was very easy, professional and worry free. We are very happy with the lime wash job that The Proud Paintbrush provided and will likely call them again.`,
  },
  {
    author: "Jeff Deurlein",
    rating: 5,
    service: "interior",
    text: `The Proud Paintbrush reconstructed my interior walls which involved adding drywall, baseboard, crown molding, installing plantation shutters and painting. Leo and crew did an awesome job. Very respectful and to perfection!!!!`,
  },
  {
    author: "Indy Chen",
    rating: 5,
    text: `Chris and his team at The Proud Paintbrush did an excellent job. They were professional, on time, and handled everything with care and attention to detail. The work came out clean and smooth, and they made sure the area was tidy before they left each day. You can tell they take pride in what they do. Would definitely recommend.`,
  },
  {
    author: "Satrice Morris",
    rating: 5,
    service: "exterior",
    text: `I had a fantastic experience with The Proud Paintbrush! They painted the exterior of my home and repaired some siding, and I couldn't be happier with the results. From the start, Chris (the owner) was incredibly communicative. He was always available via text and even offered the help of an interior designer to assist with choosing paint colors. The price was fair, and the crew—Chris (the painter), Leo, and Alex—were professional and punctual. They showed up on time each day, ready to work, and kept me updated daily. I especially appreciated that they had me approve a sample of the paint on the house before continuing—great attention to detail! On the final day, Chris (the painter) did a walkthrough with me to address any concerns, followed by a final inspection with Chris (the owner). To my surprise, Chris even brought me a delicious treat as a thank-you gift. I'm very pleased with the work and the overall experience. I would highly recommend The Proud Paintbrush to anyone looking for quality craftsmanship and excellent customer service.`,
  },
  {
    author: "Morgan Fritchie",
    rating: 5,
    service: "interior",
    text: `Chris and his team were awesome with helping us to repair our ceilings after a small leak in a bedroom. Every step they did on time and made the repairs look seamless from the removal, drywall install, texture and paint! Thank you proud paintbrush team!!`,
  },
  {
    author: "Mary C",
    rating: 5,
    text: `This company was a pleasure to communicate with. Chris was not only professional but also extremely detailed, customer focused, and generous with his time and advice during the consultation and estimate. They gave me an immediate appointment with their color consultant who came to my home and offered her palette recommendations for my needs.`,
  },
  {
    author: "Joshua D Randall",
    rating: 5,
    service: "exterior",
    text: `GC here. Chris with The Proud Paintbrush handled it all. Interior and exterior painting, prep, cleanup, and punch-list work. He showed up on time, communicated clearly, and delivered clean, professional results. Reliable, efficient, and easy to work with. I'd bring him onto future residential or commercial projects without hesitation.`,
  },
  {
    author: "Hassan Thomas",
    rating: 5,
    service: "exterior",
    text: `Proud Paintbrush did a amazing job on both my wood fence (staining) and my rod iron fence (painting). Chris the painter and Alex did an amazing job. Very professional staff. I would highly recommend this team of professionals to work on any of my friends and families homes.`,
  },
  {
    author: "Dr Jamie Russell Sr D Min",
    rating: 5,
    service: "exterior",
    text: `What can I say? The Proud Paintbrush did a great job with painting our church's exterior, as well as some interior work. Chris and Leo were very professional and did everything necessary to ensure that we were satisfied customers. I highly recommend them!`,
  },
  {
    author: "Jason Ceyanes",
    rating: 5,
    service: "exterior",
    text: `The Proud Paintbrush did an outstanding job refinishing our badly sun damaged front door. It looks brand new! They were very efficient and timely. They even arranged a time where they could complete the work while my wife and I were traveling so I could surprise her when we returned home. Their professionalism throughout the process from the initial quote through the finished project was amazing. I highly recommend using The Proud Paintbrush for any of your painting needs. They will definitely be coming back soon to help with some of our indoor painting projects as well!`,
  },
  {
    author: "Joe B",
    rating: 5,
    text: `We've had the opportunity to work with The Proud PaintBrush on several of our remodeling projects, and their work consistently exceeds expectations. Their attention to detail is unmatched—whether it's prepping surfaces, cutting in edges, or achieving a smooth, even finish, their team delivers top-quality results every time. Just as important is their integrity. They show up when they say they will, communicate clearly, and always follow through on their commitments. It's rare to find contractors who take such pride in their work and operate with this level of professionalism. The Proud Paint Brush has become a trusted partner on our jobs in Fort Bend and surrounding areas, and we look forward to continuing our collaboration. We confidently recommend them to anyone looking for a reliable, skilled painting contractor.`,
  },
  {
    author: "Steve H",
    rating: 5,
    text: `Chris the owner was prompt with initial meeting at the specified time, corresponded throughout, offered the name of another vendor to address a non painting issue, and made sure the work scope clearly reflected what I wanted done. Pricing was competitive. Chris the lead painter made sure the work scope was completed as submitted and on time. Definitely recommend contacting The Proud Paintbrush when considering your next painting project.`,
  },
  {
    author: "Lisa",
    rating: 5,
    text: `Chris and his crew organized his very first Paint It Forward to a wonderful elderly lady in the neighborhood. Chris was very professional and articulate in explaining the process to Mrs J. Of course, she had a hard time grasping the concept of Paint It Forward, like Paying it Forward. He was so kind, patient and sincere. It was such a true blessing. Chris had teamed up with Sherwin Williams and they were amazingly precise in matching the existing paint colors. WOW. They did such an incredible job. Several rotted boards and a few minor repairs were also completed. He beautifully stained all the wood. The entire team was absolutely wonderful. I'd recommend Chris and The Proud Paintbrush for all your painting needs. Thank you All for your time and caring for my grateful neighbor Mrs J`,
  },
  {
    author: "Gayle Conner",
    rating: 5,
    service: "exterior",
    text: `I had the Good Fortune to be referred to The Proud Paintbrush, for both exterior & interior residential painting, including outdoor structure & indoor sheetrock repair. As a Senior citizen, I was nervous @ the start of the project, having been taken advantage of in the past on house related repairs. This experience proved the company to be very honest, reputable, & professionally owned. It was The Best experience I've EVER had with workers coming into my home‼️ Chris P. (Owner), stepped up & took charge of the entire project, relieving my anxiety❗ Initially, he looked @ everything that required painting, pointing out what needed his expertise, to improve or enhance the look of the house. He has a Well-Trained Eye, & pulled together the perfect paint colors, giving the house an updated look. The color wheel he suggested also complimented the brick color, & made it "pop"❗ I am more than pleased w/ the outcome🙂 He found a place under one of the eves, on his initial inspection, that could allow an outdoor varment to slip through, into the attic. It was repaired & closed off. A Lot of caulking was required & done w/ utmost accuracy. Chris's crew, Leo, Chris (#2), & Eddie, always showed up early, getting their tools unloaded & making their plan for the day. At appt time they were knocking on the door, ready to work. I have Never worked with any technicians that Consistently showed this type of punctuality❗....Total respect for you, the customer. Plus, they actually Clean the areas worked, & at the end of the day, gather up & dispose of any trash. They wrapped up the exterior paint job in 2.5 days, (the Entire exterior), which included powerwashing the whole house❗ Then they immediately started on the interior job, same day. They waste no time. I have been, & still am, impressed with their attention to detail. They make sure to get the work done right with the first stroke of the paintbrush❗ Make no mistake, I've gone thru 3 general contractors in the last 2 months, so finding this company is a Godsend🙏 I am also impressed with how well the crew works together as a team. They are respectful & helpful toward each other which is a pleasure to see & hear. It overflowed to the respect shown me. My job will be completed in 2 more days, possibly less, but I couldn't wait to give Chris & the 3 man crew a FIVE STAR review‼️ That is another feature of Chris & his company. He told me during the initial walk-through, that this job would take a full week to complete. He's kept his word, & kept the job moving forward & the crew on point, communicating w/ me Every step of the way. This company goes Above & Beyond any expectation a consumer could have. If you have any painting needs, I highly recommend this company‼️ I'll be referring The Proud Paintbrush to neighbors & friends, & inviting them back for future projects👍 Thank you Immensely for All the effort put into my home❣🤗❤ It is an Honor & Privilege to partner with you💖`,
  },
];

fs.writeFileSync(OUT, JSON.stringify(reviews, null, 2) + "\n", "utf8");
console.log(`Wrote ${reviews.length} reviews to content/reviews.json`);
console.log("  exterior-tagged:", reviews.filter((r) => r.service === "exterior").length);
console.log("  first two exterior:", reviews.filter((r) => r.service === "exterior").slice(0, 2).map((r) => r.author).join(", "));
