import { useState, useEffect } from 'react'
import styles from './Torg.module.css'

const TIMED_TYPES = ['Social', 'Transition']

const activities = [
  {
    name: 'Framtidsbyn',
    nameDetail: 'kl 14–21',
    description: 'Den 22 augusti tar vi klivet in i framtiden, hela vägen fram till 2045. I vår framtidsby använder vi oss av cirkulär ekonomi för att hushålla med planetens resurser, vi organiserar oss på ett decentraliserat sätt och vi främjar nedväxt för att säkra hälsa, fred, hållbarhet och klimaträttvisa. Där ser vi alla människor som lika värda, skapande och kreativa — därför förespråkar vi folkbildande lärande och kroppsglädje, där människor lär sig med hjälp av alla sinnen. Men inte minst bejakar vi omsorg om varandra och om naturen, samt främjar både kulturell och biologisk mångfald.\n\nVälkomna att besöka den gröna och rättvisa framtid vi längtar efter och engagerar oss i för att skapa, där vi alla ryms inom planetens gränser!',
    subActivities: [
      {
        name: 'Hoppets vimplar',
        description: 'Är c.a hundratals vimplar, skapade av dussintals Rebellmammor, Rebellpappor och allierade på fyrtio olika orter över hela landet. Ända från Piteå till Malmö och från Bohusläns skärgård till Öland och Gotland. Många av dem bär hoppfulla broderade eller ritade budskap som skall påminna oss om det vi värnar om och engagerar oss i.',
      },
      {
        name: 'Portalen',
        description: 'Välkommen 19 år framåt i tiden till år 2045. Här har vi kommit längre i skapandet av den framtid vi önskar till våra nu vuxna barn och till Moder Jord. Biljetter och kartor finns för att vägleda dig i vårt Fred och Framtidsmuseum.',
      },
      {
        name: 'Rebellmammor och Rebellpappor',
        description: 'Sticka, sy, brodera, snacka och lär dig mer om den snabbast växande folkrörelsen. Här kan du hitta vårt manifest och olika material. Kanske hittar du också gemenskap, kraft och mod. Vilka frågor brinner du för? Bidrar du bäst i demonstrationer eller bakom kulisserna? OBS: föräldraskap är inget krav för att kalla sig rebellmamma eller rebellpappa.',
      },
      {
        name: 'Researchers Desk',
        description: 'Forskare med expertis och engagemang vägleder, resonerar och bjuder in till samtal. Du hittar oss vid vårt bord i Framtidsbyn, men även på språng bland alla andra aktiviteter. Du känner igen oss på våra tröjor. Haffa gärna någon av oss för att fråga eller prata om klimatet.',
      },
      {
        name: 'Skogen',
        description: 'Välkommen till vår skogshörna, där du kan få lära dig mer om artkunskap, biologisk mångfald och framtidens skogsbruk. Lär dig om skogens betydelse för samerna, ta del av rörligt material och delta aktivt genom att svara på frågor eller göra egna teckningar av olika arter. Passar både barn och vuxna!',
      },
      {
        name: 'Seglen',
        description: 'När vi seglar tillsammans mot årets val får vi medvind. Våra val skapar våra barns och Moders Jords framtid genom att åka tillsammans mot en ljus framtid! Ett textilt konstverk skapat av Lasse Larsson och Niklas Berg (bilder).',
      },
      {
        name: 'Klimatflaggan',
        description: 'Initiativet i Sverige lanserades av Färnebo folkhögskolan och Latinamerikagrupperna 2017 inför Klimatriksdagen och valet 2018. Bidragen har skapats av folkhögskolekurser, aktivistgrupper och miljörättviseorganisationer. Nu är flaggan drygt 30 meter lång och inspirationen till den kommer från Peru, där en 300 m. Moder Jords flagga till vattnets försvar skapades 2014 inför klimatkonferensen COP20 i Lima.',
      },
      {
        name: 'Barntältet',
        description: 'I barntältet kan du besöka utrotningshotade gosedjur, pyssla, mysa. Du kan också skapa din alldeles egna Rebellnalle och så ett eget frö av hopp att ta med dig hem. Hoppet gror och växer precis som fröet gror och växer till en vacker blomma.',
        sections: [
          {
            title: 'Spilloteket',
            description: 'Kom och bygga hopp-raketer och annat skoj av spill. Spilloteket poppar-up med sin skaparverkstad full av färgsprakande spill-material från jämtländska industrier och välkomnar barn och vuxna att tillverka festliga grejer att vifta med under demonstrationen.\n\nNyfiken på mer om Spilloteket?',
            link: 'https://www.spilloteket.se',
            linkText: 'www.spilloteket.se',
          },
        ],
      },
      {
        name: 'Röda Halsdukar',
        description: 'Inför Sveriges Overshoot Day den 21 april 2024, dagen då vi i Sverige hade förbrukat det årets budget av förnybara resurser, stickade rebellmammor och allierade över hela landet en 4,2 km. lång röd halsduk. Detta för att markera en röd gräns för klimatet och en uppmaning, särskilt till politiker, att agera med kraftfulla åtgärder för att motverka klimatförändringarna. Nu har de röda halsdukarna blivit Rebellmammornas signum.',
      },
      {
        name: 'Kiosken',
        description: 'Besök vår 24-timmarskiosk där barnen införlivar en rättvis och hållbar ekonomisk modell. Byteshandel och gemenskap - och munkar!',
        sections: [
          {
            title: 'Vad är munkekonomi?',
            description: 'Modellen bygger på doughnut economics: social, ekologisk och ekonomisk hållbarhet. En ekonomi inom planetära gränser med en stabil social grund – som en munk!',
            links: [
              { href: 'https://youtu.be/eOztTjypOrg?si=oR-OAbm17SzVMuf7', text: 'Går det att bygga en ekonomi som tar hänsyn till välbefinnande? Samtal mellan Gunilla Berglund och Anna Grönberg' },
              { href: 'https://deareconomy.com/', text: 'deareconomy.com' },
            ],
          },
        ],
      },
      {
        name: 'Tänkartält',
        description: 'I tänkartältet finns plats för eftertanke. Stig på och fundera över allt du upplevt, och undersök dina känslor kring klimatkrisen och den gröna omställningen. Här finns möjlighet att skriva brev till framtiden, att i Sorgelådan lämna bakom dig sådant du inte önskar ta med in i framtiden och att skriva Önskelappar med dina önskningar för 2045 som får pryda Tänkartältets tak.',
        sections: [
          {
            title: 'Psykologer för hållbar utveckling',
            description: 'Här finns klimatpsykologer som kan svara på frågor om hur vi hanterar klimatkänslor och hur vi hanterar beteenden kopplat till klimatet. Tillsammans kan vi samla kraft och genomföra den viktiga omställningen. Inte minst kan vi prata om hur vi kan ta hand om oss själva genom självmedkänsla.',
          },
        ],
      },
      {
        name: 'Ceremoniplats',
        description: 'Vi som tillsammans skapar 24 h värnar om planeten och manar alla att behandla vår natur och omgivning med respekt. Vid ceremoniplatsen finner ni sådant som representerar det vi försvarar: vatten, eld, jord, frön, grenar, blommor, stenar, snäckor, med mera. En slags tacksamhetens plats till Moder Jord och de gåvor som vi får ta del av.',
      },
      {
        name: 'Duvan',
        description: 'En fredsduva lever vidare efter Scouternas firande av kungen på hans 80-årsdag och bärs vidare till Vasaparken för att delta på den stora klimatdemonstrationen. Freden är ständigt aktuell, inte minst i 2045. Konstruerad av Jonas Nyhav.',
      },
      {
        name: 'Reparationscafé',
        description: 'I framtiden är hållbarhet en färdighet vi bygger och gör tillsammans med nål, tråd, information och kunskap. Kom för att laga, dekorera, lära och umgås.',
      },
      {
        name: 'Antirasistisk valstuga',
        description: 'Av konstnärskollektivet Skyddsrummet.\n\nEn oas att vila i när högernationalistiska vindar blåser. I vår mobila tryckverkstad kan du skapa en egen affisch, vimpel eller flagga. Fyll dem med drömmar om en bättre framtid. Hur ser din utopi för 2045 ut?',
      },
      {
        name: 'Hoppets ekosystem',
        description: 'Ett textilt artivistiskt initiativ som lanserades i Latinamerika och sedan förra året slagit rot även i Sverige. Dess avsikt är att med hjälp av återbrukstextilier, nål och tråd väcka naturkänslor hos den som skapar och hos åskådarna, samt hålla hoppet om att det går att påverka vid liv. Samlingen består av broderade och applicerade bonader skapade av miljöengagerade och passionerade, textila artivister över hela landet.',
      },
      {
        name: 'Folkbildningshörna',
        description: 'Folkbildningspedagogiken ser människor som aktiva, skapande varelser som formar samhället. Den tar vara på de olika förmågor och erfarenheter som människor har och involverar både logik och andra sinnen och är därmed en inkluderande grundpelare i ett demokratiskt samhälle. Även om hela 24h. består av folkbildande initiativ, vill vi i denna hörna sätta extra fokus på den och bjuder alla att sätta pränt på era tankar och visioner om folkbildningen.',
      },
      {
        name: 'Klimatklinik',
        description: 'I nutiden finns hälso- och sjukvårdspersonal som möter upp det lidande och sjukdomar som redan nu orsakas av förändrad miljö och klimat men som också blir allt vanligare. Klimatkrisen påverkar också vårdsystemet och vår arbetsmiljö. Med oss har vi aktiva i initiativet KLIMATSJUK som vittnar om hur deras hälsa påverkas av klimatkrisen.\n\nDiskutera med oss hur vi kan förebygga ohälsa och främja hälsa och vilken typ av agerande som har möjlighet att ha effekt. Här finns en mängd aktiviteter att interagera med och tänka utifrån. Välkomna!',
      },
      {
        name: 'Lowtech',
        description: 'På Lowtechs station kan man testa att sy på maskin – med hjälp av en cykel!\n\nÅterbruk av gamla klassiker med smak av morgondagen: upplev hur maskiner drivna av människokraft kan bli en katalysator för förändring!\n\nTrampa med oss och upptäck styrkan i öppen design och lokal kunskap för att bygga roliga och resilienta framtider ihop!\n\nLow-tech Sweden driver lösningar fyllda av hållbarhet, kollektivt motstånd och kulturell transformation. Välkommen!',
        sections: [
          {
            title: 'English',
            description: 'Revisiting old classics with a taste of tomorrow: experience how human-powered machines could act as a catalyst for change!\n\nPedal with us and discover the power of open design and local knowledge to build fun and resilient futures together!\n\nLow-Tech Sweden promotes solutions driven by strong sustainability, collective resilience, and cultural transformation. Join us!',
          },
        ],
      },
      {
        name: 'Kreativ skyltverkstad',
        description: 'Välkommen till en skapande stund med Greenpeace där artivister erbjuder guidning, material och inspiration för att tillsammans skapa det du vill bära med dig i den stora klimatdemonstrationen. En verkstad fylld av kreativitet, gemenskap och handlingskraft.',
      },
      {
        name: 'Kollektiv dikt: I min framtid',
        description: 'Dela dina ord och bli del av den kollektiva dikten "I min framtid". Vill du bidra till ett kollektivt verk? Kom till plattan och bli del av en större berättelse! "I min framtid" är en ständigt växande dikt som samlar in röster om vilken framtid folket av idag drömmer/önskar/kräver. Du kan dela dina ord anonymt eller lämna ditt namn som medförfattare till verket. Dikten kommer att läsas upp av scenpoeten Emma Axberg under lördagsnatten.\n\n"I min framtid" är en del av one eARTh – ett projekt som genom konst, kultur och storytelling lyfter klimatfrågor. Vi omvandlar information till inspiration för att skapa aktion. Projektet genomförs med stöd från Svenska Postkodlotteriets Stiftelse.',
        link: 'https://www.one-earth.se',
        linkText: 'www.one-earth.se',
      },
    ],
    closingTitle: 'Vilka kan du möta i framtidsbyn?',
    closing: 'Förutom värdar på de olika platserna ovan finns outreach som hjälper till att guida i dagen och framtiden. Framtidsbyn befolkas även av allierade med framtidsvisioner och kunskap om bland annat Sapmi, matsystem, boende, litteratur, klimatpsykologi, Latinamerika, demokrati, fred och mänskliga rättigheter.',
  },
]

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
}

export default function Torg() {
  const [timedItems, setTimedItems] = useState([])

  useEffect(() => {
    fetch('schedule.json')
      .then(r => r.json())
      .then(data => setTimedItems(data.filter(i => TIMED_TYPES.includes(i.type))))
  }, [])

  return (
    <div className={styles.wrapper}>
    <div className={styles.page}>
      <h1>På Sergels torg</h1>

      {activities.map((a, i) => (
        <article key={i} className={styles.activity}>
          <h2>
            {a.name}
            {a.nameDetail && <span className={styles.nameDetail}> {a.nameDetail}</span>}
          </h2>
          {a.description && a.description.split('\n\n').map((para, j) => (
            <p key={j}>{para}</p>
          ))}
          {a.subActivities && (
            <div className={styles.subActivities}>
              {a.subActivities.map((sub, j) => (
                <div key={j} className={styles.subActivity}>
                  <h3>{sub.name}</h3>
                  {sub.description && sub.description.split('\n\n').map((para, k) => (
                    <p key={k}>{para}</p>
                  ))}
                  {sub.link && (
                    <a href={sub.link} target="_blank" rel="noopener noreferrer" className={styles.subActivityLink}>
                      {sub.linkText || sub.link}
                    </a>
                  )}
                  {sub.links && sub.links.map((l, k) => (
                    <a key={k} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.subActivityLink}>
                      {l.text || l.href}
                    </a>
                  ))}
                  {sub.sections && sub.sections.map((sec, k) => (
                    <div key={k} className={styles.subSection}>
                      <h4>{sec.title}</h4>
                      {sec.description.split('\n\n').map((para, l) => (
                        <p key={l}>{para}</p>
                      ))}
                      {sec.link && (
                        <a href={sec.link} target="_blank" rel="noopener noreferrer" className={styles.subActivityLink}>
                          {sec.linkText || sec.link}
                        </a>
                      )}
                      {sec.links && sec.links.map((l, m) => (
                        <a key={m} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.subActivityLink}>
                          {l.text || l.href}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {a.closing && (
            <div className={styles.closingBlock}>
              {a.closingTitle && <h3>{a.closingTitle}</h3>}
              <p className={styles.closing}>{a.closing}</p>
            </div>
          )}
        </article>
      ))}

      {timedItems.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Tidssatta aktiviteter</h2>
          {timedItems.map((item, i) => (
            <div key={i} className={styles.timedItem}>
              <span className={styles.time}>{formatTime(item.start)}</span>
              <div>
                <div className={styles.itemTitle}>{item.title}</div>
                {item.subtitle && <div className={styles.subtitle}>{item.subtitle}</div>}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
    <div className={styles.imagePanel} />
    </div>
  )
}
