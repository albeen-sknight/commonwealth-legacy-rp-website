/**
 * Commonwealth Legacy RP - News & Announcements Datastore
 * Central database for changelogs, community updates, and court events.
 */

const NewsData = [
  {
    id: 1,
    title: "Server Update: 2026 Road Map & Economy Balance",
    category: "Announcement",
    badgeClass: "badge-info",
    date: "May 22, 2026",
    author: "Commonwealth Legacy Staff",
    excerpt: "Discover the upcoming expansion phases of the Commonwealth. Read about our legal wages rework, new import vehicle dealerships, and custom residential zoning.",
    content: `
      <p>We are thrilled to present our 2026 Development Roadmap for Commonwealth Legacy RP. Our team has been working around the clock to enhance realism, increase stability, and deliver the highest caliber of roleplay ever experienced.</p>
      <br>
      <h3>Key Highlights:</h3>
      <ul>
        <li><strong>Economy Rebalance:</strong> Legal job salaries (garbage collection, delivery, mining) have been adjusted by +15% to reward dedicated civilians.</li>
        <li><strong>Import Dealership:</strong> The luxury dealership in Richmond is officially opening its doors with 25 bespoke non-branded, highly detailed vehicle models.</li>
        <li><strong>State Housing:</strong> Standard interior configurations have been expanded. Players can now purchase custom apartments in downtown and design their interiors item by item.</li>
      </ul>
      <br>
      <p>We'll be releasing these features in consecutive phases over the next two weeks. Thank you for shaping your legacy with us!</p>
    `,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Custom Housing Decorator System Is Live!",
    category: "Feature",
    badgeClass: "badge-success",
    date: "May 18, 2026",
    author: "Lead Developer",
    excerpt: "No more static walls. The custom furniture and housing decoration editor has launched! Purchase props, set lighting, and customize your home.",
    content: `
      <p>Decorate your house exactly how you see fit. Our new custom housing interior editor gives you complete control over your home's appearance.</p>
      <br>
      <p>Buy furniture pieces at local stores and place them, rotate them, or scale them in real-time inside your house or apartment. You can invite friends to collaborate, customize lighting colors, and lock/unlock specific storage containers.</p>
    `,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "VSP & VBSO Joint Recruitment Drive Starts Monday",
    category: "Department",
    badgeClass: "badge-update",
    date: "May 15, 2026",
    author: "Superintendent Miller",
    excerpt: "Looking for a career in public service? VSP and VBSO are hosting a combined informational recruitment drive at the State Academy.",
    content: `
      <p>The Virginia State Police and Virginia Beach Sheriff's Office are actively seeking motivated, mature individuals to join our law enforcement academies.</p>
      <br>
      <p>Candidates will participate in practical training exercises, ride-alongs, and standard interviews. Explore patrol divisions, K9 handling, highway speed enforcement, and court bailiff assignments.</p>
    `,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Community Car Meet: Richmond Boulevard Oceanfront",
    category: "Event",
    badgeClass: "badge-warning",
    date: "May 10, 2026",
    author: "Events Coordinator",
    excerpt: "Polish your rims and clean your filters. The seasonal Commonwealth Car Show kicks off this Saturday. Cash prizes for best paint and custom tunes.",
    content: `
      <p>Get ready for the largest automotive event of the spring! Join the community at the Richmond Boulevard Oceanfront parking lot for an evening of luxury imports, custom muscle cars, and classic cruisers.</p>
      <br>
      <p>Special food vendors will be present, and the Virginia Beach Sheriff's Office will be assisting with local traffic control to ensure a safe, fun night for all attendees.</p>
    `,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop"
  }
];
