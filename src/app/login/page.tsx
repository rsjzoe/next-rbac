"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Connexion
          </CardTitle>
          <CardDescription className="text-center">
            Entrez vos identifiants pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <MailIcon className="h-4 w-4" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </Label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <LockIcon className="h-4 w-4" />
              </div>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="pl-10"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {/* <Link href="/users" className="w-full"> */}
          <Button
            onClick={() => {
              authClient.signIn.email(
                {
                  /**
                   * The user email
                   */
                  email,
                  /**
                   * The user password
                   */
                  password,
                  /**
                   * A URL to redirect to after the user verifies their email (optional)
                   */
                  callbackURL: "/users",
                  /**
                   * remember the user session after the browser is closed.
                   * @default true
                   */
                  rememberMe: false,
                },
                {
                  onError(context) {
                    console.log(context);
                  },
                  onSuccess(context) {
                    console.log("Connexion réussie", context);
                  },
                  onRequest(context) {
                    console.log("Demande de connexion", context);
                  },
                }
              );
            }}
            className="w-full cursor-pointer bg-primary hover:bg-[#2DD4BF]/90"
          >
            Se connecter
          </Button>
          {/* </Link> */}
        </CardFooter>
      </Card>
    </div>
  );
}
