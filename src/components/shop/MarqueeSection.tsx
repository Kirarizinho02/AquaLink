import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import avatarsMap from "@/data/marquee-avatars.json";

type Comment = {
  text: string;
  username?: string;
  name?: string;
  avatarUrl?: string;
};

const COMMENTS: Comment[] = [
  { text: "Belíssima ideia!!! 🔥", username:"zapot.oczny", name:"Felipe Zapotoczny" },
  { text: "Muito legal pessoal! Vou querer comprar uma 😃", username:"_milahy_", name: "Camila Augusto" },
  { text: "Parabéns 👏👏", username:"brunocesarfars", name: "Bruno Cesar" },
  { text: "👏👏👏", username:"thurzinn_015", name: "Arthur Hashimoto" },
  { text: "👏👏👏🙌", username:"jeffersonbola2", name: "Jefferson Bola" },
  { text: "Parabéns 👏🏼👏🏼👏🏼👏🏼👏🏼👏🏼", username:"tchu_tonks", name: "Sara Tonks" },
  { text: "muito bom", username: "_itxbia", name: "Beatriz Augusto" },
  { text: "Parabéns!👏🏽👏🏽", username: "j.vitorrr7", name: "João Vitor" },
  { text: "👏🏻", username: "rofermede", name: "Rogéria Fernanda" },
  { text: "🙌", username: "_lucianolima_", name: "Luciano Lima" },
  { text: "👏👏👏👏👏", username: "elisamarochadasilva", name: "Elisama Silva" },
  { text: "Parabéns", username: "val_antoniocoutinho", name: "Valdecy Coutinho" },
];

const COMMENTS_WITH_AVATAR = COMMENTS.map((c) => {
  const key = c.username ?? "";
  const avatarEntry = (avatarsMap as Record<string, { secure_url: string } | undefined>)[key];
  const secureUrl = avatarEntry?.secure_url;

  return {
    ...c,
    avatarUrl: secureUrl
      ? secureUrl.replace(
          "/upload/",
          "/upload/f_auto,q_auto,w_64,h_64,c_thumb,g_face/"
        )
      : undefined,
  };
});

const firstRow = COMMENTS_WITH_AVATAR.slice(0, Math.ceil(COMMENTS_WITH_AVATAR.length / 2));
const secondRow = COMMENTS_WITH_AVATAR.slice(Math.ceil(COMMENTS_WITH_AVATAR.length / 2));

function CommentCard({ c }: { c: Comment }) {
  const hasAvatar = !!c.avatarUrl;
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-white/15 bg-white/60 hover:bg-white/70",
        "dark:border-white/15 dark:bg-black/35 dark:hover:bg-black/30",
        "backdrop-blur-md shadow-sm"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {hasAvatar ? (
          <img
            className="rounded-full size-8 object-cover"
            width={32}
            height={32}
            loading="lazy"
            alt=""
            src={c.avatarUrl}
          />
        ) : (
          <div className="size-8 rounded-full bg-white/30 dark:bg-white/10" aria-hidden />
        )}
        <div className="flex flex-col">
          {/* Nome em cima */}
          <figcaption className="text-sm font-medium text-foreground">
            {c.name ?? ""}
          </figcaption>
          {/* Username embaixo */}
          <p className="text-xs text-muted-foreground">
            {c.username ? `@${c.username.replace(/^@/, "")}` : ""}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-foreground">{c.text}</blockquote>
    </figure>
  );
}

const MarqueeSection = () => {
  return (
    <section className="relative mx-auto max-w-[1880px] px-6 py-8">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s] [--gap:1rem] py-2">
          {firstRow.map((c, i) => (
            <CommentCard key={`row1-${i}`} c={c} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s] [--gap:1rem] py-2">
          {secondRow.map((c, i) => (
            <CommentCard key={`row2-${i}`} c={c} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
};

export { MarqueeSection };
