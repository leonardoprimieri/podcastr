import { useRouter } from 'next/router';

export default function Episode() {
  const params = useRouter();
  return <h1>{params.query.slug}</h1>;
}
