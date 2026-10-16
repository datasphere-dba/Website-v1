// Company facts and navigation in one place.
// Values come from CLAUDE.md ("Business facts"). Don't invent new ones.

export type NavLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "DataSphere",
  // TODO: HR to confirm the company name to display.
  legalName: "Datasphere Edu Solutions Pvt. Ltd.",
  description:
    "Database and DBA training in Bengaluru and online: Oracle, MySQL, PostgreSQL, MongoDB and more.",
  // Falls back to the live domain so canonical URLs and the sitemap are absolute.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://datasphere.co.in",
  // TODO: HR to confirm the address to display.
  address: {
    street: "#20 2nd Main Road, Kanaka Layout, BSK 2nd Stage",
    city: "Bengaluru",
    postalCode: "560070",
    country: "IN",
  },
  phone: "+91 99807 22144",
  phoneHref: "tel:+919980722144",
  email: "training@datasphere.co.in",
  whatsappHref: "https://wa.me/919980722144",
  /** Enrol / login / purchase happen on TrainerCentral. */
  trainerCentralUrl: "https://training.datasphere.co.in",
  nav: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "dbaStanza", href: "https://training.datasphere.co.in" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  adminNav: [
    { label: "Dashboard", href: "/admin" },
    { label: "Courses", href: "/admin/courses" },
    { label: "Blog", href: "/admin/blog" },
  ] satisfies NavLink[],
};
