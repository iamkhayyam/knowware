import { Chapter } from "./types";

// Voices mirror /chapters/chNN/interviews/ in the book repo.
// Each chapter has 9 voices, split across Academic / Practitioner / Visionary triads.

export const CHAPTERS: Chapter[] = [
  {
    num: "Ch. 01",
    title: "The Coordination Intelligence Revolution",
    sub: "How ternary thinking unlocks human–AI partnership",
    content: "June 2014. Facebook's emotional contagion experiment — 689,003 users whose News Feeds were secretly manipulated — accidentally revealed that intelligence doesn't live in humans or machines. It emerges in the coordination between them. The opening chapter lays the move from binary optimization to ternary coordination.",
    triads: {
      academic: ["Dr. Paul Pangaro", "Dr. N. Katherine Hayles", "Donella Meadows"],
      practitioner: ["Stewart Brand", "Kevin Kelly", "Yann Minh"],
      visionary: ["Terence McKenna", "Phillip Deere (Lakota Elder)", "Daniel Schmachtenberger"]
    }
  },
  {
    num: "Ch. 02",
    title: "The Dawn of Systems Intelligence",
    sub: "Recognizing the third body",
    content: "Netflix didn't win on content or algorithms. It won by coordinating user behavior, content ecosystem, and algorithm optimization simultaneously. Chapter 2 traces the same pattern from Shannon's information theory through Hartmut Neven's quantum AI lab — binary logic was always an approximation. Reality coordinates.",
    triads: {
      academic: ["Dr. Judea Pearl", "Claude Shannon", "Alan Turing"],
      practitioner: ["Dr. Hartmut Neven", "Former NSA Technical Director (Anonymous)", "Palmer Luckey"],
      visionary: ["Mo Gawdat", "Hunbatz Men", "Ruqian Lu"]
    }
  },
  {
    num: "Ch. 03",
    title: "Architecture of Systems Intelligence",
    sub: "Three-body architecture patterns",
    content: "A building in Barcelona learns. Sensors, AI, and human occupants coordinate in real-time to produce intelligence none of the three could generate alone. Feynman's path integrals reveal that nature doesn't optimize; it coordinates across every possible path. Capra's autopoiesis completes the triad — the architecture of intelligence is the architecture of life.",
    triads: {
      academic: ["Yann LeCun", "Richard Feynman", "James Gosling"],
      practitioner: ["Dario Amodei", "Demis Hassabis", "Clément Delangue"],
      visionary: ["Iain McGilchrist", "Fritjof Capra", "Ray Kurzweil"]
    }
  },
  {
    num: "Ch. 04",
    title: "Systems Intelligence in Action",
    sub: "Ternary coordination case studies",
    content: "Bogotá, 1998. A dying city — homicides at 80 per 100,000, two-hour commutes. Mayor Peñalosa didn't build infrastructure. He coordinated infrastructure with citizen behavior with political vision, and the city healed. Chapter 4 tests whether three-body coordination survives contact with reality: cities, markets, medicine, antifragility.",
    triads: {
      academic: ["Carlo Ratti", "Eric Topol", "Andrew Lo"],
      practitioner: ["Dan Doctoroff", "Linda Raschke", "Quant/HFT Savant (Anonymous)"],
      visionary: ["Sarah Rossbach", "Caroline Myss", "Nassim Taleb"]
    }
  },
  {
    num: "Ch. 05",
    title: "Human–Systems Intelligence Interaction",
    sub: "Ternary human–AI collaboration patterns",
    content: "Ian Burkhart, paralyzed, plays Guitar Hero with his thoughts — brain signals coordinated through a neural interface with muscle stimulation. The boundary between human and machine is already dissolving. The question isn't whether to cross it, but how to coordinate the crossing.",
    triads: {
      academic: ["Dr. Miguel Nicolelis", "Dr. Alex Pentland", "Dr. Shannon Vallor"],
      practitioner: ["Dr. Thomas Oxley", "Tristan Harris", "Jimmy Wales"],
      visionary: ["BCI User (Anonymous)", "Thich Nhat Hanh Foundation", "Donna Haraway"]
    }
  },
  {
    num: "Ch. 06",
    title: "Consciousness as Pattern Recognition",
    sub: "Perception · processing · awareness",
    content: "October 2018, Tempe. A self-driving Uber detects Elaine Herzberg 5.6 seconds before impact and classifies her as 'unknown object,' then 'vehicle,' then 'bicycle.' It never classifies her as 'pedestrian.' The car had perception and processing but lacked the third body: awareness. Wiener warned of this for sixteen years.",
    triads: {
      academic: ["Stuart Russell", "Dr. Timnit Gebru", "Kate Crawford"],
      practitioner: ["Norbert Wiener", "Margaret Mitchell", "In-Q-Tel Operator (Anonymous)"],
      visionary: ["Sir Roger Penrose", "Antonio Damasio", "Rupert Sheldrake"]
    }
  },
  {
    num: "Ch. 07",
    title: "Engineering Reality",
    sub: "Pattern development and quantum systems",
    content: "Autodesk's generative AI designs an Airbus partition 45% lighter than the human version — alien curves no engineer would imagine, yet structurally superior. Three-body coordination doesn't just improve engineering. It transcends the design space itself, producing solutions outside the boundaries of human imagination.",
    triads: {
      academic: ["Dr. John Preskill", "Seth Lloyd", "Chip Huyen"],
      practitioner: ["Jeff Dean", "Dr. Lisa Su", "Wendell Weeks"],
      visionary: ["Neri Oxman", "DARPA Operator (Anonymous)", "Dr. Fei-Fei Li"]
    }
  },
  {
    num: "Ch. 08",
    title: "Beyond Human Intelligence",
    sub: "Cosmic three-body dynamics",
    content: "Apollo navigated 240,000 miles to a moving target with 4KB of RAM — less than a modern digital watch — by coordinating human judgment with computer calculation with physical reality. Ramanujan's mathematical intuition arrived from a source he could not explain. What does intelligence look like at cosmic scale?",
    triads: {
      academic: ["Dr. Max Tegmark", "Dr. Nick Bostrom", "Dr. Jill Tarter"],
      practitioner: ["Dr. Sara Seager", "Dr. David Chalmers", "Anil Seth"],
      visionary: ["Liu Cixin", "Dr. Thomas Nagel", "Srinivasa Ramanujan"]
    }
  },
  {
    num: "Ch. 09",
    title: "No Way? Know-How.",
    sub: "Challenges, barriers, and conscious participation",
    content: "A Stanford AI diagnoses pneumonia at 95% accuracy — better than most radiologists — and gets shut down in six months. Not because it didn't work, but because nobody coordinated the technology with workflow, operations, liability, or trust. Chapter 9 is a sustained confrontation with the barriers that collapse the entire project.",
    triads: {
      academic: ["David Autor", "Kate Raworth", "François Chollet"],
      practitioner: ["Emad Mostaque", "Dr. Fiona Hill", "Peter Senge"],
      visionary: ["Charles Eisenstein", "Sherry Turkle", "MK-Ultra Operator (Anonymous)"]
    }
  },
  {
    num: "Ch. 10",
    title: "The Grand Coordination",
    sub: "Closing the feedback loop · ChX",
    content: "Nine chapters. Eighty-one voices. Systems thinkers and quantum physicists, neuroscientists and urban planners, mystics and engineers — all circling the same insight from different altitudes. The capstone doesn't summarize. It coordinates. The pattern clicks, and you realize it was never hiding; it was waiting for you to develop the eyes.",
    triads: {
      academic: ["Foundation triad (Ch. 1–3)", "Pangaro · Shannon · Feynman", "Physics of coordination"],
      practitioner: ["Application triad (Ch. 4–6)", "Peñalosa · Burkhart · Wiener", "Coordination in the world"],
      visionary: ["Transcendence triad (Ch. 7–9)", "Oxman · Ramanujan · Senge", "Coordination at highest stakes"]
    }
  }
];
