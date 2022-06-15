import Head from 'next/head';
import { HeroCard, AdvertCard, PostCard } from '../components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Graph News - NextJS Project</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <HeroCard />
      <AdvertCard />
      <PostCard />
    </>
  );
}
