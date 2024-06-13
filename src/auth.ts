import NextAuth, { getServerSession } from "next-auth/next"
import Credentials from "next-auth/providers/credentials"

const validUsers = [
  { id: "jane", name: "Jane", roles: ["admin"] },
  { id: "steve", name: "Steve" },
]
function findUser(name?: string | null) {
  return validUsers.find((user) => user.name === name)
}

export const auth = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: {
          placeholder: "Try Steve or Jane",
        },
      },
      authorize: (credentials) => findUser(credentials?.name) || null,
    }),
  ],
  callbacks: {
    session: ({ session }) => ({
      ...session,
      user: findUser(session.user?.name),
    }),
  },
})

export async function getNextAuthUser() {
  const session = await getServerSession()
  return findUser(session?.user?.name)
}
export async function getAuthenticatedUser() {
  const user = await getNextAuthUser()
  if (!user) throw new Error("Not Authenticated")
  return user
}
