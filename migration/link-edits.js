/*
 * Per-slug contextual internal-link edits for under-linked blog posts.
 * Each edit wraps an EXISTING phrase in the prose with a link to a real route.
 * `find` must occur exactly once (default) in the content; `anchorIn` (optional)
 * restricts the wrapped text to a substring of `find`. The runner skips any
 * target already present in the post and never touches the author byline.
 *
 * Valid routes only:
 *  /interior-painting /exterior-painting /cabinet-painting
 *  /interior-painting/drywall-repair /interior-painting/kitchen-painting
 *  /exterior-painting/fence-staining /exterior-painting/pressure-washing /exterior-painting/stucco-painting
 *  /pricing /budget /warranty /preparation-process /color-consultation /contact
 */
module.exports = {
  // --- pricing / cost topics ---
  "how-much-should-you-really-pay-for-bedroom-painting": [
    { find: "painting the walls, ceiling, and trim", anchorIn: "painting the walls", href: "/interior-painting" },
    { find: "patching holes, sanding surfaces, and priming", anchorIn: "patching holes, sanding surfaces, and priming", href: "/preparation-process" },
    { find: "to achieve the desired look within your budget", anchorIn: "within your budget", href: "/budget" },
    { find: "right professionals will ensure", anchorIn: "right professionals", href: "/pricing" },
  ],
  "the-truth-about-interior-painting-prices": [
    { find: "the factors that influence interior painting prices in Sugar Land", anchorIn: "interior painting prices", href: "/pricing" },
    { find: "Proper surface preparation is crucial", anchorIn: "surface preparation", href: "/preparation-process" },
    { find: "tailored to your budget and preferences", anchorIn: "your budget", href: "/budget" },
  ],
  "the-ultimate-guide-to-price-painting-your-home": [
    { find: "how much your home costs to paint", href: "/pricing" },
    { find: "the extra time to pressure wash", anchorIn: "pressure wash", href: "/exterior-painting/pressure-washing" },
    { find: "how the homeowner can afford it than", anchorIn: "afford it", href: "/budget" },
    { find: "well paid professionals at a price that ensures the job is done properly", anchorIn: "the job is done properly", href: "/warranty" },
  ],

  // --- prep / "what to expect" / failure topics ---
  "warning-not-all-quotes-are-created-equal": [
    { find: "such as surface preparation, priming, number of coats", anchorIn: "surface preparation", href: "/preparation-process" },
    { find: "investing in higher-quality materials upfront can save you money in the long run", anchorIn: "save you money in the long run", href: "/budget" },
    { find: "stand behind their work with a comprehensive warranty", anchorIn: "warranty", href: "/warranty" },
    { find: "services such as color consultation", anchorIn: "color consultation", href: "/color-consultation" },
  ],
  "this-is-why-your-paint-failed": [
    { find: "works fine for drywall but not for metal", anchorIn: "drywall", href: "/interior-painting/drywall-repair" },
    { find: "ensure adhesion, consistent color, proper finish and long lasting durability", anchorIn: "long lasting durability", href: "/warranty" },
    { find: "your house is painted properly in an affordable way", anchorIn: "in an affordable way", href: "/budget" },
  ],
  "this-is-why-your-paint-is-fading": [
    { find: "UV-resistant paint for exterior painting projects", anchorIn: "exterior painting", href: "/exterior-painting" },
    { find: "using professional techniques and thorough preparation", anchorIn: "thorough preparation", href: "/preparation-process" },
    { find: "investing in top-grade paints to ensure long-lasting results", anchorIn: "long-lasting results", href: "/warranty" },
  ],
  "what-questions-should-i-be-asking-my-painting-contractor": [
    { find: "Inquire about the contractor’s approach to surface preparation", anchorIn: "surface preparation", href: "/preparation-process" },
    { find: "should offer a warranty on their work", anchorIn: "warranty", href: "/warranty" },
    { find: "Invest in professional painting services", anchorIn: "professional painting services", href: "/interior-painting" },
    { find: "asking the right questions and ensuring they meet your expectations", anchorIn: "asking the right questions", href: "/contact" },
  ],
  "what-is-a-normal-time-frame-for-interior-painting-projects": [
    { find: "to repaint the interior of your home", anchorIn: "interior of your home", href: "/interior-painting" },
    { find: "due to the need for extra preparation", anchorIn: "extra preparation", href: "/preparation-process" },
    { find: "if you need to buy additional equipment", anchorIn: "buy additional equipment", href: "/budget" },
  ],
  "this-is-why-you-cant-trust-your-painting-contractor": [
    { find: "the proper products and application process", anchorIn: "application process", href: "/preparation-process" },
    { find: "confidence that the contractor understands your vision and will stick to his commitments", anchorIn: "stick to his commitments", href: "/warranty" },
    { find: "we hope that from the first interaction", anchorIn: "the first interaction", href: "/contact" },
  ],

  "colors-to-paint-your-house-for-2023": [
    { find: "narrow down a color scheme for your paint project", anchorIn: "a color scheme", href: "/color-consultation" },
    { find: "while cooler tones for north-facing homes is what looks best when your finished painting", anchorIn: "north-facing homes", href: "/exterior-painting" },
    { find: "Experienced painters know the homes interior needs different sheens", anchorIn: "the homes interior", href: "/interior-painting" },
  ],
  "painting-companies-with-over-20-video-testimonials-in-sugar-land-amp-greater-houston": [
    { find: "consistent quality, transparency, and trust", anchorIn: "consistent quality", href: "/warranty" },
    { find: "real projects and hear homeowner feedback firsthand", anchorIn: "real projects", href: "/interior-painting" },
    { find: "schedule your <strong>free estimate</strong> at /contact", anchorIn: "free estimate", href: "/contact" },
  ],

  // --- color / undertone / sheen topics ---
  "the-power-of-strategic-color-in-each-room": [
    { find: "it's a nuanced science that can significantly impact your daily life", anchorIn: "a nuanced science", href: "/color-consultation" },
    { find: "make informed choices that extend beyond personal taste", anchorIn: "informed choices", href: "/interior-painting" },
    { find: "Crisp whites and light blues enhance the perception of cleanliness", anchorIn: "Crisp whites and light blues", href: "/interior-painting/kitchen-painting" },
  ],
  "should-you-paint-your-ceiling-the-same-color-as-the-walls": [
    { find: "choosing the right paint colors can make a world of difference", anchorIn: "the right paint colors", href: "/color-consultation" },
    { find: "consider consulting with a professional painter to achieve the perfect look", anchorIn: "a professional painter", href: "/interior-painting" },
    { find: "consider scheduling your exterior painting during the spring or fall seasons", anchorIn: "exterior painting", href: "/exterior-painting" },
  ],
  "the-secret-to-a-cohesive-beautiful-home-a-pro-color-consult": [
    { find: "Choosing the perfect paint color is more than picking a swatch", anchorIn: "Choosing the perfect paint color", href: "/color-consultation" },
    { find: "Coordinate <strong>walls, ceilings, trim, cabinets</strong>", anchorIn: "walls, ceilings, trim", href: "/interior-painting" },
    { find: "Let us help you <a href=\"https://theproudpaintbrush.youcanbook.me/\">create a home", anchorIn: "Let us help you", href: "/contact" },
  ],

  // --- cabinet topics ---
  "say-goodbye-to-grains-aqua-coats-jaw-dropping-transformation-of-cabinets": [
    { find: "the expertise of professional cabinet painters", anchorIn: "professional cabinet painters", href: "/cabinet-painting" },
    { find: "meticulous sanding to create a smooth surface, and thorough cleaning", anchorIn: "thorough cleaning", href: "/preparation-process" },
    { find: "From cabinet restoration services to affordable refinishing solutions", anchorIn: "affordable refinishing solutions", href: "/pricing" },
  ],
  "painting-your-cabinets-the-step-by-step-guide": [
    { find: "the process of painting your cabinets", anchorIn: "painting your cabinets", href: "/cabinet-painting" },
    { find: "Before finding the right paint, right prep is key!", anchorIn: "right prep is key", href: "/preparation-process" },
    { find: "for a reasonable price your house looks great", anchorIn: "for a reasonable price", href: "/pricing" },
  ],
  "whats-the-best-paint-brand-for-cabinets": [
    { find: "we specialize in cabinet finishes that are built to last", anchorIn: "cabinet finishes that are built to last", href: "/cabinet-painting" },
    { find: "Even the best paint fails without proper prep and application", anchorIn: "proper prep and application", href: "/preparation-process" },
    { find: "the longest-lasting investment", anchorIn: "investment", href: "/warranty" },
  ],
  "6-secret-ingredients-you-can-add-to-your-paint": [
    { find: "save you money from having to get your house pressure washed as often", anchorIn: "pressure washed", href: "/exterior-painting/pressure-washing" },
    { find: "a must have for your exterior paint job", anchorIn: "exterior paint job", href: "/exterior-painting" },
    { find: "Add a glitter additive", anchorIn: "glitter additive", href: "/interior-painting" },
  ],

  // --- exterior / stucco / fence topics ---
  "exterior-painting-its-all-about-prep": [
    { find: "Have your painting company power wash all dirt", anchorIn: "power wash", href: "/exterior-painting/pressure-washing" },
    { find: "Almost all exterior painting services involve some kind of airless paint spraying", anchorIn: "exterior painting services", href: "/exterior-painting" },
    { find: "Cracks in stucco and brick require a specific type of masonry caulking", anchorIn: "stucco", href: "/exterior-painting/stucco-painting" },
    { find: "receive a free estimate with competitive pricing", anchorIn: "free estimate", href: "/contact" },
  ],
  "stop-before-you-paint-your-exterior-read-this": [
    { find: "Use a pressure washer or hose with a strong nozzle attachment", anchorIn: "pressure washer", href: "/exterior-painting/pressure-washing" },
    { find: "Painting the exterior of your house can transform its appearance", anchorIn: "the exterior of your house", href: "/exterior-painting" },
    { find: "formulated for your type of siding (wood, vinyl, stucco, etc.)", anchorIn: "stucco", href: "/exterior-painting/stucco-painting" },
    { find: "Contact The Proud Paintbrush for expert painting services and a free estimate", anchorIn: "Contact The Proud Paintbrush", href: "/contact" },
  ],
  "how-to-hurricane-proof-your-exterior": [
    { find: "we recommend acrylic exterior paints to protect your home’s exterior", anchorIn: "acrylic exterior paints", href: "/exterior-painting" },
    { find: "as well as provides a warranty on the work", anchorIn: "warranty", href: "/warranty" },
    { find: "Seal gaps and cracks", anchorIn: "Seal gaps and cracks", href: "/preparation-process" },
  ],
  "oh-no-rust-what-to-do-before-you-paint-over-rust": [
    { find: "When it comes to exterior painting, whether it's furniture, walls, or metal objects", anchorIn: "exterior painting", href: "/exterior-painting" },
    { find: "as recommended by professional exterior painters", anchorIn: "professional exterior painters", href: "/preparation-process" },
    { find: "the key to a successful paint job lies in the preparation", anchorIn: "a successful paint job", href: "/warranty" },
  ],
  "paint-my-fence": [
    { find: "Staining is the way to go!", anchorIn: "Staining", href: "/exterior-painting/fence-staining" },
    { find: "make sure to pressure wash the fence with a mild detergent", anchorIn: "pressure wash", href: "/exterior-painting/pressure-washing" },
    { find: "our team of experienced experts is here to help", anchorIn: "our team of experienced experts", href: "/contact" },
  ],
  "prepitright": [
    { find: "each type requires specific steps before painting", anchorIn: "specific steps before painting", href: "/preparation-process" },
    { find: "the unique requirements for painting stucco and brick", anchorIn: "stucco", href: "/exterior-painting/stucco-painting" },
    { find: "choose high-quality paints and primers specifically formulated for exterior surfaces", anchorIn: "exterior surfaces", href: "/exterior-painting" },
  ],
  "when-is-the-best-time-to-paint-my-exterior": [
    { find: "are ideal for exterior painting", anchorIn: "exterior painting", href: "/exterior-painting" },
    { find: "maximizes the chances of achieving a durable, aesthetically pleasing finish", anchorIn: "a durable, aesthetically pleasing finish", href: "/warranty" },
    { find: "By capitalizing on moderate temperatures, low humidity levels", anchorIn: "moderate temperatures", href: "/preparation-process" },
  ],
  "when-is-the-best-time-to-paint-my-interior": [
    { find: "enhancing your Sugar Land home's interior with a fresh coat of paint", anchorIn: "your Sugar Land home's interior", href: "/interior-painting" },
    { find: "achieving a beautiful and durable paint finish", anchorIn: "durable paint finish", href: "/warranty" },
    { find: "Proper ventilation and dehumidifiers can ensure that paint dries evenly", anchorIn: "Proper ventilation", href: "/preparation-process" },
  ],

  // --- interior / general topics ---
  "honoring-homes-painting-with-respect": [
    { find: "Undertaking an interior house painting project", anchorIn: "interior house painting", href: "/interior-painting" },
    { find: "with meticulous attention to detail", anchorIn: "meticulous attention to detail", href: "/preparation-process" },
    { find: "experience the difference of professional residential painting services", anchorIn: "professional residential painting services", href: "/contact" },
  ],
  "how-often-should-i-pay-my-interior": [
    { find: "it differs significantly from exterior paint", anchorIn: "exterior paint", href: "/exterior-painting" },
    { find: "the unique demands of interior painting in Sugar Land", anchorIn: "interior painting", href: "/interior-painting" },
    { find: "consider hiring professional painters like The Proud Paintbrush", anchorIn: "professional painters", href: "/warranty" },
  ],
  "painting-vs-flooring-which-should-come-first-in-your-renovation": [
    { find: "whether to tackle interior painting before or after redoing your floors", anchorIn: "interior painting", href: "/interior-painting" },
    { find: "they might be able to complete the job quicker and more cost-effectively", anchorIn: "more cost-effectively", href: "/budget" },
    { find: "coordination with professional interior painting services", anchorIn: "professional interior painting services", href: "/contact" },
  ],
  "painting-and-health-understanding-low-voc-and-zero-voc-paints": [
    { find: "the use of low VOC and zero VOC paints contributes to a healthier indoor environment", anchorIn: "a healthier indoor environment", href: "/interior-painting" },
    { find: "Whether it's interior or exterior painting", anchorIn: "exterior painting", href: "/exterior-painting" },
    { find: "choose a painting company that shares your values", anchorIn: "choose a painting company", href: "/contact" },
  ],
  "should-i-buy-the-paint-myself": [
    { find: "for the interior or exterior house painting project", anchorIn: "interior", href: "/interior-painting" },
    { find: "search for deals and discounts from various paint manufacturers", anchorIn: "deals and discounts", href: "/budget" },
    { find: "ultimately making your house painting project more efficient and hassle-free", anchorIn: "your house painting project", href: "/contact" },
  ],
  "what-your-walls-say-about-you": [
    { find: "We specialize in interior painting, exterior", anchorIn: "interior painting", href: "/interior-painting" },
    { find: "exterior painting, and cabinet painting in Fort Bend", anchorIn: "exterior painting", href: "/exterior-painting" },
    { find: "and cabinet painting in Fort Bend County", anchorIn: "cabinet painting", href: "/cabinet-painting" },
    { find: "let’s create something beautiful together", anchorIn: "create something beautiful together", href: "/contact" },
  ],
  "we-love-serving-fort-bend": [
    { find: "Interior and exterior painting in Fort Bend", anchorIn: "Interior", href: "/interior-painting" },
    { find: "and exterior painting in Fort Bend County", anchorIn: "exterior painting", href: "/exterior-painting" },
    { find: "Kitchen cabinet painting in Missouri City and Sugar Land", anchorIn: "Kitchen cabinet painting", href: "/cabinet-painting" },
    { find: "Click here to schedule your free estimate", anchorIn: "Click here to schedule your free estimate", href: "/contact" },
  ],
  "the-heartfelt-story-behind-the-proud-paintbrush": [
    { find: "from interior painting and exterior", anchorIn: "interior painting", href: "/interior-painting" },
    { find: "and exterior painting to drywall", anchorIn: "exterior painting", href: "/exterior-painting" },
    { find: "to drywall repair, cabinet painting", anchorIn: "drywall repair", href: "/interior-painting/drywall-repair" },
    { find: "Kitchen cabinet painting", href: "/cabinet-painting" },
  ],
  "our-big-bold-vision-for-a-more-beautiful-fort-bend-county": [
    { find: "top-tier interior painting, exterior", anchorIn: "interior painting", href: "/interior-painting" },
    { find: ", exterior painting, trim work", anchorIn: "exterior painting", href: "/exterior-painting" },
    { find: "trim work, cabinet painting, and more", anchorIn: "cabinet painting", href: "/cabinet-painting" },
    { find: "Offering detailed color consultations tailored to your style", anchorIn: "color consultations", href: "/color-consultation" },
  ],
  "the-one-paint-brand-that-never-lets-me-down": [
    { find: "ensuring long-lasting results, I’ve found that Sherwin-Williams", anchorIn: "long-lasting results", href: "/warranty" },
    { find: "the best paint for interior walls", anchorIn: "interior walls", href: "/interior-painting" },
    { find: "<strong>Cabinets:</strong> Gallery or Emerald Urethane", anchorIn: "Cabinets", href: "/cabinet-painting" },
  ],
  "10-things-i-learned-our-clients-value": [
    { find: "Quality and attention to detail is key in painting services", anchorIn: "painting services", href: "/interior-painting" },
    { find: "a price that is fair and affordable", anchorIn: "fair and affordable", href: "/budget" },
    { find: "5 days for an interior painting project and same for exterior painting", anchorIn: "exterior painting", href: "/exterior-painting" },
  ],
  "is-your-leftover-paint-going-bad-learn-how-to-save-it": [
    { find: "stored for future touch-ups and projects", anchorIn: "future touch-ups", href: "/interior-painting" },
    { find: "Latex or water-based paints typically have a longer shelf life", anchorIn: "water-based paints", href: "/preparation-process" },
    { find: "extend the shelf life of your leftover paint and maximize your investment", anchorIn: "maximize your investment", href: "/contact" },
  ],
  "proper-paint-disposal-a-guide-for-responsible-homeowners": [
    { find: "enhancing your home's exterior with a vibrant new look", anchorIn: "your home's exterior", href: "/exterior-painting" },
    { find: "revitalizing your indoor spaces", anchorIn: "indoor spaces", href: "/interior-painting" },
    { find: "to receive a free painting estimate", anchorIn: "free painting estimate", href: "/contact" },
  ],
  "touch-ups": [
    { find: "repair the cut out piece of drywall", anchorIn: "drywall", href: "/interior-painting/drywall-repair" },
    { find: "here is our process as professional painters for doing touch ups", anchorIn: "professional painters", href: "/interior-painting" },
  ],
  "the-ultimate-guide-for-when-to-paint": [
    { find: "a professional company specializing in interior painting services", anchorIn: "interior painting services", href: "/interior-painting" },
    { find: "After a color consultation with The Proud Paintbrush", anchorIn: "color consultation", href: "/color-consultation" },
    { find: "you can just paint your kitchen cabinets", anchorIn: "kitchen cabinets", href: "/cabinet-painting" },
  ],
  "to-prime-or-not-to-prime": [
    { find: "This is why we offer a 2 year warranty on all painting services", anchorIn: "2 year warranty", href: "/warranty" },
    { find: "When we paint oak cabinets or front doors", anchorIn: "oak cabinets", href: "/cabinet-painting" },
  ],
  "lrv": [
    { find: "taking the interior and exterior", anchorIn: "interior", href: "/interior-painting" },
    { find: "exterior painting to the next level", anchorIn: "exterior painting", href: "/exterior-painting" },
  ],
  "10-things-professional-painters-should-do-on-every-interior-but-many-dont": [
    { find: "This includes:</p><ul><li><p>Drop cloths and plastic sheeting", anchorIn: "Drop cloths and plastic sheeting", href: "/preparation-process" },
    { find: "Schedule your free estimate today", anchorIn: "Schedule your free estimate today", href: "/contact" },
    { find: "Delivering clean, lasting results", anchorIn: "lasting results", href: "/warranty" },
  ],
  "which-sugar-land-painter-has-the-best-warranty": [
    { find: "showing that quality problems are rare", anchorIn: "quality problems are rare", href: "/preparation-process" },
    { find: "Schedule your <a", anchorIn: "Schedule your", href: "/contact" },
  ],
};
