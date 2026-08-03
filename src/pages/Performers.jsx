import { useState, useEffect } from 'react'
import styles from './Activities.module.css'

export default function Performers() {
  const [performers, setPerformers] = useState([])

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
              list.push({ name, role: item.title })
            }
          }
        }
        setPerformers(list.sort((a, b) => a.name.localeCompare(b.name, 'sv')))
      })
  }, [])

  return (
    <div className={styles.page}>
      <h1>Medverkande</h1>
      {performers.map((p, i) => (
        <article key={i} className={styles.activity}>
          <h2>{p.name}</h2>
          <p>{p.role}</p>
        </article>
      ))}
    </div>
  )
}
