import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

// Server actions for authentication
async function handleSignIn() {
  "use server";
  await signIn("github");
}

async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export default async function Navbar() {
  const session = await auth(); // Fetch authentication session

  return (
    <header className="bg-white px-5 py-3">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={140} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              {/* Logout Button */}
              <form action={handleSignOut}>
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            /* Login Button */
            <form action={handleSignIn}>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}