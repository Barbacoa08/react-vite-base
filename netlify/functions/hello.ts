// route: BASEURL/api/hello
// example: GET https://deploy-preview-10--react-vite-base.netlify.app/api/hello
export default () => new Response("hello!");

export const config = { path: "/api/hello" };
