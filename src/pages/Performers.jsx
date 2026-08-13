import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './Performers.module.css'

export function nameToSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zåäö0-9-]/g, '')
}

const DESCRIPTIONS = {
  'Andrew Simms': 'Andrew Simms is an author, political economist and campaigner. He devised Earth Overshoot Day, co-authored the original Green New Deal, and jointly proposed the Fossil Fuel Non Proliferation Treaty. He is co-director of the New Weather Institute, assistant director of Scientists for Global Responsibility, a research associate at the University of Sussex.',
  'Vanna Rosenberg': 'Vanna Rosenberg är en mångsidig kulturskapare inom film, teater, barnlitteratur och musik, bl a känd från humorkollektivet Kvarteret Skatan. Hon har skrivit om fantasins kraft i mörka tider och har ett starkt engagemang för barns rätt till trygghet, lek och frihet.',
  'Fatima Osman Abdalla': 'Mamma till Noah, medgrundare av The Real Economy och Kincentric Justice, rektor på Arenaakademin, dansare, medresenär här på jorden, tillhörande Kinani och Hadad-folket från Norra Sudan.',
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
          <p>{DESCRIPTIONS[p.name] || p.role}</p>
        </article>
      ))}
    </div>
  )
}
