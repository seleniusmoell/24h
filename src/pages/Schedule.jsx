import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Schedule.module.css'
import { nameToSlug } from './Performers'

const STAGE_TYPES = ['Music', 'Talk', 'Panel', 'Opening', 'Culture']
const OTHER_TYPES = ['Social', 'Workshop', 'OpenStage', 'Transition']

function isHappeningNow(item, now) {
  return new Date(item.start) <= now && now < new Date(item.end)
}

function formatDay(iso) {
  return new Date(iso).toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' })
}

function formatHour(iso) {
  const h = new Date(iso).getHours()
  return `Från kl ${h}`
}

function groupByDayAndHour(items) {
  const days = {}
  for (const item of items) {
    const date = new Date(item.start)
    const dayKey = date.toDateString()
    const hourKey = date.getHours()
    if (!days[dayKey]) days[dayKey] = { label: formatDay(item.start), hours: {}, date }
    if (!days[dayKey].hours[hourKey]) days[dayKey].hours[hourKey] = { label: formatHour(item.start), items: [], hour: hourKey }
    days[dayKey].hours[hourKey].items.push(item)
  }
  return Object.values(days)
    .sort((a, b) => a.date - b.date)
    .map(day => ({
      ...day,
      hours: Object.values(day.hours).sort((a, b) => a.hour - b.hour)
    }))
}

function ScheduleItem({ item, now }) {
  const [expanded, setExpanded] = useState(false)
  const active = isHappeningNow(item, now)
  const hasDescription = !!item.description

  return (
    <div
      className={`${styles.item} ${active ? styles.now : ''} ${item.type === 'Music' ? styles.music : ''} ${hasDescription ? styles.clickable : ''}`}
      onClick={() => hasDescription && setExpanded(e => !e)}
    >
      {active && <span className={styles.nowBadge}>Pågår nu</span>}
      <div className={styles.content}>
        <div className={styles.itemTitle}>
          {item.title}
          {hasDescription && <span className={styles.chevron}>{expanded ? ' ▲' : ' ▼'}</span>}
        </div>
        {item.subtitle && <div className={styles.subtitle}>{item.subtitle}</div>}
        {item.speaker && <div className={styles.meta}>{item.speaker}</div>}
        {expanded && (
          <div className={styles.description}>
            {item.description}
            {item.speaker && (
              <div className={styles.speakerLinks}>
                {item.speaker.split(',').map(s => s.trim()).map(name => (
                  <Link key={name} to={`/medverkande?person=${nameToSlug(name)}`} className={styles.speakerLink}>
                    Läs mer om {name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Section({ items, now, title }) {
  const days = groupByDayAndHour(items)
  return (
    <>
      <h1 className={styles.sectionTitle}>{title}</h1>
      {days.map(day => (
        <section key={day.label} className={styles.day}>
          <h2>{day.label}</h2>
          {day.hours.map(hourGroup => (
            <div key={hourGroup.hour} className={styles.hourGroup}>
              <h3 className={styles.hourLabel}>{hourGroup.label}</h3>
              {hourGroup.items.map((item, i) => (
                <ScheduleItem key={i} item={item} now={now} />
              ))}
            </div>
          ))}
        </section>
      ))}
    </>
  )
}

export default function Schedule() {
  const [schedule, setSchedule] = useState([])
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    fetch('schedule.json').then(r => r.json()).then(setSchedule)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(interval)
  }, [])

  const stageItems = schedule.filter(i => STAGE_TYPES.includes(i.type))
  const otherItems = schedule.filter(i => OTHER_TYPES.includes(i.type))

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <Section items={stageItems} now={now} title="Scenprogram" />
        {otherItems.length > 0 && (
          <Section items={otherItems} now={now} title="Detta händer också på Sergels torg" />
        )}
      </div>
      <div className={styles.imagePanel} />
    </div>
  )
}
