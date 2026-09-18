
export default function HiddenHeader({ topic }: { topic: string }) {
  return <h1 className="sr-only">{topic}</h1>;
}
