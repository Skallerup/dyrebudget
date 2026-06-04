import type { PetType } from "@/types";

export type TreatmentCategory =
  | "Operation"
  | "Forebyggelse"
  | "Undersøgelse"
  | "Tandpleje"
  | "Akut";

export interface Treatment {
  slug: string;
  /** Fuldt navn til H1, fx "Kastration af hund" */
  name: string;
  /** Kort navn til lister, fx "Kastration" */
  shortName: string;
  petType: PetType | "both";
  category: TreatmentCategory;
  priceMin: number;
  priceMax: number;
  /** Intro-afsnit på siden */
  description: string;
  /** Hvad er behandlingen — kort forklaring */
  whatIsIt: string;
  /** Hvad påvirker prisen */
  priceFactors: string[];
  /** Note om forsikringsdækning */
  insuranceNote: string;
  faqs: { question: string; answer: string }[];
}

export const treatments: Treatment[] = [
  {
    slug: "kastration-hund",
    name: "Kastration af hund",
    shortName: "Kastration (hund)",
    petType: "dog",
    category: "Operation",
    priceMin: 2500,
    priceMax: 6000,
    description:
      "Kastration af en hanhund er et af de mest almindelige indgreb hos dyrlægen. Prisen afhænger især af hundens størrelse, da større hunde kræver mere bedøvelse og længere operationstid.",
    whatIsIt:
      "Ved kastration af en hanhund fjernes testiklerne under fuld bedøvelse. Indgrebet tager typisk 20-40 minutter, og hunden kan som regel komme hjem samme dag.",
    priceFactors: [
      "Hundens størrelse og vægt (mere bedøvelse til store hunde)",
      "Geografisk placering — klinikker i hovedstaden er ofte dyrere",
      "Om der bruges laser eller traditionel kirurgi",
      "Efterkontrol, smertestillende og krave",
    ],
    insuranceNote:
      "Kastration er sjældent dækket af en almindelig sygeforsikring, da det betragtes som forebyggende. Nogle udvidede forsikringer giver dog tilskud.",
    faqs: [
      {
        question: "Hvad koster det at kastrere en hanhund?",
        answer:
          "En kastration af en hanhund koster typisk 2.500-6.000 kr. afhængigt af hundens størrelse og klinik. Store hunde ligger i den høje ende pga. mere bedøvelse.",
      },
      {
        question: "Dækker forsikringen kastration?",
        answer:
          "Almindelig hundeforsikring dækker normalt ikke kastration, da det regnes som forebyggende. Enkelte udvidede pakker giver delvist tilskud — tjek din police.",
      },
    ],
  },
  {
    slug: "sterilisation-hund",
    name: "Sterilisation af tæve",
    shortName: "Sterilisation (tæve)",
    petType: "dog",
    category: "Operation",
    priceMin: 4000,
    priceMax: 9000,
    description:
      "Sterilisation af en tæve er et større indgreb end kastration af en hanhund, da æggestokke (og evt. livmoder) fjernes gennem bughulen. Det gør operationen dyrere.",
    whatIsIt:
      "Ved sterilisation fjernes æggestokkene — og ofte livmoderen — under fuld narkose. Operationen er mere omfattende og kræver længere restitution end hos hanhunde.",
    priceFactors: [
      "Tævens størrelse og vægt",
      "Om livmoderen også fjernes (ovariohysterektomi)",
      "Bedøvelsestid og overvågning",
      "Smertestillende, krave og efterkontrol",
    ],
    insuranceNote:
      "Som ved kastration dækker forsikringen sjældent planlagt sterilisation. Akut fjernelse af livmoder (livmoderbetændelse) er derimod ofte dækket.",
    faqs: [
      {
        question: "Hvad koster det at sterilisere en tæve?",
        answer:
          "Sterilisation af en tæve koster typisk 4.000-9.000 kr. afhængigt af størrelse og klinik. Det er dyrere end kastration af en hanhund, fordi indgrebet er mere omfattende.",
      },
    ],
  },
  {
    slug: "kastration-kat",
    name: "Kastration af kat",
    shortName: "Kastration (kat)",
    petType: "cat",
    category: "Operation",
    priceMin: 600,
    priceMax: 1400,
    description:
      "Kastration af en hankat er et hurtigt og forholdsvis billigt indgreb. Det anbefales for alle udekatte og reducerer mærkning, slagsmål og strejfen.",
    whatIsIt:
      "Hankattens testikler fjernes under kort fuld bedøvelse. Indgrebet tager få minutter, og katten er typisk klar til at komme hjem samme dag.",
    priceFactors: [
      "Klinik og geografisk placering",
      "Om bedøvelse og smertestillende er inkluderet",
      "Eventuel blodprøve inden bedøvelse",
    ],
    insuranceNote:
      "Kastration af kat dækkes normalt ikke af forsikringen, men er en relativt lille engangsudgift.",
    faqs: [
      {
        question: "Hvad koster det at kastrere en hankat?",
        answer:
          "Kastration af en hankat koster typisk 600-1.400 kr. Det er et hurtigt indgreb og en af de billigste operationer hos dyrlægen.",
      },
    ],
  },
  {
    slug: "sterilisation-kat",
    name: "Sterilisation af hunkat",
    shortName: "Sterilisation (kat)",
    petType: "cat",
    category: "Operation",
    priceMin: 1200,
    priceMax: 2800,
    description:
      "Sterilisation af en hunkat er et bugindgreb og derfor dyrere end kastration af en hankat. Det forhindrer uønskede killinger og reducerer risiko for livmoderbetændelse.",
    whatIsIt:
      "Æggestokkene fjernes under fuld narkose gennem et lille snit i bughulen. Katten skal holdes i ro nogle dage efter.",
    priceFactors: [
      "Klinik og geografisk placering",
      "Bedøvelsestid og overvågning",
      "Smertestillende og efterkontrol",
    ],
    insuranceNote:
      "Planlagt sterilisation dækkes normalt ikke, men akut livmoderbetændelse er ofte dækket af sygeforsikringen.",
    faqs: [
      {
        question: "Hvad koster det at sterilisere en hunkat?",
        answer:
          "Sterilisation af en hunkat koster typisk 1.200-2.800 kr. Det er dyrere end kastration af en hankat, fordi det er et bugindgreb.",
      },
    ],
  },
  {
    slug: "tandrensning-hund",
    name: "Tandrensning af hund",
    shortName: "Tandrensning (hund)",
    petType: "dog",
    category: "Tandpleje",
    priceMin: 2000,
    priceMax: 6000,
    description:
      "Professionel tandrensning hos hund kræver fuld bedøvelse, hvilket er den store udgift. Tandsten og tandkødsbetændelse er meget almindeligt og kan føre til tab af tænder.",
    whatIsIt:
      "Tænderne renses for tandsten med ultralyd og poleres, mens hunden er i fuld narkose. Løse eller betændte tænder kan trækkes ud i samme omgang.",
    priceFactors: [
      "Bedøvelse er den største post",
      "Antal tænder der skal trækkes ud",
      "Hundens størrelse",
      "Røntgen af tænder hvis nødvendigt",
    ],
    insuranceNote:
      "Tandrensning som forebyggelse dækkes sjældent, men behandling af tandsygdom kan være dækket på udvidede policer med tandtillæg.",
    faqs: [
      {
        question: "Hvad koster en tandrensning hos hund?",
        answer:
          "En professionel tandrensning af hund koster typisk 2.000-6.000 kr. inkl. bedøvelse. Prisen stiger hvis tænder skal trækkes ud.",
      },
    ],
  },
  {
    slug: "tandrensning-kat",
    name: "Tandrensning af kat",
    shortName: "Tandrensning (kat)",
    petType: "cat",
    category: "Tandpleje",
    priceMin: 1800,
    priceMax: 4500,
    description:
      "Katte er særligt udsatte for tandkødsbetændelse og tandresorption. Tandrensning kræver bedøvelse, og det er ofte nødvendigt at fjerne angrebne tænder.",
    whatIsIt:
      "Tænderne renses og poleres under fuld narkose. Hos katte er det ofte nødvendigt at trække smertefulde, angrebne tænder ud.",
    priceFactors: [
      "Bedøvelse og overvågning",
      "Antal tænder der skal trækkes ud",
      "Tandrøntgen",
    ],
    insuranceNote:
      "Tandbehandling ved sygdom kan være dækket med tandtillæg. Ren forebyggende rensning dækkes typisk ikke.",
    faqs: [
      {
        question: "Hvad koster en tandrensning hos kat?",
        answer:
          "En tandrensning af kat koster typisk 1.800-4.500 kr. inkl. bedøvelse. Udtrækning af angrebne tænder kan øge prisen.",
      },
    ],
  },
  {
    slug: "vaccination-hund",
    name: "Vaccination af hund",
    shortName: "Vaccination (hund)",
    petType: "dog",
    category: "Forebyggelse",
    priceMin: 400,
    priceMax: 900,
    description:
      "Den årlige vaccination beskytter mod alvorlige sygdomme som hundesyge, parvovirus og smitsom leverbetændelse. Mange klinikker kombinerer vaccination med et sundhedstjek.",
    whatIsIt:
      "Hunden får et kombinationsstik, typisk hvert 1.-3. år afhængigt af sygdom. Konsultationen inkluderer ofte et generelt helbredstjek.",
    priceFactors: [
      "Hvilke vacciner der gives (kennelhoste, rabies m.m.)",
      "Om et sundhedstjek er inkluderet",
      "Klinik og geografi",
    ],
    insuranceNote:
      "Vaccination er forebyggende og dækkes normalt ikke af sygeforsikringen, men kan indgå i en sundhedsabonnement-ordning hos klinikken.",
    faqs: [
      {
        question: "Hvad koster en vaccination af hund?",
        answer:
          "En årlig vaccination af hund koster typisk 400-900 kr. afhængigt af hvilke vacciner der gives, og om et sundhedstjek er inkluderet.",
      },
    ],
  },
  {
    slug: "vaccination-kat",
    name: "Vaccination af kat",
    shortName: "Vaccination (kat)",
    petType: "cat",
    category: "Forebyggelse",
    priceMin: 350,
    priceMax: 800,
    description:
      "Katte vaccineres mod kattesyge og katteinfluenza. Udekatte anbefales ofte yderligere vaccination mod leukæmivirus (FeLV).",
    whatIsIt:
      "Katten får et kombinationsstik, typisk årligt. Konsultationen omfatter som regel et kort helbredstjek.",
    priceFactors: [
      "Inde- eller udekat (udekatte anbefales flere vacciner)",
      "Om sundhedstjek er inkluderet",
      "Klinik og geografi",
    ],
    insuranceNote:
      "Vaccination dækkes normalt ikke af sygeforsikringen, da det er forebyggende.",
    faqs: [
      {
        question: "Hvad koster en vaccination af kat?",
        answer:
          "En vaccination af kat koster typisk 350-800 kr. Udekatte har ofte brug for ekstra vaccination mod leukæmivirus, hvilket øger prisen.",
      },
    ],
  },
  {
    slug: "dyrlaegekonsultation",
    name: "Dyrlægekonsultation",
    shortName: "Konsultation",
    petType: "both",
    category: "Undersøgelse",
    priceMin: 400,
    priceMax: 750,
    description:
      "En almindelig konsultation er udgangspunktet for de fleste dyrlægebesøg. Prisen dækker dyrlægens tid og en grundlæggende klinisk undersøgelse — ikke prøver eller behandling.",
    whatIsIt:
      "Dyrlægen undersøger dyret klinisk, lytter til hjerte og lunger, tjekker temperatur og vurderer symptomer. Yderligere prøver og behandling kommer oveni.",
    priceFactors: [
      "Almindelig vs. akut/aften-konsultation",
      "Klinik og geografisk placering",
      "Om det er en specialist eller dyrehospital",
    ],
    insuranceNote:
      "Konsultation ved sygdom eller skade er normalt dækket af sygeforsikringen (efter selvrisiko). Rutinetjek dækkes ikke.",
    faqs: [
      {
        question: "Hvad koster et dyrlægebesøg?",
        answer:
          "En almindelig dyrlægekonsultation koster typisk 400-750 kr. Akutte besøg uden for åbningstid er markant dyrere — ofte 1.000-2.000 kr.",
      },
    ],
  },
  {
    slug: "roentgen",
    name: "Røntgen hos dyrlæge",
    shortName: "Røntgen",
    petType: "both",
    category: "Undersøgelse",
    priceMin: 800,
    priceMax: 2500,
    description:
      "Røntgen bruges til at undersøge knogler, led, lunger og fremmedlegemer. Prisen afhænger af antal optagelser og om dyret skal bedøves for at ligge stille.",
    whatIsIt:
      "Der tages billeder af det relevante område. Urolige dyr eller optagelser af led/hofter kræver ofte let bedøvelse, hvilket øger prisen.",
    priceFactors: [
      "Antal optagelser",
      "Om bedøvelse er nødvendig",
      "Tolkning af specialist",
    ],
    insuranceNote:
      "Røntgen i forbindelse med sygdom eller skade er normalt dækket af sygeforsikringen efter selvrisiko.",
    faqs: [
      {
        question: "Hvad koster røntgen hos dyrlægen?",
        answer:
          "Røntgen koster typisk 800-2.500 kr. afhængigt af antal optagelser, og om dyret skal bedøves for at ligge stille.",
      },
    ],
  },
  {
    slug: "blodproeve",
    name: "Blodprøve hos dyrlæge",
    shortName: "Blodprøve",
    petType: "both",
    category: "Undersøgelse",
    priceMin: 500,
    priceMax: 1800,
    description:
      "Blodprøver bruges til at vurdere organfunktion, infektioner og før bedøvelse. Prisen afhænger af, hvor omfattende analysen er.",
    whatIsIt:
      "Der tages en blodprøve, som analyseres enten på klinikken eller på et eksternt laboratorium. Et fuldt panel koster mere end en enkelt værdi.",
    priceFactors: [
      "Antal værdier/paneler der analyseres",
      "Internt vs. eksternt laboratorium",
      "Hasteanalyse",
    ],
    insuranceNote:
      "Blodprøver som led i udredning af sygdom er normalt dækket efter selvrisiko.",
    faqs: [
      {
        question: "Hvad koster en blodprøve hos dyrlægen?",
        answer:
          "En blodprøve koster typisk 500-1.800 kr. afhængigt af hvor mange værdier der analyseres, og om det sker på et eksternt laboratorium.",
      },
    ],
  },
  {
    slug: "korsbaandsoperation-hund",
    name: "Korsbåndsoperation hund",
    shortName: "Korsbåndsoperation",
    petType: "dog",
    category: "Operation",
    priceMin: 15000,
    priceMax: 30000,
    description:
      "Overrevet korsbånd er en af de dyreste almindelige skader hos hunde. Operationen udføres ofte af en specialist og kræver omfattende genoptræning.",
    whatIsIt:
      "Det overrevne korsbånd stabiliseres kirurgisk — typisk med TPLO- eller TTA-teknik. Indgrebet kræver specialist, fuld narkose og uger med genoptræning.",
    priceFactors: [
      "Operationsteknik (TPLO er dyrest)",
      "Hundens størrelse",
      "Specialist og dyrehospital",
      "Genoptræning og kontrolrøntgen",
    ],
    insuranceNote:
      "Korsbåndsoperation er normalt dækket af en god sygeforsikring — og er et af de tydeligste eksempler på, hvorfor forsikring kan betale sig. Tjek dog for ventetid og racetillæg.",
    faqs: [
      {
        question: "Hvad koster en korsbåndsoperation på en hund?",
        answer:
          "En korsbåndsoperation koster typisk 15.000-30.000 kr. inkl. specialist, narkose og genoptræning. En enkelt operation overstiger ofte flere års forsikringspræmie.",
      },
      {
        question: "Dækker forsikringen korsbåndsoperation?",
        answer:
          "Ja, en god sygeforsikring dækker normalt korsbåndsoperation efter selvrisiko, forudsat skaden ikke var kendt før forsikringen blev tegnet.",
      },
    ],
  },
  {
    slug: "kejsersnit-hund",
    name: "Kejsersnit hund",
    shortName: "Kejsersnit",
    petType: "dog",
    category: "Akut",
    priceMin: 6000,
    priceMax: 15000,
    description:
      "Kejsersnit kan blive nødvendigt ved fødselskomplikationer — særligt hos racer med store hoveder som fransk bulldog og mops. Akutte indgreb uden for åbningstid er dyrest.",
    whatIsIt:
      "Hvalpene forløses kirurgisk under narkose, når naturlig fødsel ikke er mulig. Indgrebet er akut og kræver hurtig handling.",
    priceFactors: [
      "Akut vs. planlagt",
      "Tidspunkt (aften/nat/weekend er dyrest)",
      "Antal hvalpe og komplikationer",
      "Dyrehospital vs. almindelig klinik",
    ],
    insuranceNote:
      "Kejsersnit er ofte undtaget eller kun delvist dækket — mange forsikringer dækker ikke fødsels­relaterede indgreb. Læs policen grundigt, især ved avl.",
    faqs: [
      {
        question: "Hvad koster et kejsersnit på en hund?",
        answer:
          "Et kejsersnit koster typisk 6.000-15.000 kr. Akutte indgreb om natten eller i weekenden ligger i den høje ende.",
      },
    ],
  },
  {
    slug: "aflivning-hund",
    name: "Aflivning af hund",
    shortName: "Aflivning",
    petType: "both",
    category: "Akut",
    priceMin: 1000,
    priceMax: 4000,
    description:
      "Aflivning er en svær beslutning, og det kan gøre det lettere at kende omkostningerne på forhånd. Prisen afhænger af, om det sker på klinikken eller i hjemmet, og af valg af kremering.",
    whatIsIt:
      "Dyret bedøves og aflives derefter skånsomt af dyrlægen. Bagefter vælger man mellem fælleskremering eller individuel kremering med urne.",
    priceFactors: [
      "På klinik vs. hjemmebesøg",
      "Fælles- vs. individuel kremering",
      "Urne og mindesmærke",
      "Dyrets størrelse",
    ],
    insuranceNote:
      "Selve aflivningen dækkes normalt ikke, men nogle forsikringer udbetaler et mindre beløb ved død. Kremering er en separat udgift.",
    faqs: [
      {
        question: "Hvad koster det at få aflivet sin hund?",
        answer:
          "Aflivning koster typisk 1.000-4.000 kr. inkl. kremering. Hjemmebesøg og individuel kremering med urne ligger i den høje ende.",
      },
    ],
  },
];

export const getTreatmentBySlug = (slug: string): Treatment | undefined =>
  treatments.find((t) => t.slug === slug);

export const treatmentCategories: TreatmentCategory[] = [
  "Operation",
  "Tandpleje",
  "Forebyggelse",
  "Undersøgelse",
  "Akut",
];
