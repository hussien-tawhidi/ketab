import AllPeopRead from "@/components/home/AllPeopRead";
import FreeBanner from "@/components/home/FreeBanner";
import Hero from "@/components/home/hero/Hero";
import Intro from "@/components/home/Intro";
import LovedByAll from "@/components/home/LovedByAll";
import MostOffer from "@/components/home/MostOffer";
import NewBooks from "@/components/home/NewBooks";
import SelfCare from "@/components/home/SelfCare";
export default function Home() {
  return (
    <main className='bg-ketab-bg'>
      <Hero />
      <div className='md:w-[85%] w-[90%] mx-auto flex flex-col gap-10'>
        <Intro />
        <LovedByAll />
        <NewBooks />
        <SelfCare />
        <MostOffer />
        <FreeBanner />
        <AllPeopRead/>
      </div>
    </main>
  );
}
