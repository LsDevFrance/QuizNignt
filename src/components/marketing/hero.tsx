import Image from "next/image";
import Link from "next/link";
import BlurIn from "../magicui/blur-in";
import Particles from "../magicui/particles";
import { buttonVariants } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="mx-auto flex h-screen  max-w-screen-xl  items-center p-10 ">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 items-center">
        <div>
          <BlurIn
            word="Découvrez les Quiz Ultime."
            className="text-4xl font-bold text-black dark:text-white mb-4"
          />
          <p className=" text-foreground/50 mb-8">
            Testez vos connaissances et amusez-vous avec des milliers de
            questions captivantes! Relevez des défis, apprenez de nouvelles
            choses et mesurez-vous à vos amis pour voir qui est le véritable
            champion du quiz.
          </p>
          <Link className={buttonVariants({ variant: "default" })} href="/">
            Get started for free
          </Link>
        </div>
        <div className="relative m-10 rounded-xl">
          <Image
            src="/quiz.png"
            alt="Hero Image"
            width={500} // Largeur de l'image pour définir le ratio
            height={500} // Hauteur de l'image pour définir le ratio
            // className=" w-full "
          />
        </div>
      </div>
      <Particles className="absolute inset-0" />
    </section>
  );
}
