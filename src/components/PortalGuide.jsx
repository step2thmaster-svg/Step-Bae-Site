// how a practice finds STEPBAE in each scanner's portal; menu names follow each portal's own wording
// (also used by the site assistant, ChatGuide.jsx)
export const portals = [
  {
    name: 'iTero',
    where: 'MyiTero',
    steps: [
      'Sign in to MyiTero on the web or on your scanner.',
      'Open Settings, then the Labs list.',
      'Search for STEPBAE and add us as a lab.',
      'Choose STEPBAE as the lab when you send an order.',
    ],
  },
  {
    name: '3Shape TRIOS',
    where: '3Shape Unite or Communicate',
    steps: [
      'Sign in to 3Shape Unite or 3Shape Communicate.',
      'Open Connections and choose Add connection.',
      'Search for STEPBAE or enter info@stepbae.com, then send the request.',
      'Once we accept, pick STEPBAE as the lab in your order form.',
    ],
  },
  {
    name: 'Medit',
    where: 'Medit Link',
    steps: [
      'Sign in to Medit Link.',
      'Open Partners and choose Add partner.',
      'Search for STEPBAE or enter info@stepbae.com, then send the request.',
      'Once we accept, select STEPBAE when you send a case.',
    ],
  },
  {
    name: 'Primescan / CEREC',
    where: 'Dentsply Sirona Connect Case Center',
    steps: [
      'Sign in to the Connect Case Center.',
      'Open the lab search.',
      'Search for STEPBAE and add us to your labs.',
      'Choose STEPBAE as the lab when you submit a case.',
    ],
  },
]

export default function PortalGuide() {
  return (
    <section id="portals" className="bg-cream px-6 py-14 text-ink lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center gap-6">
          <h2 className="font-display text-[36px] font-medium leading-none sm:whitespace-nowrap md:text-[40px]">
            Find Us in Your Portal
          </h2>
          <span className="hidden h-px flex-1 bg-gold-dark/40 sm:block" />
        </div>
        <p className="mt-4 max-w-[640px] text-[15px] leading-[1.6] text-ink/80">
          Search for <strong className="font-semibold text-ink">STEPBAE</strong> in your portal. If we
          don't come up, send the form below and we'll invite you directly.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {portals.map((p) => (
            <article key={p.name} className="flex flex-col rounded-[3px] border border-gold-dark/30 bg-white/60 p-6">
              <h3 className="font-display text-[26px] font-medium leading-tight">{p.name}</h3>
              <p className="mt-1 text-[12px] font-semibold tracking-[0.12em] text-gold-dark">{p.where.toUpperCase()}</p>
              <ol className="mt-5 space-y-3 text-[14px] leading-[1.5] text-ink/85">
                {p.steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-dark/60 text-[12px] font-semibold text-gold-dark">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
