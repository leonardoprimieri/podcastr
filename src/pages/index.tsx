import { GetStaticProps } from 'next';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import Link from 'next/link';

import styles from '../../styles/home.module.scss';

interface Episode {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
  url: string;
  duration: string;
  durationString: string;
}

interface HomeProps {
  lastEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ lastEpisodes, allEpisodes }: HomeProps) {
  return (
    <section className={styles.homePage}>
      <h1>Ultimos episódios</h1>

      <ul className={styles.lastEpisodes}>
        {lastEpisodes.map((episode) => (
          <li className={styles.episodeItem} key={episode.id}>
            <div className={styles.episodeItemImage}>
              <Image
                width={192}
                height={192}
                objectFit="cover"
                src={episode.thumbnail}
                alt={episode.title}
              />
            </div>
            <div className={styles.episodeItemInfo}>
              <h3>{episode.title}</h3>
              <p>{episode.members}</p>
              <div className={styles.episodeTimeAndDate}>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationString}</span>
                <button>
                  <img src="/play-green.svg" alt="play" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <table cellSpacing={0}>
        <thead>
          <tr>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allEpisodes.map((episode) => {
            <tr key={episode.id}>
              <td>
                <Image
                  src={episode.thumbnail}
                  width="192"
                  height="192"
                  objectFit="cover"
                />
              </td>
              <td>
                <Link href={`episode/${episode.title}`}>
                  <a>{episode.title}</a>
                </Link>
              </td>
              <td>{episode.members}</td>
              <td>{episode.publishedAt}</td>
              <td>{episode.durationString}</td>
              <td>
                <button>
                  <img src="/play-green.svg" alt="play" />
                </button>
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      thumbnail: episode.thumbnail,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      durationString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      duration: Number(episode.file.duration),
      url: episode.file.url,
    };
  });

  const lastEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      lastEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
