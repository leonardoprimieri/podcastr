import styles from './header.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });

  return (
    <header className={styles.header}>
      <section className={styles.headerContent}>
        <section className={styles.logoArea}>
          <img src="/logo.svg" alt="logo" />
          <hr />
          <p>O melhor para você ouvir, sempre</p>
        </section>
        <section className={styles.dateArea}>
          <span>{currentDate}</span>
        </section>
      </section>
    </header>
  );
}
