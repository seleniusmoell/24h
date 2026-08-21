import { useState } from 'react'
import styles from './Activities.module.css'

const timeSlots = [
  {
    time: '07:00',
    events: [
      { title: 'Yoga med Anna Frenning', note: 'kl. 7.00–7.20' },
    ],
  },
  {
    time: '07:25',
    events: [
      { title: 'Framtidsmeditation med Maria Österholm', note: 'kl. 7.25–7.55' },
    ],
  },
  {
    time: '08:00',
    events: [
      { title: 'Yoga med Anna Frenning', note: 'kl. 8.00–8.20' },
    ],
  },
  {
    time: '08:30',
    events: [
      {
        title: 'Tacksamhetsceremoni med Carmen Blanco Valer, Fatima Osman Abdalla och Elin Bojer',
        note: 'kl. 8.30–9.00',
        description: 'På många platser i världen ses naturen inklusive dess miljöer som levande och därmed värd respekt. Vi vill med denna ceremoni hedra Moder Jord och alla uttryck för liv och ekologisk gemenskap – både mänskliga och icke-mänskliga varelser. Vi vill också hedra dem som bidrog till 24h-manifestationen men inte kunde vara på plats samt alla miljöförsvarare runt om i världen. En central del av ceremonin är intentionen att stärka vår gemenskap och bekräfta vårt engagemang för livet.',
      },
    ],
  },
  {
    time: '09:00',
    events: [
      {
        title: 'Lyssningscirklar för social- och klimaträttvisa med Karin Cecilia Lundberg m.fl.',
        note: 'kl. 9.00–10.30',
        description: 'Lyssningscirklar är ett utrymme där vi möter varandra och provar på att dela och aktivt lyssna till varandras känslor här kopplade till klimatkrisen. Vi utgår från frågan ”Hur känns det?”. Formen för cirklarna bygger på projektet Sustaining All Life’s arbete. Det kommer finnas ett antal facilitatorer på plats som håller i ramarna.',
      },
      {
        title: 'Framtidsworkshop med Henrik Green',
        note: 'kl. 9.00–9.45',
        description: 'Framtiden i en tid av klimatkris är på många sätt skrämmande. Den här workshopen är ett tillfälle att dela farhågor och förhoppningar på ett sätt som kan föra oss närmare varandra genom att berätta för och respektfullt lyssna till varandra. Välkomna!\n\nOm Henrik Green: Klimataktivist på heltid i snart 4 år i olika grupper. Det senaste året har Henrik arbetat allt mer med demokrati och samtal.',
      },
      { title: 'Intro till XR och fredlig aktivism', note: 'kl. 9.00–10.00' },
    ],
  },
  {
    time: '09:15',
    events: [
      {
        title: '(Workshop om) Att vara ung i klimatkrisen',
        note: 'kl. 9.15–10.15',
        description: 'Vi kommer diskutera hur vi påverkas emotionellt och till vardags av att ha hela sitt liv framför sig i klimatkrisens skugga och hur vi vill och kan bemöta det på ett hållbart sätt. Arrangör: Ta tillbaka framtiden, TTF.\n\nSamling 9.10 vid barntältet på konstgräsplanen i Vasaparken.\n\nÅLDERSGRÄNS: Aktiviteten är för unga under 30 år.',
      },
    ],
  },
  {
    time: '09:30',
    events: [
      { title: 'Qigong med Simone Slaviero', note: 'kl. 9.30–9.45' },
    ],
  },
  {
    time: '09:45',
    events: [
      {
        title: 'Skogsbad med Katarina Utne',
        note: 'kl. 9.45–10.30',
        description: 'Katarina är diplomerad skogsbadsguide, och trots namnet handlar skogsbad inte om att bada i en sjö. Under ett skogsbad tar vi istället in naturen med våra sinnen, som en meditation. Forskning visar att tid i naturen får oss att må bättre, och ju mer vi vistas i naturen, desto mer värnar vi också om den.',
      },
    ],
  },
  {
    time: '10:00',
    events: [
      { title: 'Skyltverkstad med Greenpeace', note: 'kl. 10.00–12.00' },
      { title: 'Ansiktsmålning för barn som ska delta i demonstrationen', note: 'kl. 10.00–12.00' },
    ],
  },
  {
    time: '11:00',
    events: [
      { title: 'Workshop med Ploggarna', note: 'kl. 11.00–12.00' },
      {
        title: 'Djurparad!',
        note: 'kl. 11.45',
        description: 'Klä er som djur och marschera för klimatet med oss! Klä ut er, måla en nos eller kanske bara ta med en käpphäst? Vi gör något roligt tillsammans medan barnen övar på att ta plats i det offentliga rummet med sina åsikter. För de som vill går vi gemensamt från Ansiktsmålningen till samlingsplatsen för den stora klimatmarschen.'
      },
    ],
  },
]

function ActivityItem({ event }) {
  const [expanded, setExpanded] = useState(false)
  const hasDescription = !!event.description

  return (
    <div
      className={`${styles.item} ${hasDescription ? styles.clickable : ''}`}
      onClick={() => hasDescription && setExpanded(e => !e)}
    >
      <div className={styles.content}>
        <div className={styles.itemTitle}>
          {event.title}
          {hasDescription && <span className={styles.chevron}>{expanded ? ' ▲' : ' ▼'}</span>}
        </div>
        {event.note && <div className={styles.subtitle}>{event.note}</div>}
        {expanded && (
          <div className={styles.description}>
            {event.description.split('\n\n').map((para, k) => (
              <p key={k}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Activities() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <h1 className={styles.sectionTitle}>Aktiviteter</h1>
        <section className={styles.day}>
          <h2>Söndag 23 augusti, Vasaparken</h2>
          <div className={styles.timeline}>
            {timeSlots.map((slot, i) => (
              <div key={i} className={styles.slot}>
                <div className={styles.time}>{slot.time}</div>
                <div className={styles.events}>
                  {slot.events.map((e, j) => (
                    <ActivityItem key={j} event={e} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className={styles.imagePanel} />
    </div>
  )
}
