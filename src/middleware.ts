// import { UserRole } from "@prisma/client";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      // `/admin` requires admin role
      console.log({ withAuth: token });
      // if (req.nextUrl.pathname === "/admin") {
      //   return ;
      // } 
      //   // `/me` only requires the user to be logged in
      // return !!token

      return token?.user.role === "admin";
    },
  },
});

export const config = { matcher: ["/","/jadwal-layanan",'/users'] };