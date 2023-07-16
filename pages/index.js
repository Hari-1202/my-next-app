import Link from "next/link";

export default function Home() {


  return (
    <div>
      <h1>Welcome to Next.js</h1>
      {["slug1" , "slug2"].map(item => <Link href={`blog/${item}`}>Visit to {item} page</Link>)}
    </div>
  );
}
