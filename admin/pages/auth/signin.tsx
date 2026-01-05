import Head from "next/head";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import { NimbusTechLogo } from "../../components/NimbusTechLogo";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import "../../styles/globals.css";

type SignInPageProps = {
  error: string | null;
  callbackUrl: string;
};

const DEFAULT_CALLBACK_URL = "/";

const errorMessages: Record<string, string> = {
  AccessDenied:
    "Access denied. Please contact your administrator.",
  Configuration:
    "Authentication service unavailable. Please try again.",
  Callback:
    "Sign-in failed. Please try again.",
  CredentialsSignIn:
    "Invalid credentials. Please try again.",
  EmailCreateAccountMismatch:
    "Email mismatch. Contact support.",
  OAuthAccountNotLinked:
    "Account already exists. Use original sign-in method.",
  SessionRequired:
    "Session expired. Please sign in again.",
  Signin:
    "Sign-in failed. Please try again.",
};

export default function SignInPage({ error, callbackUrl }: SignInPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resolvedError = error
    ? errorMessages[error] ?? "Something went wrong. Please try again."
    : null;

  const handleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await signIn("cognito", {
        callbackUrl: callbackUrl || DEFAULT_CALLBACK_URL,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | Nimbus CMS</title>
        <meta
          name="description"
          content="Sign in to Nimbus CMS - Bilingual Keystone 6 CMS powering the Nimbus Tech marketing experience"
        />
      </Head>

      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="w-full max-w-4xl space-y-8">
          <Card className="w-full border-none shadow-lg">
            <CardHeader className="space-y-4 text-center">
              <div className="mx-auto mb-4">
                <NimbusTechLogo />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Welcome to Nimbus CMS
              </CardTitle>
              <CardDescription className="text-balance text-slate-600">
                Bilingual Keystone 6 CMS powering the Nimbus Tech marketing experience
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {resolvedError && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <p className="font-medium">Error</p>
                  <p>{resolvedError}</p>
                </div>
              )}

              <div className="flex justify-center">
                <Button
                  className="gap-3 bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  size="lg"
                  disabled={isSubmitting}
                  onClick={handleSignIn}
                >
                  <span className="flex items-center justify-center gap-2">
                    <img
                      src="https://d1ljophloyhryl.cloudfront.net/assets/amazon.cognito.svg"
                      alt="Amazon Cognito"
                      width={20}
                      height={20}
                      className="invert brightness-0"
                    />
                    <span className="font-medium">
                      {isSubmitting ? "Signing in..." : "Sign in with Cognito"}
                    </span>
                  </span>
                </Button>
              </div>

              <div className="text-center text-xs text-slate-500">
                <p>Need access? Contact your administrator</p>
                <p className="mt-1">By signing in, you agree to our terms of service</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                About Nimbus CMS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600">
              <p>
                Nimbus Tech is a Germany-based software consultancy specialising in cloud-native platforms, enterprise architecture, and product delivery. This CMS powers our multilingual marketing website, showcasing our solutions, certifications, testimonials, and lead-generation capabilities.
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900">Core Features</h4>
                  <ul className="space-y-1">
                    <li>• Modern Admin UI with Nimbus Tech branding</li>
                    <li>• Rich content modeling for marketing sections</li>
                    <li>• Multi-language support (English & German)</li>
                    <li>• Amazon Cognito authentication</li>
                    <li>• Dockerised PostgreSQL for development</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900">Technology Stack</h4>
                  <ul className="space-y-1">
                    <li>• Keystone 6 for schema & GraphQL API</li>
                    <li>• Prisma ORM with PostgreSQL</li>
                    <li>• Next.js for Admin UI customizations</li>
                    <li>• NextAuth for session management</li>
                    <li>• Amazon Cognito for authentication</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <h4 className="font-medium text-slate-900">Platform Information</h4>
                <ul className="space-y-1">
                  <li>• Production Database: Neon</li>
                  <li>• Platform as a Service: Heroku</li>
                  <li>• Authentication & Authorization: Amazon Cognito</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:justify-center">
                <a
                  href="https://www.nimbus-tech.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-xs font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                >
                  <FaExternalLinkAlt className="h-4 w-4" />
                  Visit Nimbus Tech Website
                </a>

                <a
                  href="https://github.com/rohit1901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-xs font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  <FaGithub className="h-4 w-4" />
                  View on GitHub
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  return {
    props: {
      error: context.query.error ?? null,
      callbackUrl: context.query.callbackUrl ?? "/",
    },
  };
};
