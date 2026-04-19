import { useEffect, useRef, useState } from "react";
import cytoscape, { Core, NodeSingular } from "cytoscape";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Person } from "../types";

interface PrimePair { a: Person; b: Person; classifiers: string[] }
interface NodeSel { type: "node"; person: Person; connections: Array<{ other: Person; classifiers: string[] }> }
interface EdgeSel { type: "edge"; a: Person; b: Person; classifiers: string[] }
type Sel = NodeSel | EdgeSel | null;

// Physics — lava lamp mode
const SPRING_LEN    = 80;
const SPRING_K      = 0.022;   // soft springs
const REPULSION     = 3200;
const REP_CUT       = 340;
const DAMPING       = 0.88;    // viscous, like wax in oil
const GRAVITY       = 0.010;   // very gentle pull to centroid
const DRIFT_FORCE   = 0.18;    // per-node personal drift amplitude
const DRIFT_SPEED   = 0.0028;  // how fast each node's drift direction rotates (~22s cycle)
const MAX_VEL       = 18;      // velocity clamp — prevents frenetic runaway
const SIDEBAR_W     = 288;     // w-72 sidebar width in px

// Colors — detective's evidence board: all connections are red thread
const PAPER         = "#ffffff";
const INK           = "#000000";
const RED           = "#e60000";
const THREAD_FAINT  = "rgba(180,0,0,0.13)";  // 1 shared classifier
const THREAD_MED    = "rgba(210,0,0,0.36)";  // 2 shared
const THREAD_STRONG = "rgba(225,0,0,0.58)";  // 3 shared
const THREAD_PRIME  = "rgba(235,0,0,0.78)";  // 4+ shared
const THREAD_ACTIVE = "#e60000";             // selected

const INSIGHTS: Record<string, string> = {
  "AI Architecture & Deep Learning":       "the architecture of machine cognition",
  "AI Alignment & Safety":                 "the existential stakes of aligned intelligence",
  "Systems Dynamics":                      "feedback loops and leverage in complex systems",
  "Cybernetics & Feedback":               "control, coordination, and adaptive systems",
  "Consciousness & Subjective Experience": "the hard problem of inner experience",
  "Neuroscience & Brain-Computer Interfaces": "bridging biological and silicon minds",
  "Information & Communication Theory":   "the mathematics of meaning and signal",
  "Ethics, Bias & Accountability":        "the moral weight of technological power",
  "Causal & Probabilistic Reasoning":     "inference, cause, and the structure of knowing",
  "Embodied & Material Cognition":        "the body as the primary seat of intelligence",
  "Relational & Indigenous Ontologies":   "non-Western frameworks for being-in-relation",
  "Technology & Society":                 "the cultural consequences of technological systems",
  "Morphogenesis & Field Theory":         "invisible fields shaping material form",
  "Defense, Intelligence & Control":      "the weaponization of information architectures",
  "Geopolitics & Institutional Coordination": "power structures and coordination failure",
  "Quantum Computing & Physics":          "computation at the quantum frontier",
  "Pure Mathematics":                     "the formal language underlying reality",
  "Economic Systems & Labor":             "the political economy of human value",
  "Financial Markets & Complex Economies":"markets as living adaptive organisms",
  "Open Source & Democratization":        "collective intelligence and access equity",
  "Distributed Systems & Infrastructure": "the invisible backbone of digital civilization",
  "Silicon & Hardware":                   "the material substrate enabling computation",
  "Spatial Intelligence & Urban Systems": "cities as information-processing organisms",
  "Health, Medicine & Energy Anatomy":    "the body as system of energy and information",
  "Cosmology, SETI & Astrobiology":       "the cosmic search for coordinated intelligence",
  "Psychedelics & Consciousness Expansion": "non-ordinary states as epistemic tools",
};

function significance(classifiers: string[]): string {
  const p = classifiers.map(c => INSIGHTS[c] ?? c.toLowerCase());
  if (p.length === 1) return `Both converge on ${p[0]}.`;
  if (p.length === 2) return `Dual alignment across ${p[0]} and ${p[1]}.`;
  return `Multi-spectrum resonance across ${p.slice(0, -1).join(", ")}, and ${p[p.length - 1]}.`;
}

export default function PrimePairsGraph({
  primePairs,
  onSelectPerson,
  focusPerson,
}: {
  primePairs: PrimePair[];
  onSelectPerson: (p: Person) => void;
  focusPerson?: Person;
}) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const cyRef         = useRef<Core | null>(null);
  const rafRef        = useRef<number | null>(null);
  const velRef        = useRef(new Map<string, { vx: number; vy: number }>());
  const draggingRef   = useRef(new Set<string>());
  const driftPhaseRef = useRef(new Map<string, number>());  // per-node drift angle
  const driftSpeedRef = useRef(new Map<string, number>());  // per-node rotation speed

  const resetRef       = useRef<(() => void) | null>(null);
  const sidebarOpenRef = useRef(false);   // physics centroid uses this
  const prevSelOpen    = useRef(false);   // tracks open→closed transition for pan

  const [sel, setSel]     = useState<Sel>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // ── Build lookups ─────────────────────────────────────────────────────────
    const personMap = new Map<string, Person>();
    primePairs.forEach(({ a, b }) => { personMap.set(a.name, a); personMap.set(b.name, b); });

    const pairClassifiers = new Map<string, string[]>();
    primePairs.forEach(({ a, b, classifiers }) => {
      pairClassifiers.set(`${a.name}__${b.name}`, classifiers);
      pairClassifiers.set(`${b.name}__${a.name}`, classifiers);
    });

    const connMap = new Map<string, Array<{ other: Person; classifiers: string[] }>>();
    primePairs.forEach(({ a, b, classifiers }) => {
      if (!connMap.has(a.name)) connMap.set(a.name, []);
      if (!connMap.has(b.name)) connMap.set(b.name, []);
      connMap.get(a.name)!.push({ other: b, classifiers });
      connMap.get(b.name)!.push({ other: a, classifiers });
    });
    connMap.forEach((v, k) => connMap.set(k, v.sort((a, b) => b.classifiers.length - a.classifiers.length)));

    const degree = new Map<string, number>();
    primePairs.forEach(({ a, b }) => {
      degree.set(a.name, (degree.get(a.name) ?? 0) + 1);
      degree.set(b.name, (degree.get(b.name) ?? 0) + 1);
    });

    // ── Cytoscape init ────────────────────────────────────────────────────────
    const cy = cytoscape({
      container: containerRef.current,
      elements: {
        nodes: Array.from(personMap.values()).map(p => ({
          data: {
            id: p.name,
            label: p.name.split(" ").slice(-1)[0],
            degree: degree.get(p.name) ?? 1,
          },
        })),
        edges: primePairs.map(({ a, b, classifiers }) => ({
          data: {
            id: `${a.name}__${b.name}`,
            source: a.name,
            target: b.name,
            weight: classifiers.length,
          },
        })),
      },
      style: [
        {
          selector: "node",
          style: {
            "background-color": PAPER,
            "border-color": INK,
            "border-width": 1,
            "label": "data(label)",
            "text-valign": "bottom",
            "text-halign": "center",
            "font-family": "monospace",
            "font-size": "7px",
            "color": INK,
            "text-margin-y": 3,
            "width":  "mapData(degree, 1, 20, 10, 28)",
            "height": "mapData(degree, 1, 20, 10, 28)",
            "transition-property": "border-color, border-width, background-color, opacity",
            "transition-duration": "0.15s" as any,
          },
        },
        { selector: "node.selected", style: { "border-color": RED, "border-width": 2.5, "color": RED, "background-color": "rgba(230,0,0,0.07)" } },
        { selector: "node.neighbor",  style: { "border-color": THREAD_STRONG, "border-width": 1.5 } },
        { selector: "node.faded",     style: { "opacity": 0.12 } },
        {
          selector: "edge",
          style: {
            "width": 0.8,
            "line-color": THREAD_FAINT,
            "curve-style": "bezier",
            "transition-property": "line-color, width, opacity",
            "transition-duration": "0.15s" as any,
          },
        },
        { selector: "edge[weight >= 2]", style: { "line-color": THREAD_MED,    "width": 1.4 } },
        { selector: "edge[weight >= 3]", style: { "line-color": THREAD_STRONG, "width": 2.1 } },
        { selector: "edge[weight >= 4]", style: { "line-color": THREAD_PRIME,  "width": 2.8 } },
        { selector: "edge.active",       style: { "line-color": THREAD_ACTIVE, "width": 3, "opacity": 1 } },
        { selector: "edge.faded",        style: { "opacity": 0.05 } },
      ],
      // No layout here — we run it manually after registering handlers so that
      // layoutstop fires AFTER our listener is attached (not during construction).
      layout: { name: "preset" },
    });

    // ── Physics loop ──────────────────────────────────────────────────────────
    const vels = new Map<string, { vx: number; vy: number }>();
    const driftPhase = new Map<string, number>();
    const driftSpeed = new Map<string, number>();
    cy.nodes().forEach(n => {
      vels.set(n.id(), { vx: 0, vy: 0 });
      driftPhase.set(n.id(), Math.random() * Math.PI * 2);
      driftSpeed.set(n.id(), DRIFT_SPEED * (0.6 + Math.random() * 0.8));
    });
    velRef.current = vels;
    driftPhaseRef.current = driftPhase;
    driftSpeedRef.current = driftSpeed;

    const runPhysics = () => {
      const cyi = cyRef.current;
      if (!cyi) return;

      const nodeArr = cyi.nodes().toArray() as NodeSingular[];
      const W = cyi.width(), H = cyi.height();
      // Shift centroid target left when sidebar is open so nodes stay in the visible area
      const cx = W / 2 - (sidebarOpenRef.current ? SIDEBAR_W / 2 : 0);
      const cy_ = H / 2;

      const F = new Map<string, { fx: number; fy: number }>();
      nodeArr.forEach(n => F.set(n.id(), { fx: 0, fy: 0 }));

      // Springs
      cyi.edges().forEach(e => {
        const s = e.source() as NodeSingular, t = e.target() as NodeSingular;
        const sp = s.position(), tp = t.position();
        const dx = tp.x - sp.x, dy = tp.y - sp.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const stretch = (d - SPRING_LEN) * SPRING_K;
        const fx = (stretch * dx) / d, fy = (stretch * dy) / d;
        const sf = F.get(s.id())!, tf = F.get(t.id())!;
        sf.fx += fx; sf.fy += fy;
        tf.fx -= fx; tf.fy -= fy;
      });

      // Repulsion (with cutoff)
      for (let i = 0; i < nodeArr.length; i++) {
        for (let j = i + 1; j < nodeArr.length; j++) {
          const pi = nodeArr[i].position(), pj = nodeArr[j].position();
          const dx = pi.x - pj.x, dy = pi.y - pj.y;
          const d2 = dx * dx + dy * dy + 1;
          const d = Math.sqrt(d2);
          if (d > REP_CUT) continue;
          const f = REPULSION / d2;
          const fi = F.get(nodeArr[i].id())!, fj = F.get(nodeArr[j].id())!;
          fi.fx += (f * dx) / d; fi.fy += (f * dy) / d;
          fj.fx -= (f * dx) / d; fj.fy -= (f * dy) / d;
        }
      }

      // Centroid correction — prevents whole-graph drift
      let sumX = 0, sumY = 0;
      nodeArr.forEach(n => { const p = n.position(); sumX += p.x; sumY += p.y; });
      const centX = sumX / nodeArr.length;
      const centY = sumY / nodeArr.length;
      const corrX = (cx - centX) * 0.022;
      const corrY = (cy_ - centY) * 0.022;

      // Per-node lava lamp drift + gravity toward centroid
      nodeArr.forEach(n => {
        const id  = n.id();
        const pos = n.position();
        const f   = F.get(id)!;

        // Advance this node's personal drift angle
        const phase = driftPhaseRef.current.get(id)! + driftSpeedRef.current.get(id)!;
        driftPhaseRef.current.set(id, phase);

        // Smooth organic drift force (slowly rotating direction)
        f.fx += Math.cos(phase) * DRIFT_FORCE;
        f.fy += Math.sin(phase) * DRIFT_FORCE;

        // Gentle gravity toward centroid (not canvas center, so cluster coheres)
        const dx = pos.x - centX, dy = pos.y - centY;
        f.fx -= dx * GRAVITY;
        f.fy -= dy * GRAVITY;
      });

      // Integrate + centroid correction (velocity clamped to prevent runaway)
      nodeArr.forEach(n => {
        if (draggingRef.current.has(n.id())) return;
        const v = velRef.current.get(n.id())!;
        const f = F.get(n.id())!;
        v.vx = Math.max(-MAX_VEL, Math.min(MAX_VEL, (v.vx + f.fx) * DAMPING));
        v.vy = Math.max(-MAX_VEL, Math.min(MAX_VEL, (v.vy + f.fy) * DAMPING));
        const pos = n.position();
        n.position({ x: pos.x + v.vx + corrX, y: pos.y + v.vy + corrY });
      });

      // Decay agitated drift speeds back toward base rate
      driftSpeedRef.current.forEach((speed, id) => {
        if (speed > DRIFT_SPEED * 1.5) driftSpeedRef.current.set(id, speed * 0.97);
      });

      rafRef.current = requestAnimationFrame(runPhysics);
    };

    cy.on("layoutstop", () => {
      setReady(true);
      rafRef.current = requestAnimationFrame(runPhysics);

      // Auto-focus a person if deep-linked from their dossier
      if (focusPerson) {
        const node = cy.getElementById(focusPerson.name);
        if (node.length) {
          cy.elements().removeClass("selected neighbor faded active");
          node.addClass("selected");
          const edges = node.connectedEdges();
          const nbrs  = node.neighborhood("node") as any;
          cy.elements().not(node as any).not(edges).not(nbrs).addClass("faded");
          edges.addClass("active");
          nbrs.addClass("neighbor");

          // Force Cytoscape to re-measure the container (dimensions may have settled
          // after React's render), fit everything into view, then shift the viewport
          // left so the graph lives in the visible area (sidebar takes the right side).
          cy.resize();
          cy.fit(undefined, 60);
          cy.panBy({ x: -SIDEBAR_W / 2, y: 0 });

          sidebarOpenRef.current = true;
          prevSelOpen.current = true;
          setSel({
            type: "node",
            person: focusPerson,
            connections: connMap.get(focusPerson.name) ?? [],
          });
        }
      }
    });

    // Reset: zero velocities + reset drift + fit view
    resetRef.current = () => {
      velRef.current.forEach(v => { v.vx = 0; v.vy = 0; });
      cy.nodes().forEach(n => {
        const id = n.id();
        driftPhaseRef.current.set(id, Math.random() * Math.PI * 2);
        driftSpeedRef.current.set(id, DRIFT_SPEED * (0.6 + Math.random() * 0.8));
      });
      cy.fit(undefined, 50);
      cy.elements().removeClass("selected neighbor faded active");
      setSel(null);
    };

    // ── Drag → boost vorticity ────────────────────────────────────────────────
    cy.on("grab", "node", evt => {
      draggingRef.current.add(evt.target.id());
    });
    cy.on("drag", "node", evt => {
      // Speed up drift angle for dragged node — more agitation = faster drift
      const id = evt.target.id();
      const speed = driftSpeedRef.current.get(id) ?? DRIFT_SPEED;
      driftSpeedRef.current.set(id, Math.min(speed * 1.04, DRIFT_SPEED * 6));
    });
    cy.on("free", "node", evt => {
      const id = evt.target.id();
      draggingRef.current.delete(id);
      // Zero velocity on release so drag energy doesn't cascade
      const v = velRef.current.get(id);
      if (v) { v.vx = 0; v.vy = 0; }
    });

    // ── Node tap → highlight connectors + node sidebar ────────────────────────
    cy.on("tap", "node", evt => {
      const node = evt.target as NodeSingular;
      const name = node.id();
      const person = personMap.get(name);
      if (!person) return;

      cy.elements().removeClass("selected neighbor faded active");
      node.addClass("selected");
      const edges = node.connectedEdges();
      const nbrs  = node.neighborhood("node") as any;
      cy.elements().not(node as any).not(edges).not(nbrs).addClass("faded");
      edges.addClass("active");
      nbrs.addClass("neighbor");

      setSel({ type: "node", person, connections: connMap.get(name) ?? [] });
    });

    // ── Edge tap → pair sidebar ───────────────────────────────────────────────
    cy.on("tap", "edge", evt => {
      const edge = evt.target;
      const aName = edge.source().id();
      const bName = edge.target().id();
      const a = personMap.get(aName), b = personMap.get(bName);
      if (!a || !b) return;
      const classifiers = pairClassifiers.get(`${aName}__${bName}`) ?? [];

      cy.elements().removeClass("selected neighbor faded active");
      cy.elements().addClass("faded");
      edge.removeClass("faded").addClass("active");
      (edge.source() as NodeSingular).removeClass("faded").addClass("selected");
      (edge.target() as NodeSingular).removeClass("faded").addClass("selected");

      setSel({ type: "edge", a, b, classifiers });
    });

    // ── Background tap → reset ────────────────────────────────────────────────
    cy.on("tap", evt => {
      if (evt.target === cy) {
        cy.elements().removeClass("selected neighbor faded active");
        setSel(null);
      }
    });

    cyRef.current = cy;

    // Run layout NOW — after handlers are registered so layoutstop is caught
    cy.layout({
      name: "cose",
      animate: false,
      fit: true,
      padding: 60,
      nodeRepulsion: () => 8000,
      idealEdgeLength: () => SPRING_LEN,
      edgeElasticity: () => 80,
      gravity: 50,
      numIter: 400,
      randomize: false,
    }).run();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cy.destroy();
      cyRef.current = null;
      setReady(false);
    };
  }, [primePairs]);

  // Pan the viewport left/right as sidebar opens/closes so content stays centered
  // in the visible (non-sidebar) area.
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy || !ready) return;
    const isOpen = sel !== null;
    if (isOpen === prevSelOpen.current) return; // content changed but sidebar state didn't
    prevSelOpen.current = isOpen;
    sidebarOpenRef.current = isOpen;
    cy.animate({
      panBy: { x: isOpen ? -SIDEBAR_W / 2 : SIDEBAR_W / 2, y: 0 },
      duration: 260,
      easing: "ease-out",
    } as any);
  }, [sel, ready]);

  // Helper: drill from node sidebar into a specific edge
  const drillEdge = (person: Person, other: Person, classifiers: string[]) => {
    const cy = cyRef.current;
    if (!cy) return;
    const id1 = `${person.name}__${other.name}`;
    const id2 = `${other.name}__${person.name}`;
    const edge = cy.edges(`[id = "${id1}"]`).length
      ? cy.edges(`[id = "${id1}"]`)
      : cy.edges(`[id = "${id2}"]`);

    cy.elements().removeClass("selected neighbor faded active");
    cy.elements().addClass("faded");
    edge.removeClass("faded").addClass("active");
    (edge.source() as NodeSingular).removeClass("faded").addClass("selected");
    (edge.target() as NodeSingular).removeClass("faded").addClass("selected");

    setSel({ type: "edge", a: person, b: other, classifiers });
  };

  const resetGraph = () => {
    cyRef.current?.elements().removeClass("selected neighbor faded active");
    setSel(null);
    // sidebarOpenRef and prevSelOpen updated by the useEffect above
  };

  return (
    <div className="relative w-full h-full" style={{ minHeight: 400 }}>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[0.46rem] tracking-[0.2em] uppercase text-ink-light animate-pulse">
            Mapping connections…
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s" }}
      />

      {ready && (
        <div className="absolute bottom-4 left-4 space-y-1.5">
          <div className="flex items-center gap-2 pointer-events-none">
            <div className="w-6 h-px" style={{ background: THREAD_FAINT }} />
            <span className="font-mono text-[0.37rem] tracking-[0.1em] uppercase text-ink-light">1 shared classifier</span>
          </div>
          <div className="flex items-center gap-2 pointer-events-none">
            <div className="w-6 h-0.5" style={{ background: THREAD_PRIME }} />
            <span className="font-mono text-[0.37rem] tracking-[0.1em] uppercase text-ink-light">4+ shared</span>
          </div>
          <div className="mt-1 flex items-center gap-3">
            <span className="font-mono text-[0.34rem] tracking-[0.08em] text-ink/25 pointer-events-none">
              click node or edge to explore · drag to disturb
            </span>
            <button
              onClick={() => resetRef.current?.()}
              className="font-mono text-[0.34rem] tracking-[0.12em] uppercase text-ink/30 hover:text-red-accent border border-ink/12 hover:border-red-accent/40 px-2 py-1 transition-colors"
            >
              Reset ↺
            </button>
          </div>
        </div>
      )}

      {/* ── Sidebar ── */}
      <AnimatePresence>
        {sel && (
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 w-72 h-full bg-paper/96 border-l border-ink/12 p-6 overflow-y-auto"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <button
              onClick={resetGraph}
              className="absolute top-4 right-4 p-1 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={12} className="text-ink/35" />
            </button>

            {/* ── Node sidebar ── */}
            {sel.type === "node" && (
              <>
                <div className="font-mono text-[0.43rem] tracking-[0.22em] uppercase text-red-accent mb-4">
                  Operative File
                </div>
                <button onClick={() => onSelectPerson(sel.person)} className="w-full text-left group mb-5">
                  <div className="font-mono text-[0.62rem] text-ink group-hover:text-red-accent transition-colors font-medium leading-snug">
                    {sel.person.name}
                  </div>
                  <div className="font-mono text-[0.38rem] tracking-[0.12em] uppercase text-ink-light mt-1">
                    {sel.person.badges[0]} · {sel.person.badges[1]}
                  </div>
                </button>

                <div className="border-t border-ink/10 pt-4">
                  <div className="font-mono text-[0.4rem] tracking-[0.18em] uppercase text-ink-light mb-3">
                    {sel.connections.length} connection{sel.connections.length !== 1 ? "s" : ""}
                  </div>
                  <div className="space-y-3.5">
                    {sel.connections.map(({ other, classifiers }) => (
                      <button
                        key={other.name}
                        onClick={() => drillEdge(sel.person, other, classifiers)}
                        className="w-full text-left group/c"
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="font-mono text-[0.44rem] text-ink/30">↔</span>
                          <span className="font-mono text-[0.52rem] text-ink group-hover/c:text-red-accent transition-colors font-medium">
                            {other.name}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 ml-4">
                          {classifiers.map(c => (
                            <span key={c} className="font-mono text-[0.33rem] tracking-[0.05em] uppercase text-red-accent/65 border border-red-accent/18 px-1.5 py-0.5">
                              {c}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── Edge sidebar ── */}
            {sel.type === "edge" && (
              <>
                <div className="font-mono text-[0.43rem] tracking-[0.22em] uppercase text-red-accent mb-5">
                  Connection Report
                </div>

                <button onClick={() => onSelectPerson(sel.a)} className="w-full text-left group mb-1">
                  <div className="font-mono text-[0.6rem] text-ink group-hover:text-red-accent transition-colors font-medium leading-snug">
                    {sel.a.name}
                  </div>
                  <div className="font-mono text-[0.38rem] tracking-[0.12em] uppercase text-ink-light">
                    {sel.a.badges[0]} · {sel.a.badges[1]}
                  </div>
                </button>

                <div className="flex items-center gap-2 my-3">
                  <div className="flex-1 h-px bg-ink/10" />
                  <span className="font-mono text-[0.6rem] text-red-accent">↔</span>
                  <div className="flex-1 h-px bg-ink/10" />
                </div>

                <button onClick={() => onSelectPerson(sel.b)} className="w-full text-left group mb-5">
                  <div className="font-mono text-[0.6rem] text-ink group-hover:text-red-accent transition-colors font-medium leading-snug">
                    {sel.b.name}
                  </div>
                  <div className="font-mono text-[0.38rem] tracking-[0.12em] uppercase text-ink-light">
                    {sel.b.badges[0]} · {sel.b.badges[1]}
                  </div>
                </button>

                <div className="border-t border-ink/10 pt-4 mb-4">
                  <div className="font-mono text-[0.4rem] tracking-[0.18em] uppercase text-ink-light mb-2">
                    Why it matters
                  </div>
                  <p className="font-mono text-[0.5rem] leading-relaxed text-ink/65">
                    {significance(sel.classifiers)}
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[0.4rem] tracking-[0.18em] uppercase text-ink-light mb-2">
                    Shared terrain — {sel.classifiers.length}
                  </div>
                  <div className="space-y-1">
                    {sel.classifiers.map(c => (
                      <div key={c} className="font-mono text-[0.4rem] tracking-[0.08em] uppercase text-red-accent border border-red-accent/22 px-2 py-1.5">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
