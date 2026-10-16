// Enquiry form handler (stub).
// TODO: validate the body on the server (zod or similar), then:
//   1. create a Lead in Zoho CRM (server-side OAuth refresh-token flow,
//      Lead Source "Website…", custom field Course_Enquired);
//   2. send an email alert to the team, even if Zoho fails, so no lead is lost.
export async function POST() {
  return Response.json({ error: "Not implemented" }, { status: 501 });
}
