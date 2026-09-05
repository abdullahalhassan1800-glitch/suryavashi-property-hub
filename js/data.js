/* ==========================================================================
   Suryavashi Property Hub — Data Layer
   Central source of truth for projects & blog content.
   ========================================================================== */

var VIHAAN = {
  brand: "Suryavashi Property Hub",
  tagline: "Crafting Trustworthy Homes & Premium Spaces",
  /* Base path of the site on the server (GitHub Pages sub-path). */
  base: "/suryavashi-property-hub/",
  phone: "+91-XXXXX XXXXX",
  phoneHref: "tel:+919732300007",
  whatsapp: "https://wa.me/919732300007",
  email: "info@suryavashiproperty.com",
  address: "Sector 16, Greater Noida West, Uttar Pradesh, India",
  rera: "Suryavashi Property Hub — RERA Registered Projects",

  /* Trust badges shown in the homepage running ticker */
  trust: [
    "RERA Registered Project",
    "Bank Tie-ups · HDFC · ICICI",
    "100% Transparent Process",
    "Free Site Visit & Consultation",
    "Greater Noida West · Sector 16",
    "No Hidden Charges",
    "24×7 Customer Support",
    "Verified RERA Compliance",
  ],

  /*
   * Google Sheets form endpoint (see FORM-SETUP.md).
   * Paste your deployed Google Apps Script Web App URL here.
   * Empty string = forms keep working with WhatsApp popup only.
   */
  formEndpoint: "",

  amenities: [
    { icon: "🏊", name: "Swimming Pool" },
    { icon: "🏛️", name: "Club House" },
    { icon: "🛕", name: "Temple" },
    { icon: "🏋️", name: "Gym & Kids Area" },
    { icon: "🔒", name: "Gated Society" },
    { icon: "🌿", name: "Terrace Garden" },
    { icon: "🌳", name: "Central Park" },
    { icon: "🛡️", name: "24x7 Security" },
  ],

  /* Shared path prefix for images */
  projects: [
    {
      id: "green-heaven",
      name: "Green Heaven",
      type: "Residential",
      location: "Sector 16, Greater Noida West (near Sparsh Global School)",
      configs: ["2 BHK", "3 BHK"],
      price: "Call for Price",
      callForPrice: true,
      tag: "New Launch",
      status: "featured",
      developer: "Suryavashi Property Hub",
      image: "images/projects/green-heaven-1.jpg?v=12",
      gallery: [
        "images/projects/green-heaven-1.jpg",
        "images/projects/green-heaven-2.jpg",
        "images/projects/green-heaven-3.jpg",
        "images/projects/green-heaven-4.jpg",
        "images/projects/green-heaven-5.jpg",
        "images/projects/green-heaven-6.jpg",
        "images/projects/green-heaven-7.jpg",
      ],
      amenityGallery: [
        { img: "images/projects/green-heaven-amenities/building.jpg", label: "Modern Residences" },
        { img: "images/projects/green-heaven-amenities/gated-society.jpg", label: "Gated Society" },
        { img: "images/projects/green-heaven-amenities/club-house.jpg", label: "Society Club House" },
        { img: "images/projects/green-heaven-amenities/swimming-pool.jpg", label: "Swimming Pool" },
        { img: "images/projects/green-heaven-amenities/sports-court.jpg", label: "Badminton & Volleyball Court" },
        { img: "images/projects/green-heaven-amenities/master-plan.jpg", label: "Society Master Plan" },
        { img: "images/projects/green-heaven-amenities/top-view.jpg", label: "Top View of Society" },
      ],
      video: "images/projects/green-heaven-video.mp4",
      videos: [
        "images/projects/green-heaven-video-1.mp4",
        "images/projects/green-heaven-video-2.mp4",
        "images/projects/green-heaven-video.mp4",
      ],
      rera: "RERA Registered",
      possession: "Contact us for details",
      description:
        "Green Heaven is a thoughtfully crafted gated residential community by Suryavashi Property Hub, balancing modern comfort with an eco-conscious, greenery-rich living experience. Nestled in Sector 16, Greater Noida West near Sparsh Global School, it offers 2 & 3 BHK residences designed for families who value space, safety and serenity.",
      longDescription:
        "Green Heaven reimagines everyday living with vibrant landscaping, open courtyards and premium common amenities. Every residence is planned with generous natural light, efficient layouts and high-quality finishes. As a gated society, residents enjoy protected common areas, dedicated parking and round-the-clock security — a true sanctuary amid the fast-growing Noida West corridor. Positioned close to schools, retail and upcoming infrastructure, Green Heaven is equally suited for end-users and long-term investors seeking balanced appreciation.",
      facts: [
        { k: "Project Type", v: "Residential" },
        { k: "Configurations", v: "2 & 3 BHK" },
        { k: "Location", v: "Sec-16, G. Noida West" },
        { k: "Status", v: "New Launch" },
        { k: "RERA", v: "Registered" },
        { k: "Possession", v: "On Request" },
      ],
      details: {
        area: "Carpet Area: 1,050 – 1,650 sq.ft.",
        possession: "Ready to Possess",
        rera: "RERA Registered",
        amenities: "Pool · Club House · Gym · Temple · Park",
        floors: "G+15 Floors"
      }
    },
    {
      id: "vihaan-wardenia",
      name: "Vihaan Wardenia",
      type: "Residential",
      location: "Greater Noida West",
      configs: ["2 BHK", "3 BHK", "4 BHK"],
      price: "Coming Soon",
      tag: "Upcoming",
      status: "upcoming",
      developer: "Suryavashi Property Hub",
      image: "images/projects/vihaan-wardenia-1.jpg",
      gallery: [
        "images/projects/vihaan-wardenia-1.jpg",
        "images/projects/vihaan-wardenia-2.jpg",
      ],
      video: null,
      rera: "RERA Registered",
      possession: "Coming Soon",
      description:
        "Vihaan Wardenia is an upcoming premium residential offering from Suryavashi Property Hub, bringing signature quality and lifestyle amenities to the Greater Noida West landscape.",
      longDescription:
        "Vihaan Wardenia is poised to set a new benchmark for community living with expansive layouts, resort-style amenities and a prime North NCR location. Stay tuned for full details, floor plans and launch pricing.",
      facts: [
        { k: "Project Type", v: "Residential" },
        { k: "Configurations", v: "2 / 3 / 4 BHK" },
        { k: "Location", v: "Greater Noida West" },
        { k: "Status", v: "Upcoming" },
        { k: "RERA", v: "Registered" },
        { k: "Possession", v: "Coming Soon" },
      ],
      details: {
        area: "Configurable 1,100 – 2,200 sq.ft.",
        possession: "Launch Details Coming Soon",
        rera: "RERA Registered",
        amenities: "Club House · Pool · Gym · Green Spaces",
        floors: "Premium Residential & MFD"
      }
    },
  ],

  getProject: function (id) {
    for (var i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === id) return this.projects[i];
    }
    return null;
  },

  testimonials: [
    {
      quote:
        "Suryavashi Property Hub guided us through the entire purchase with complete clarity. The team was transparent, responsive and made the process feel effortless.",
      author: "Rahul Sharma",
      role: "Home Buyer, Green Heaven",
    },
    {
      quote:
        "From first site visit to booking, everything was handled professionally. The amenities and construction quality speak for themselves — extremely satisfied.",
      author: "Priya Verma",
      role: "Investor, Noida West",
    },
    {
      quote:
        "What stood out was the honesty. They explained every detail, never pressured us, and helped us pick a home that truly suited our budget and family needs.",
      author: "Amit Malhotra",
      role: "Verified Homeowner",
    },
  ],

  /* Blog data */
  blogs: [
    {
      id: "green-heaven-launch",
      title: "Green Heaven: A New Eco-Living Benchmark in Greater Noida West",
      image: "images/projects/green-heaven-1.jpg",
      cat: "Project Launch",
      date: "Sep 02, 2026",
      read: "4 min read",
      excerpt:
        "Discover how Green Heaven by Suryavashi Property Hub blends gated security, lush landscaping and premium 2 & 3 BHK residences in the heart of Greater Noida West.",
    },
    {
      id: "noida-west-growth",
      title: "Why Greater Noida West Is Becoming a Preferred Home Destination",
      image: "images/projects/vihaan-wardenia-1.jpg",
      cat: "Market Insight",
      date: "Aug 28, 2026",
      read: "5 min read",
      excerpt:
        "Connectivity, infrastructure and balanced pricing are drawing families and investors to Noida West. Here's what buyers should weigh before investing.",
    },
    {
      id: "buying-guide",
      title: "7 Things Every Home Buyer Should Check Before Booking a Property",
      image: "images/projects/green-heaven-5.jpg",
      cat: "Buying Guide",
      date: "Aug 20, 2026",
      read: "6 min read",
      excerpt:
        "RERA verification, developer track record, amenities, location and total cost — a practical checklist to protect your investment from day one.",
    },
  ],
};
