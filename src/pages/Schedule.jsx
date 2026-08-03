import { useState, useEffect } from 'react'
import styles from './Schedule.module.css'

const STAGE_TYPES = ['Music', 'Talk', 'Panel', 'Opening', 'Culture']
const OTHER_TYPES = ['Social', 'Workshop', 'OpenStage', 'Transition']

function isHappeningNow(item, now) {
  return new Date(item.start) <= now && now < new Date(item.end)
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
}

function formatDay(iso) {
  return new Date(iso).toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' })
}

function groupByDay(items) {
  const groups = {}
  for (const item of items) {
    const day = new Date(item.start).toDateString()
    if (!groups[day]) groups[day] = { label: formatDay(item.start), items: [] }
    groups[day].items.push(item)
  }
  return Object.values(groups).sort((a, b) => new Date(a.items[0].start) - new Date(b.items[0].start))
}

function ItemList({ items, now }) {
  return items.map((item, i) => {
    const active = isHappeningNow(item, now)
    return (
      <div key={i} className={`${styles.item} ${active ? styles.now : ''} ${item.type === 'Music' ? styles.music : ''}`}>
        {active && <span className={styles.nowBadge}>Pågår nu</span>}
        <div className={styles.time}>
          {formatTime(item.start)}–{formatTime(item.end)}
        </div>
        <div className={styles.content}>
          <div className={styles.itemTitle}>{item.title}</div>
          {item.subtitle && <div className={styles.subtitle}>{item.subtitle}</div>}
          <div className={styles.meta}>
            {item.location}{item.speaker ? ` · ${item.speaker}` : ''}
          </div>
        </div>
      </div>
    )
  })
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
  const stageDays = groupByDay(stageItems)
  const otherDays = groupByDay(otherItems)

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <h1>Scenprogram</h1>
        {stageDays.map(day => (
          <section key={day.label} className={styles.day}>
            <h2>{day.label}</h2>
            <ItemList items={day.items} now={now} />
          </section>
        ))}

        {otherDays.length > 0 && (
          <>
            <h1 className={styles.h1Second}>Detta händer också på Sergels torg</h1>
            {otherDays.map(day => (
              <section key={day.label} className={styles.day}>
                <h2>{day.label}</h2>
                <ItemList items={day.items} now={now} />
              </section>
            ))}
          </>
        )}
      </div>
      <div className={styles.imagePanel} />
    </div>
  )
}
