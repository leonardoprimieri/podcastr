import styles from './player.module.scss';

export function Player() {
  return (
    <div className={styles.player}>
      <header>
        <img src="/playing.svg" alt="tocando uma música" />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.songSelection}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer>
        <div className={styles.playerArea}>
          <div className={styles.playerProgress}>
            <span>00:00</span>
            <div className={styles.progress} />
            <span>00:00</span>
          </div>
          <div className={styles.controlButtons}>
            <button type="button">
              <img src="/shuffle.svg" alt="Aleatório" />
            </button>
            <button type="button">
              <img src="/play-previous.svg" alt="Anterior" />
            </button>
            <button type="button" className={styles.playButton}>
              <img src="/play.svg" alt="Tocar" />
            </button>
            <button type="button">
              <img src="/play-next.svg" alt="Próxima" />
            </button>
            <button type="button">
              <img src="/repeat.svg" alt="Repetir" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
