import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './Performers.module.css'

export function nameToSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zåäö0-9-]/g, '')
}


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
              list.push({ name, role: item.title })
            }
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
      {performers.map((p, i) => (
        <article key={i} id={nameToSlug(p.name)} className={styles.activity}>
          <h2>{p.name}</h2>
          <p>{p.role}</p>
        </article>
      ))}
    </div>
  )
}
