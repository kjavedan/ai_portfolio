'use client';

const services = [
  {
    id: 0,
    title: 'MVP Strategy & Scoping',
    desc: 'Before anything gets built, we sit together and figure out what your MVP actually needs to be. What matters on day one, what can wait, and how to test your idea with real users before going all in. This conversation alone usually saves people from building the wrong thing entirely.',
  },
  {
    id: 1,
    title: 'Full Stack MVP Development',
    desc: "I build your product from the ground up — frontend, backend, database, deployment, all of it. But here's the thing: you won't see your product for the first time on delivery day. It goes live early, and you're giving me feedback throughout. Your vision stays yours the whole way through.",
  },
  {
    id: 2,
    title: 'Technical Advisory',
    desc: "Sometimes you don't need a full build. You just need someone with experience to sit with you and help you think. Which tools make sense, where you're about to overspend, what your team actually needs to look like. I'm happy to just be that person for you.",
  },
];

const whyPoints = [
  {
    id: 0,
    title: 'I know what not to build.',
    desc: "That sounds simple but it's genuinely one of the hardest things in early-stage product work — and it saves founders enormous amounts of money and time.",
  },
  {
    id: 1,
    title: 'I cut costs without cutting quality.',
    desc: 'Not by using cheap solutions, but by knowing the tools and workflows that do the job well without the unnecessary overhead.',
  },
  {
    id: 2,
    title: 'I keep people informed.',
    desc: "You'll always know where things stand. If something's taking longer than expected, you'll hear it from me before you have to ask.",
  },
  {
    id: 3,
    title: 'I think about the business, not just the code.',
    desc: "Your product isn't a technical exercise. It's something you're betting real time and money on. I take that seriously.",
  },
];

export default function MyServices() {
  return (
    <div className="h-full overflow-y-scroll p-4 font-mono lg:px-0">
      {/* Opening */}
      <section className="max-w-150">
        <h2 className="mt-4 leading-snug">
          You have an idea. Let&apos;s figure out the smartest way to build it.
        </h2>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          Not the fastest way. Not the most expensive way. The smartest way —
          for where you are right now, with what you have right now.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          I&apos;m Khaled. I&apos;ve spent the last 4 years helping founders,
          solo entrepreneurs, and small teams turn their ideas into real
          products. And the most valuable thing I&apos;ve learned isn&apos;t
          technical — it&apos;s that most early-stage products fail not because
          the idea was bad, but because too much was built too soon, too fast,
          with too little clarity.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          That&apos;s the thing I help you avoid.
        </p>
      </section>

      {/* The Problem */}
      <section className="mt-16 max-w-150">
        <h2 className="leading-snug">
          You probably have more questions than answers right now.
        </h2>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          And that&apos;s completely normal. Most of the people I work with come
          to me with some version of the same uncertainty:
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-6 italic">
          Where do I even start? What should I build first? How long will this
          take? What&apos;s this going to actually cost me — and what are the
          costs nobody tells you about upfront? Do I need a team or can one
          person handle this? What if I build the whole thing and nobody wants
          it?
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          These aren&apos;t small questions. And the wrong answers to any of
          them can cost you months of work and money you didn&apos;t need to
          spend.
        </p>
      </section>

      {/* What I Do */}
      <section className="mt-16 max-w-150">
        <h2 className="leading-snug">Here&apos;s how I can help.</h2>
        <ol className="mt-6 flex flex-col gap-6">
          {services.map((service) => (
            <li key={service.id}>
              <p className="text-sm font-bold">{service.title}</p>
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                {service.desc}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* How We Work Together */}
      <section className="mt-16 max-w-150">
        <h2 className="leading-snug">
          What working with me actually looks like.
        </h2>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          We start with a call. You tell me about your idea — what it is, who
          it&apos;s for, where you are with it. I ask a lot of questions, and
          I&apos;m honest about what I think. No pitch, no pressure.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          If it makes sense to move forward, I put together a clear scope — what
          we&apos;re building, in what order, how long it&apos;ll take, and what
          it&apos;ll cost. Everything on the table before we start.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          Once we&apos;re building, you&apos;re not waiting in the dark. The app
          is live in a staging environment from early on. You see it, you use
          it, you tell me what feels right and what doesn&apos;t. That back and
          forth is how we make sure what gets delivered is actually what you had
          in mind.
        </p>
      </section>

      {/* Why Me */}
      <section className="mt-16 max-w-150">
        <h2 className="leading-snug">Why work with me.</h2>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          I&apos;m not going to list a bunch of technologies here. What
          I&apos;ll tell you instead is what I&apos;ve actually gotten good at
          over 4 years of doing this.
        </p>
        <ol className="mt-6 flex flex-col gap-4">
          {whyPoints.map((point) => (
            <li key={point.id} className="flex flex-col gap-1">
              <p className="text-sm font-bold">{point.title}</p>
              <p className="text-muted-foreground text-sm leading-6">
                {point.desc}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing */}
      <section className="mt-16 max-w-150">
        <h2 className="leading-snug">What does it cost?</h2>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          I&apos;ll always be straight with you about this.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          For advisory work or smaller engagements, I work hourly. You pay for
          the time we actually use, nothing more.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          For full builds, I work on a project basis. After our first call, I
          put together a detailed proposal — broken down clearly so you know
          exactly what you&apos;re paying for and why. No vague estimates, no
          surprises halfway through.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          The honest truth about MVP costs: it depends on what you&apos;re
          building and what you actually need. What I can promise is that
          I&apos;ll never recommend more than what makes sense for where you are
          right now.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-16 max-w-150">
        <h2 className="leading-snug">Want to talk it through?</h2>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          If you&apos;ve got an idea you&apos;re trying to figure out — even if
          it&apos;s still fuzzy — I&apos;m happy to jump on a call. We&apos;ll
          talk through what you&apos;re thinking, and I&apos;ll give you my
          honest take. No commitment, no sales pitch.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="https://cal.com/khaled-2wiu0n/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-4 py-2 text-sm transition-opacity hover:opacity-80"
          >
            Book a Free Call
          </a>
        </div>
        <p className="text-muted-foreground mt-6 text-sm">
          And if a call feels like too much right now, feel free to reach out
          however feels comfortable. I don&apos;t bite. 😄
        </p>
      </section>

      <p className="mt-26 text-sm">Get in touch</p>

      <ul className="mt-6 flex flex-wrap items-center gap-4 text-sm">
        <li className="hover:underline">
          <a href="https://github.com/kjavedan" target="_blank">
            GitHub
          </a>
        </li>
        <li className="hover:underline">
          <a href="https://www.linkedin.com/in/khaled-javdan/" target="_blank">
            Linkedin
          </a>
        </li>
        <li className="text-muted-foreground">devkhaledjavdan@gmail.com</li>
      </ul>

      <div className="mt-10" />
    </div>
  );
}
