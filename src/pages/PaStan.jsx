import styles from './PaStan.module.css'

const activities = [
  {
    name: 'Vem mördade klimatet?',
    subtitle: 'LAJA-KRIM – avdelningen för organiserad brottslighet',
    location: 'Bacchi Syre, Järntorgsgatan 5, Gamla Stan',
    description: 'LAJA-KRIM – avdelningen för organiserad brottslighet håller löpande presskonferens på Bacchi Syre, Järntorgsgatan 5, Gamla Stan den 21–23 augusti 2026 för att allmänheten ska få kännedom om fallet.',
    days: [
      { label: 'Fredag 21 augusti', times: 'kl 18.00 och 20.00' },
      { label: 'Lördag 22 augusti', times: 'kl 10.00, 13.00, 17.00 och 20.00' },
      { label: 'Söndag 23 augusti', times: 'kl 17.00, i samband med efterfesten för klimatdemonstrationen' },
    ],
  },
]

export default function PaStan() {
  return (
    <div className={styles.page}>
      <h1>På stan</h1>

      {activities.map((a, i) => (
        <article key={i} className={styles.activity}>
          <h2>{a.name}</h2>
          {a.subtitle && <div className={styles.subtitle}>{a.subtitle}</div>}
          <div className={styles.location}>{a.location}</div>
          {a.description && a.description.split('\n\n').map((para, j) => (
            <p key={j}>{para}</p>
          ))}
          {a.days && (
            <div className={styles.days}>
              {a.days.map((d, j) => (
                <div key={j} className={styles.day}>
                  <span className={styles.dayLabel}>{d.label}</span>
                  <span className={styles.dayTimes}>{d.times}</span>
                </div>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  )
}
