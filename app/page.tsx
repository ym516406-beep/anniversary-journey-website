"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import {
  Heart,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Star,
  Flame,
  Feather,
  Gem,
  Sun,
  Moon,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*                                   DATA                                      */
/* -------------------------------------------------------------------------- */

type YearEntry = {
  year: string
  title: string
  subtitle: string
  milestones: string[]
  Icon: typeof Heart
  glow: string
  transition: "scale" | "split" | "drift" | "unfold" | "swirl"
}

const JOURNEY: YearEntry[] = [
  {
    year: "2021",
    title: "The Spark",
    subtitle: "Where two worlds quietly collided",
    Icon: Sparkles,
    glow: "#f43f5e",
    transition: "scale",
    milestones: [
      "A first glance that lingered a heartbeat too long.",
      "Late-night conversations that outlasted the moon.",
      "The moment we realized this was different.",
    ],
  },
  {
    year: "2022",
    title: "Becoming Us",
    subtitle: "Two paths braided into one",
    Icon: Heart,
    glow: "#e11d48",
    transition: "split",
    milestones: [
      "Our first adventure, hand in hand into the unknown.",
      "Learning each other's silences and storms.",
      "The first 'I love you' that changed everything.",
    ],
  },
  {
    year: "2023",
    title: "Deep Roots",
    subtitle: "Growing steady, growing true",
    Icon: Feather,
    glow: "#fb7185",
    transition: "drift",
    milestones: [
      "A home that finally felt like ours.",
      "Weathering the hard days without letting go.",
      "Discovering that comfort could feel like fireworks.",
    ],
  },
  {
    year: "2024",
    title: "Golden Horizons",
    subtitle: "Dreaming louder, together",
    Icon: Sun,
    glow: "#fbbf24",
    transition: "unfold",
    milestones: [
      "Chasing sunrises in places we'd only imagined.",
      "Building plans with your hand always in mine.",
      "Realizing forever had quietly begun.",
    ],
  },
  {
    year: "2025",
    title: "Unbreakable",
    subtitle: "A love that learned its own strength",
    Icon: Gem,
    glow: "#f43f5e",
    transition: "swirl",
    milestones: [
      "Choosing each other again, and again, and again.",
      "Turning ordinary moments into treasured memory.",
      "Understanding that home was never a place — it was you.",
    ],
  },
]

const LETTER: string[] = [
  "My love,",
  "Five years ago, I could never have imagined the universe I would find inside a single person. Yet here we are — five orbits around the sun, and every one of them more luminous because you were beside me.",
  "We began as a spark, uncertain and electric. We became a fire that neither time nor distance nor the coldest nights could ever put out. You taught me that love is not a destination but a way of traveling — patient, brave, and endlessly kind.",
  "Thank you for every quiet morning, every reckless dream, every time you held my hand when the road blurred. Thank you for choosing us, over and over, in ways both grand and gloriously small.",
  "So here is my promise for the years still unwritten: I will keep choosing you. In every season, in every version of this life, I will find my way back to you.",
  "Happy five years, my forever.",
  "— Always yours",
]

/* -------------------------------------------------------------------------- */
/*                              ANIMATION VARIANTS                             */
/* -------------------------------------------------------------------------- */

const transitionVariants: Record<YearEntry["transition"], Variants> = {
  // 3D-like scale / fade
  scale: {
    initial: { opacity: 0, scale: 0.6, rotateX: 35, filter: "blur(12px)" },
    animate: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 1.25,
      rotateX: -25,
      filter: "blur(14px)",
      transition: { duration: 0.7, ease: [0.55, 0, 1, 0.45] },
    },
  },
  // slide-split reveal
  split: {
    initial: { opacity: 0, x: 120, skewX: -8 },
    animate: {
      opacity: 1,
      x: 0,
      skewX: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      x: -120,
      skewX: 8,
      transition: { duration: 0.65, ease: [0.7, 0, 0.84, 0] },
    },
  },
  // particle-like drift
  drift: {
    initial: { opacity: 0, y: 90, scale: 0.92, filter: "blur(10px)" },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
    },
    exit: {
      opacity: 0,
      y: -90,
      scale: 1.05,
      filter: "blur(12px)",
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  },
  // unfold / flip
  unfold: {
    initial: { opacity: 0, rotateY: 90, transformPerspective: 1200 },
    animate: {
      opacity: 1,
      rotateY: 0,
      transformPerspective: 1200,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      rotateY: -90,
      transformPerspective: 1200,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  },
  // swirl / rotate in
  swirl: {
    initial: { opacity: 0, scale: 0.4, rotate: -25, filter: "blur(14px)" },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      rotate: 20,
      filter: "blur(14px)",
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  },
}

const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.18, delayChildren: 0.35 } },
}

const staggerItem: Variants = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

/* -------------------------------------------------------------------------- */
/*                              SHARED BACKDROP                                */
/* -------------------------------------------------------------------------- */

type Ember = {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  drift: number
  rise: number
}

function FloatingEmbers() {
  // Generate randomized embers only on the client to avoid hydration mismatch.
  const [embers, setEmbers] = useState<Ember[]>([])

  useEffect(() => {
    setEmbers(
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 9,
        drift: (Math.random() - 0.5) * 80,
        rise: 420 + Math.random() * 200,
      })),
    )
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((e) => (
        <motion.span
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.left}%`,
            bottom: -20,
            width: e.size,
            height: e.size,
            background:
              "radial-gradient(circle, rgba(251,113,133,0.9) 0%, rgba(244,63,94,0.4) 60%, transparent 100%)",
            boxShadow: "0 0 8px rgba(244,63,94,0.6)",
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, -e.rise],
            x: [0, e.drift],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

function AmbientGlow({ color }: { color: string }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4 }}
    >
      <motion.div
        className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}55 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] bottom-[8%] h-[38vh] w-[38vh] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  SCREENS                                    */
/* -------------------------------------------------------------------------- */

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.section
      key="intro"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="mb-8"
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(244,63,94,0.5), transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
          <Heart className="relative h-16 w-16 text-rose-400" strokeWidth={1.2} fill="rgba(244,63,94,0.35)" />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="mb-4 text-sm uppercase tracking-[0.5em] text-rose-300/70"
      >
        2021 &nbsp;—&nbsp; 2026
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl bg-gradient-to-b from-rose-100 via-rose-200 to-amber-200/80 bg-clip-text font-serif text-5xl font-light leading-tight text-transparent text-balance sm:text-6xl md:text-7xl"
      >
        Five Years of Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9 }}
        className="mt-6 max-w-xl text-lg font-light leading-relaxed text-slate-300/80 text-pretty"
      >
        A cinematic journey through every heartbeat, every season, and every reason I would choose you all over again.
      </motion.p>

      <motion.button
        onClick={onStart}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.15 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="group relative mt-12 inline-flex items-center gap-3 overflow-hidden rounded-full border border-rose-400/30 bg-rose-500/10 px-9 py-4 text-base font-medium text-rose-50 backdrop-blur-sm transition-colors hover:border-rose-300/60"
      >
        <span
          className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle at center, rgba(244,63,94,0.4), transparent 70%)" }}
        />
        Start Our Journey
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-16 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500"
      >
        <Star className="h-3 w-3 text-amber-300/70" fill="currentColor" />
        An anniversary keepsake
        <Star className="h-3 w-3 text-amber-300/70" fill="currentColor" />
      </motion.div>
    </motion.section>
  )
}

function YearScreen({
  entry,
  index,
  total,
  onNext,
  onPrev,
}: {
  entry: YearEntry
  index: number
  total: number
  onNext: () => void
  onPrev: () => void
}) {
  const { Icon } = entry
  return (
    <motion.section
      key={entry.year}
      variants={transitionVariants[entry.transition]}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-20"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Giant ghost year */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-serif text-[34vw] font-bold leading-none text-white/[0.03]"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4 }}
      >
        {entry.year}
      </motion.span>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative flex max-w-2xl flex-col items-center text-center"
      >
        <motion.div variants={staggerItem} className="relative mb-6">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: `radial-gradient(circle, ${entry.glow}66, transparent 70%)`, filter: "blur(18px)" }}
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY }}
          />
          <div
            className="relative flex h-20 w-20 items-center justify-center rounded-full border"
            style={{ borderColor: `${entry.glow}55`, background: `${entry.glow}14` }}
          >
            <Icon className="h-9 w-9" style={{ color: entry.glow }} strokeWidth={1.4} />
          </div>
        </motion.div>

        <motion.p
          variants={staggerItem}
          className="mb-2 text-sm font-medium uppercase tracking-[0.45em]"
          style={{ color: entry.glow }}
        >
          {entry.year}
        </motion.p>

        <motion.h2 variants={staggerItem} className="font-serif text-5xl font-light text-rose-50 text-balance sm:text-6xl">
          {entry.title}
        </motion.h2>

        <motion.p variants={staggerItem} className="mt-4 text-lg font-light italic text-slate-300/80">
          {entry.subtitle}
        </motion.p>

        <motion.ul variants={staggerContainer} className="mt-10 flex w-full flex-col gap-4">
          {entry.milestones.map((m, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              className="group flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-4 text-left backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-white/[0.04]"
            >
              <span
                className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full"
                style={{ background: `${entry.glow}22` }}
              >
                <Flame className="h-3.5 w-3.5" style={{ color: entry.glow }} />
              </span>
              <span className="text-base font-light leading-relaxed text-slate-200/90">{m}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Controls */}
      <motion.div variants={staggerItem} initial="initial" animate="animate" className="relative mt-12 flex items-center gap-6">
        <button
          onClick={onPrev}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-white/25 hover:text-white"
          aria-label="Previous"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2" aria-hidden>
          {Array.from({ length: total }).map((_, i) => (
            <motion.span
              key={i}
              className="h-1.5 rounded-full"
              animate={{
                width: i === index ? 28 : 8,
                backgroundColor: i === index ? entry.glow : "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-rose-50 transition-transform hover:scale-105"
          style={{ background: `${entry.glow}22`, border: `1px solid ${entry.glow}55` }}
        >
          {index === total - 1 ? "The Final Chapter" : "Continue"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </motion.section>
  )
}

function FinaleScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.section
      key="finale"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-10"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.5), transparent 70%)", filter: "blur(24px)" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-amber-300/40 bg-amber-400/10">
          <Moon className="h-10 w-10 text-amber-200" strokeWidth={1.2} />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mb-3 text-sm uppercase tracking-[0.5em] text-amber-200/70"
      >
        2026 &amp; Forever
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 max-w-3xl bg-gradient-to-b from-rose-100 via-amber-100 to-amber-200/70 bg-clip-text text-center font-serif text-4xl font-light leading-tight text-transparent text-balance sm:text-5xl md:text-6xl"
      >
        A Letter For My Forever
      </motion.h2>

      <motion.div
        variants={{ animate: { transition: { staggerChildren: 0.55, delayChildren: 0.8 } } }}
        initial="initial"
        animate="animate"
        className="relative max-w-2xl"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem]"
          style={{ background: "radial-gradient(ellipse at center, rgba(244,63,94,0.12), transparent 70%)", filter: "blur(30px)" }}
        />
        {LETTER.map((line, i) => {
          const isFirst = i === 0
          const isSignature = line.startsWith("—")
          return (
            <motion.p
              key={i}
              variants={{
                initial: { opacity: 0, y: 26, filter: "blur(8px)" },
                animate: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={
                isFirst
                  ? "mb-6 font-serif text-2xl font-light text-rose-100"
                  : isSignature
                    ? "mt-8 text-right font-serif text-xl font-light italic text-amber-200/90"
                    : "mb-6 text-lg font-light leading-loose text-slate-200/90 text-pretty"
              }
            >
              {line}
            </motion.p>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 4 }}
        className="mt-16 flex flex-col items-center gap-6"
      >
        <div className="flex items-center gap-3 text-rose-300/80">
          <Heart className="h-5 w-5" fill="currentColor" />
          <span className="font-serif text-lg italic">Happy 5th Anniversary</span>
          <Heart className="h-5 w-5" fill="currentColor" />
        </div>
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-light text-slate-300 transition-colors hover:border-rose-300/40 hover:text-rose-100"
        >
          <Sparkles className="h-4 w-4" />
          Relive our journey
        </button>
      </motion.div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    APP                                       */
/* -------------------------------------------------------------------------- */

type Stage = { screen: "intro" } | { screen: "year"; index: number } | { screen: "finale" }

export default function AnniversaryJourney() {
  const [stage, setStage] = useState<Stage>({ screen: "intro" })

  const currentGlow =
    stage.screen === "year" ? JOURNEY[stage.index].glow : stage.screen === "finale" ? "#fbbf24" : "#f43f5e"

  const goNext = useCallback(() => {
    setStage((s) => {
      if (s.screen === "year") {
        return s.index < JOURNEY.length - 1 ? { screen: "year", index: s.index + 1 } : { screen: "finale" }
      }
      return s
    })
  }, [])

  const goPrev = useCallback(() => {
    setStage((s) => {
      if (s.screen === "year") {
        return s.index > 0 ? { screen: "year", index: s.index - 1 } : { screen: "intro" }
      }
      return s
    })
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] font-sans text-white antialiased">
      {/* Base vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(30,15,25,0.9) 0%, #0a0a0f 55%), radial-gradient(ellipse at 80% 90%, rgba(40,20,10,0.6), transparent 60%)",
        }}
      />

      <AmbientGlow color={currentGlow} />
      <FloatingEmbers />

      <AnimatePresence mode="wait">
        {stage.screen === "intro" && <IntroScreen key="intro" onStart={() => setStage({ screen: "year", index: 0 })} />}

        {stage.screen === "year" && (
          <YearScreen
            key={JOURNEY[stage.index].year}
            entry={JOURNEY[stage.index]}
            index={stage.index}
            total={JOURNEY.length}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}

        {stage.screen === "finale" && <FinaleScreen key="finale" onRestart={() => setStage({ screen: "intro" })} />}
      </AnimatePresence>
    </main>
  )
}
