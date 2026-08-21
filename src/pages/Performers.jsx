import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './Performers.module.css'

export function nameToSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zåäö0-9-]/g, '')
}

const DESCRIPTIONS = {
  'Andrew Simms': 'Andrew Simms är författare, politisk ekonom och samhällsaktivist. Han tog initiativ till Earth Overshoot Day, var medförfattare till det ursprungliga Green New Deal och var tillsammans med andra med och lanserade förslaget om ett icke-spridningsavtal för fossila bränslen (Fossil Fuel Non-Proliferation Treaty).\n\nHan är meddirektör för New Weather Institute, biträdande chef för Scientists for Global Responsibility samt forskningsanknuten vid University of Sussex.',
  'Vanna Rosenberg': 'Vanna Rosenberg är en mångsidig kulturskapare inom film, teater, barnlitteratur och musik, bl a känd från humorkollektivet Kvarteret Skatan. Hon har skrivit om fantasins kraft i mörka tider och har ett starkt engagemang för barns rätt till trygghet, lek och frihet.',
  'Fatima Osman Abdalla': 'Mamma till Noah, medgrundare av The Real Economy och Kincentric Justice, rektor på Arenaakademin, dansare, medresenär här på jorden, tillhörande Kinani och Hadad-folket från Norra Sudan.',
  'Ellen Schagerström': 'Ellen Schagerström är marinbiolog, dykare och forskare. Hon använder standup för att nå fler målgrupper.',
  'Glenn Bark': 'Glenn Bark är forskare i malmgeologi vid Luleå tekniska universitet och talesperson för forskarnätverket Researchers Desk. Glenn forskade tidigare på hur guldmalmer bildas men forskar numera om lagring av koldioxid i berggrunden och om klimatet för länge sedan.',
  'Tant Grön': 'Tant Grön är ett nystartat band i Växjö bestående av sju rebellmammor i sina bästa år. De spelar egna och andras låtar med fokus på miljö, klimat och samhällsförändring – alltifrån visa till punk.',
  'Fredrika Fabri': 'Fredrika Fabri arbetar som läkare inom Geriatrik, och talar i egenskap av representant för HSXR (Hälso- och sjukvårdspersonal för Extinction Rebellion) kring kopplingen mellan hälsa, sjukvård och klimat.',
  'Carmen Blanco Valer': 'Carmen Blanco Valer, folkhögskolelärare med urfolksbakgrund, arbetar på Färnebo fhsk. och är engagerad i globala rättvisefrågor, miljö- och klimaträttvisa samt textil artivism.',
  'Staffan Lindberg': 'AB Världsförbättringar presenterar stolt musikern och koldioxidbantaren Staffan Lindberg som städat atmosfären sedan 2006. Han bjuder på sång och fria fantasier vilka alla vilar tryggt på vetenskaplig grund. Håll till godo!',
  'Saga Gärde': 'Saga Gärde är regissör och skådespelare, verksam inom scenkonst och film, ofta genom dokumentära processer. Hon är utbildad på Stockholms dramatiska teaterhögskola i dokumentärfilm och hennes master vid Teaterhögskolan i Malmö tar sin utgångspunkt i begreppet composed theatre. Hon har gästat skilda scener som Drottningsholms slottsteater, Malmö Konsthall och Backa teater med platsspecifika verk och gjort banbrytande uppsättningar av pjäser av Athena Farrokhzad som Krigerska (2020), Shiatsu (2024) av Dimen Abdulla och Labyrint av Felicia Mulinari på Malmö Stadsteater. Hennes senaste iscensättning av Glömskans arkiv – ett oratorium av tonsättaren Tebogo Monnakgotla (Malmö Konsthall 2023), omnämndes i Aftonbladet som ’en poetisk och musikalisk sensation’. I höst är hon aktuell med Beri bortom bergen som har premiär på Stadsteatern i Vällingby 30 oktober.',
  'Johan Jenny Ehrenberg': 'Johan Jenny Ehrenberg är journalist, debattör och författare. Initiativtagare och projekterare av solparker, Etc el, Etc bygg och tidningen Etc. Rundresande föreläsare om Tillsammansmakt och Hopp.',
  'Catarina Rolfsdotter Jansson': 'Catarina Rolfsdotter Jansson är EU Climate Pact-ambassadör, programledare och producent på We Don’t Have Time, samt moderator och föreläsare.',
  'Ingmar Rentzhog': 'Ingmar Rentzhog är grundare av We Don’t Have Time.',
  'Leo Rudberg': 'I sin kamp för klimaträttvisa brinner Leo särskilt för samers, flyktingars och queeras mänskliga rättigheter. Han har tidigare varit ordförande för Fältbiologerna och Jordens Vänner.',
  'Lena Granefelt': {
    bio: 'Lena Granefelt är fotograf och fascineras av naturens fantastiska samband, hur ett frö kan bli ett träd, hur mikrolivet och svamparna i jorden skapar förutsättningar för liv. Därför handlar hennes arbete mest om natur, biologisk mångfald, odling och växtkraft i ett gränsland mellan konst och vetenskap. Våren 2026 tilldelades Lena SLU Artdatabankens miljövårdspris för sina banbrytande fotografiska projekt.',
    sections: [
      {
        title: 'Motivering',
        description: 'Genom att förena konstnärlig sensibilitet med ekologisk och botanisk precision har Lena Granefelt skapat en helt egen genre där naturens sköraste och mest förbisedda stadier lyfts fram med värdighet och intensitet. Hennes arbete är en viktig kraft för ökad kunskap och engagemang för biologisk mångfald. SLU Artdatabanken vill genom priset uppmärksamma ett bildskapande som både berör, utbildar och inspirerar till att se naturens värden i hela dess livscykel.',
      },
    ],
  },
  'Julia Lov': 'Julia Lov är artist och låtskrivare. Hon är en människa som tror på omtanke, på solidaritet och på att vi hör ihop. Hon tror på att leva med respekt för både människor och natur och för den värld vi lämnar vidare.',
  'Trabelsi': 'Trabelsi är rappare, låtskrivare och äventyrare som nyligen flyttat hem till Luleå efter över 25 år i USA.',
  'Emil Jensen': 'Alla som sett Emil trollbinda sin publik genom åren har upplevt hans helt unika blandning av musik och poesi, allvar och komik.\n\nEfter sina hyllade Sommarprat och Vinterprat i Sveriges Radio har han de senaste åren turnerat med sina föreställningar genom hela landet, på allt ifrån Dramaten till Way Out West. Hela denna vår har Emil varit ute på en turné med sin nya succéföreställning ”Vi måste hålla kontakten” – om vänskap – som nu fortsätter genom Sverige med extradatum hösten 2026.\n\nHan har fått Nils Ferlin-priset för sitt ordtrolleri, Gustav Fröding-priset för sin lyrik, Evert Taube-priset för sitt låtskrivande, flera miljöpriser och nominerats till Martin Luther King-priset för civilkurage.\n\nHan har släppt åtta rosade album, böcker och ljudböcker, är krönikör på söndagar i ”Godmorgon, världen” i Sveriges Radio där han också hörs återkommande i ”Tankar för dagen”.\n\nSommaren 2022 gjorde Emil en uppmärksammad turné genom Sverige, helt och hållet per cykel, 400 mil med gitarren i lådan, solcellspanel på pakethållaren och 40 uppträdanden med sin föreställning ”Än susar skogen” som inte lämnade någon oberörd. En personlig men stenhårt konkret manifestation för hållbarhet och fred.',
  'Diset': 'Diset är kvartetten från Hägersten vars namn föddes ur en trasig kvarterskrogsskylt – ett band som snabbt har etablerat sig som ett av de mest lovande namnen just nu. Deras musik kännetecknas av drivande gitarrer och dynamiska melodier, där reflekterande texter gör låtarna både storslagna och nära.',
  'Pia Björstrand': 'Pia Björstrand är en advokat som har specialiserat sig på försvar av klimataktivister och som har drivit flera uppmärksammade klimatmål i rätten, senast som en av försvararna i målet mot Återställ Våtmarker i Högsta Domstolen (det s.k. ”Ambulansmålet”).\n\nPia är ordförande för End Ecocide Sweden som arbetar för en internationell lagföring av massförstörelse av miljön. Hon är tidigare talesperson för Klimataktion, har varit ordförande för Naturskyddsföreningen i Nyköping/Oxelösund och är aktiv medlem i Naturskyddsföreningen och Omställning Nyköping.',
  'Majvi Superstar': 'Majvi Superstar är artist, låtskrivare och multiinstrumentalist från Stockholm som länge verkat bakom kulisserna i det svenska musiklivet. Uppvuxen vid pianot med såväl klassisk musik som indisk improvisationsmusik och senare som turnerande musiker och studiomusiker har hon förmodligen stått på de flesta av landets scener.\n\nMen alltid har det egna musikskapandet varit i fokus, om inte för allmänheten så i det egna rummet. Majvi gör genreöverskridande och konstnärlig pop som berör och blandar det sårbara och intima med det storslagna.\n\nFörra året genomförde hon över 20 konserter i eget namn, i Norden, USA och på en soloturné i Italien. Under året har hon även turnerat som musiker med bland annat Waterbaby, Titiyo, Linnea Henriksson och Lykke Li.',
  'Lisa Bydler': 'Lisa Bydler är en frilansande digital strateg, föreläsare och projektledare. Sedan april ingår hon i styrelsen för Klimatriksdagen och är sammankallande för Kommunikationsgruppen.',
  'GÅLMUK': 'GÅLMUK består av Nik och Nilla Märak samt riksspelman Anders Hällström. Under 24h framför de Denna jorda, en norsk folksång.',
  'Ellen Löfgren': 'Ellen Löfgren är engagerad i Ta Tillbaka Framtiden (TTF), som bland annat driver kampanjen Beskatta superrika.',
  'Caroline af Ugglas': 'Caroline af Ugglas är artist och körledare som driver Kör för alla i Stockholm och Uppsala.',
  'Lovad': 'Lova går under artistnamnet ”lovad”. Hon är född och uppvuxen i Tyresö där hon även har hela sin släkt och familj. Lova är en 33-årig kvinna, en syster, en mamma och framför allt någon som genom sin musik vill stå upp för andra och upplysa om problem vi har i omvärlden, vare sig det kommer till psykisk ohälsa eller miljö.',
  'Skyddsrummet': 'Skyddsrummet är ett tvärdisciplinärt konstkollektiv som förenar konst och aktivism med avstamp i feministiska och dekoloniala praktiker för kollektiv omsorg. De skapar platser för möten och gemenskap – mänskliga skyddsrum – i en tid präglad av polarisering, rasism och klimathot. Genom konstnärliga processer utforskar de konstens kraft att föra människor samman, väcka hopp och främja solidaritet. På Framtidsbyn medverkar de med sin antirasistiska valstuga, ett partipolitiskt oberoende konstprojekt som utforskar grafiska trycktekniker som demokratiskt medel. På en lådcykel utrustad med grafikpress får alla möjlighet att trycka sin egen valaffisch eller utopi.\n\nSkyddsrummet består av Sissela Nordling Blanco, Dijle Neva Yiğitbaş och Sarasvati Shrestha.',
  'Barbara Hendricks': 'Barbara Hendricks är född 1948 i Arkansas, USA. Sedan 1977 bor hon i Europa, är svensk medborgare, gift med en svensk och är trebarnsmor samt mormor och farmor.\n\nHendricks studerade till att börja med naturvetenskap och tog en universitetsexamen i matematik och kemi 1969, men fortsatte därefter sina studier på Juilliard School med Jennie Tourel inom ett helt annat ämnesområde — musik — i vilket hon har ytterligare en universitetsexamen.\n\nBarbara Hendricks har uppträtt i mer än 20 olika operaroller på de största operascenerna i världen och har samarbetat med musikvärldens största orkestrar och dirigenter som Karajan, Giulini, Solti, Bernstein m.fl. Hendricks har medverkat i ett antal operafilmer: La Bohème och SVT:s Rucklarens väg.\n\nHon har hyllats som en av sin generations mest framstående uttolkare av tyska lieder och franska sånger och är också känd som en ledande uttolkare av amerikansk och skandinavisk musik. Sedan 1990 är hon medlem av Kungl. Musikaliska Akademien i Sverige.\n\nHon gjorde sin jazzdebut vid jazzfestivalen i Montreux 1994 och har sedan dess uppträtt regelbundet vid stora jazzfestivaler över hela världen tillsammans med Monty Alexander, Ed Thigpen och Ira Coleman, Magnus Lindgren Quartet och numera Barbaras Blues Band med Mathias Algotsson, Max Schultz och Ulf Englund.\n\nDet är dock inte bara inom musikområdet som Barbara Hendricks är internationellt verksam. 1998 grundade hon Barbara Hendricks Stiftelse för fred och försoning för att sätta namn på sin kamp för att förhindra konflikter i världen och för att underlätta försoning och varaktig fred i konfliktdrabbade regioner. Hon är FN:s flyktingorgan UNHCR:s enda hedersambassadör på livstid. Sedan 1987 besöker hon flyktingläger i krisdrabbade områden i den funktionen. Hon är nu hedersordförande/ledamot och var från 2004 till 2009 ordförande för UNHCR:s insamlingsstiftelse i Sverige.\n\nHendricks har gjort mer än 100 skivinspelningar och har sålt mer än 14 miljoner album. Sedan 2006 driver hon sitt eget skivbolag, Arte Verum.\n\nÅr 2010 utkom hennes självbiografi Ma Voie på franska, år 2012 Min röst (Leopard förlag) i Sverige, 2013 på spanska En propio voz och 2014 på engelska Lifting My Voice.\n\nBarbara Hendricks har mottagit otaliga utmärkelser för sina konstnärliga och humanitära insatser, bland annat H.M. Konungens medalj i 12:e storleken 2014.\n\nÅr 1986 utnämnde Frankrikes regering Barbara Hendricks till Commandeur des Arts et des Lettres och 1993 tilldelades hon rang av Chevalier de la Légion d’Honneur av president François Mitterrand. 2024 befordrades hon till Commandeur de la Légion d’Honneur av president Emmanuel Macron.\n\nPrince of Asturias Foundation’s Award for the Arts 2000 (Spanien), som hon erhöll för sitt främjande av mänskliga rättigheter och för det bidrag till mänsklighetens kulturella arv som hennes konstnärliga arbete inneburit.',
}

// People/collectives shown on this page who aren't tied to a scheduled speaker slot.
const EXTRA_PERFORMERS = [
  { name: 'Skyddsrummet', role: 'Konstkollektiv' },
]

export default function Performers() {
  const [performers, setPerformers] = useState([])
  const [searchParams] = useSearchParams()
  const target = searchParams.get('person')
  const scrolledRef = useRef(false)

  useEffect(() => {
    fetch('schedule.json')
      .then(r => r.json())
      .then(data => {
        const seen = new Set()
        const list = []
        for (const item of data) {
          if (!item.speaker) continue
          for (const name of item.speaker.split(',').map(s => s.trim())) {
            if (!seen.has(name)) {
              seen.add(name)
              list.push({ name, role: item.subtitle || item.title })
            }
          }
        }
        for (const extra of EXTRA_PERFORMERS) {
          if (!seen.has(extra.name)) {
            seen.add(extra.name)
            list.push(extra)
          }
        }
        setPerformers(list.sort((a, b) => a.name.localeCompare(b.name, 'sv')))
      })
  }, [])

  useEffect(() => {
    if (!target || !performers.length || scrolledRef.current) return
    const el = document.getElementById(target)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      scrolledRef.current = true
    }
  }, [target, performers])

  return (
    <div className={styles.page}>
      <h1>Medverkande</h1>
      {performers.map((p, i) => {
        const entry = DESCRIPTIONS[p.name]
        const bio = typeof entry === 'object' ? entry.bio : entry || p.role
        const sections = typeof entry === 'object' ? entry.sections : null
        return (
          <article key={i} id={nameToSlug(p.name)} className={styles.activity}>
            <h2>{p.name}</h2>
            {bio.split('\n\n').map((para, j) => (
              <p key={j}>{para}</p>
            ))}
            {sections && sections.map((sec, j) => (
              <div key={j} className={styles.section}>
                <h3>{sec.title}</h3>
                {sec.description.split('\n\n').map((para, k) => (
                  <p key={k}>{para}</p>
                ))}
              </div>
            ))}
          </article>
        )
      })}
    </div>
  )
}
