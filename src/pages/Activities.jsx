import styles from './Activities.module.css'

const activities = [
  // Paste each group's presentation here as: { name: '...', description: '...' }
]

export default function Activities() {
  if (activities.length === 0) {
    return (
      <div className={styles.page}>
        <h1>Detta händer på stan</h1>
        <p className={styles.placeholder}>Presentationer av årets aktiviteter kommer snart.</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1>Detta händer på stan</h1>
      {activities.map((activity, i) => (
        <article key={i} className={styles.activity}>
          <h2>{activity.name}</h2>
          <p>{activity.description}</p>
        </article>
      ))}
    </div>
  )
}
