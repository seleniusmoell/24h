import styles from './Support.module.css'

export default function Support() {
  return (
    <div className={styles.wrapper}>
    <div className={styles.page}>
      <h1>Stöd oss</h1>

      <p className={styles.intro}>
        24h Klimatet är ett ideellt arrangemang anordnat av Rebellmammorna, Rebellpapporna och Researchers' desk. Ditt bidrag gör det möjligt
        att hålla manifestationen levande.
      </p>

      <section className={styles.section}>
        <h2>Vad pengarna går till</h2>
        <ul>
          <li>Scen, ljud och teknik</li>
          <li>Skyltmaterial, banderoller och utsmyckning</li>
          <li>Mat till den gemensamma måltiden</li>
          <li>Resor för medverkande som inte har råd att bekosta sin resa själva</li>
          <li>Juridiskt stöd för aktivister som drabbas av rättsliga konsekvenser</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Så här bidrar du</h2>
        <div className={styles.methods}>
          <div className={styles.method}>
            <span className={styles.label}>Swish</span>
            <span className={styles.value}>123 642 18 53</span>
          </div>
          <div className={styles.method}>
            <span className={styles.label}>Bankgiro</span>
            <span className={styles.value}>499-0230</span>
          </div>
          <div className={styles.method}>
            <span className={styles.label}>Bankkonto</span>
            <span className={styles.value}>Clearing 8327-9 · Konto 814703868-4</span>
          </div>
        </div>
      </section>

      <p className={styles.outro}>Tillsammans skapar vi förändringen.</p>
    </div>
    </div>
  )
}
