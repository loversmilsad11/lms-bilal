"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition, useEffect } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [hasGoogle, setHasGoogle] = useState(false);

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Singed in with Github, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }

  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/providers");
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        setHasGoogle(
          Array.isArray(data.providers) && data.providers.includes("google")
        );
      } catch {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email sent");
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error("Erorr sending email");
          },
        },
      });
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Login with your Github Email Account</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Button
            disabled={githubPending}
            onClick={signInWithGithub}
            className="flex-1 cursor-pointer"
            variant="outline"
          >
            {githubPending ? (
              <>
                <Loader className="size-4 animate-spin " />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <GithubIcon className="size-4" />
                Sign in with GitHub
              </>
            )}
          </Button>

          {hasGoogle && (
            <Button
              disabled={googlePending}
              onClick={signInWithGoogle}
              className="flex-1 cursor-pointer"
              variant="outline"
            >
              {googlePending ? (
                <>
                  <Loader className="size-4 animate-spin " />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span className="mr-2 inline-flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="h-4 w-4"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.9 0 6.6 1.6 8.6 3l6.3-6.3C34.9 3 29.9 1 24 1 14.7 1 6.8 6.9 3.8 15.8l7.4 5.7C12.1 14.2 17.6 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.5 2.6-1.9 4.8-4.1 6.3l6.3 4.9C43.1 37.1 46.5 31.3 46.5 24.5z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M11.3 29.9c-.8-2-1.3-4.1-1.3-6.4s.5-4.4 1.3-6.4L3.8 11.4C1.3 15.6 0 20.1 0 24.5s1.3 8.9 3.8 13.1l7.5-7.7z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 46c6.1 0 11.3-2 15-5.5l-7.4-5.9c-2 1.4-4.7 2.4-7.6 2.4-6.7 0-12.2-4.7-14.1-11.1l-7.5 5.7C6.8 41.1 14.7 46 24 46z"
                      />
                    </svg>
                  </span>
                  Sign in with Google
                </>
              )}
            </Button>
          )}
        </div>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground ">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading... </span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>Continue with Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
