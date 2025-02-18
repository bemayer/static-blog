import { FreshContext } from "$fresh/server.ts";

export const handler = {
  GET(_req: Request, _ctx: FreshContext) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/index.html" },
    });
  },
};

export default function Page() {
  return <div />;
}
