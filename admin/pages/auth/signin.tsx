import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";

import { NimbusTechLogo } from "../../components/NimbusTechLogo";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { nextAuthOptions } from "../../../session";
import "../../styles/globals.css";

type SignInPageProps = {
  error: string | null;
  callbackUrl: string;
};

type ProviderInfo = {
  id: string;
  name: string;
  type: "oauth" | "credentials";
  imageSrc: string;
};

const providerDefinitions: ProviderInfo[] = [
  {
    id: "cognito",
    name: "Amazon Cognito",
    type: "oauth",
    imageSrc: "https://d1ljophloyhryl.cloudfront.net/assets/amazon.cognito.svg",
  },
];

const DEFAULT_CALLBACK_URL = "/";

const errorMessages: Record<string, string> = {
  AccessDenied:
    "Your account doesn’t have access yet. Reach out to the Nimbus platform team to request permissions.",
  Configuration:
    "Authentication is temporarily unavailable. Please try again shortly.",
  Callback:
    "We were unable to complete the sign-in callback. Retry the last provider or contact support.",
  CredentialsSignIn:
    "We couldn’t verify those credentials. Double-check your email and password.",
  EmailCreateAccountMismatch:
    "The email returned by the identity provider does not match your Nimbus account.",
  OAuthAccountNotLinked:
    "An account already exists with the same email address. Sign in using the original provider to continue.",
  SessionRequired:
    "Please re-authenticate to continue. Your session may have expired.",
  Signin:
    "We hit a snag while signing you in. Give it another go or contact the platform team.",
};

type Highlight = {
  heading: string;
  description: string;
  accent: string;
};

const highlights: Highlight[] = [
  {
    heading: "Unified admin access",
    description:
      "Authenticate once with your organization identity provider and unlock editorial tooling in seconds.",
    accent: "bg-emerald-500/10 text-emerald-400",
  },
  {
    heading: "Enterprise-grade security",
    description:
      "Backed by Amazon Cognito with adaptive MFA, real-time monitoring, and automated auditing.",
    accent: "bg-sky-500/10 text-sky-400",
  },
  {
    heading: "Frictionless workflows",
    description:
      "Pick up drafts, approvals, and scheduled launches with personalized shortcuts for your role.",
    accent: "bg-amber-500/10 text-amber-400",
  },
];

export default function SignInPage({ error, callbackUrl }: SignInPageProps) {
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);

  const providerList = useMemo(() => providerDefinitions, []);
  const oauthProviders = useMemo(
    () => providerList.filter((provider) => provider.type === "oauth"),
    [providerList],
  );
  const credentialProviders = useMemo(
    () => providerList.filter((provider) => provider.type === "credentials"),
    [providerList],
  );

  const resolvedError = error
    ? (errorMessages[error] ?? "Something went wrong. Please try again.")
    : null;

  const handleSignIn = async (providerId: string) => {
    console.log(`Signing in with provider: ${providerId}`);
    setIsSubmitting(providerId);
    try {
      await signIn(providerId, {
        callbackUrl: callbackUrl || DEFAULT_CALLBACK_URL,
      });
    } finally {
      setIsSubmitting(null);
    }
  };

  return (
    <>
      <Head>
        <title>Sign in | Nimbus CMS Console</title>
        <meta
          name="description"
          content="Access the Nimbus CMS console to manage content, workflows, and insights for your organization."
        />
      </Head>

      <main className="relative flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.15),transparent_60%),linear-gradient(140deg,#f8fafc,#e5f4ff)]" />
          <div className="absolute left-1/2 top-1/5 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl sm:h-[22rem] sm:w-[22rem] md:left-2/3 md:top-1/3 md:h-[26rem] md:w-[26rem]" />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-14 lg:flex-row lg:items-center lg:gap-16 xl:px-10">
          <div className="mx-auto w-full max-w-md">
            <Card className="border-slate-200 bg-white text-slate-900 shadow-xl shadow-primary/10">
              <CardHeader className="gap-6">
                <div className="flex flex-col gap-4">
                  <NimbusTechLogo />
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-semibold text-slate-900">
                      Welcome
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Sign in to the Nimbus Tech CMS console to continue
                      publishing, collaborating, and reporting with your team.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {resolvedError && (
                  <>
                    <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                      <p className="font-medium text-rose-600">Heads up</p>
                      <p>{resolvedError}</p>
                    </div>
                    <Separator className="bg-slate-200" />
                  </>
                )}

                {oauthProviders.length > 0 && (
                  <div className="space-y-3">
                    {oauthProviders.map((provider) => (
                      <Button
                        key={provider.id}
                        variant="accent"
                        size="lg"
                        fullWidth
                        disabled={isSubmitting !== null}
                        className="group bg-primary text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 focus-visible:ring-offset-white"
                        onClick={() => handleSignIn(provider.id)}
                      >
                        <span className="flex w-full items-center justify-center gap-3 text-base font-medium">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition group-hover:border-slate-300">
                            <Image
                              src={provider.imageSrc}
                              alt={provider.name}
                              width={24}
                              height={24}
                            />
                          </span>
                          {isSubmitting === provider.id
                            ? "Redirecting…"
                            : `Continue with ${provider.name}`}
                        </span>
                      </Button>
                    ))}
                  </div>
                )}

                {credentialProviders.length > 0 && (
                  <div className="space-y-3">
                    {oauthProviders.length > 0 && (
                      <div className="relative py-2 text-center text-xs uppercase tracking-[0.35em] text-slate-400">
                        <span className="bg-white px-3">or</span>
                        <div className="absolute inset-x-0 top-1/2 -z-10 border-t border-dashed border-slate-300" />
                      </div>
                    )}
                    {credentialProviders.map((provider) => (
                      <Button
                        key={provider.id}
                        variant="outline"
                        size="lg"
                        fullWidth
                        disabled={isSubmitting !== null}
                        className="border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        onClick={() => handleSignIn(provider.id)}
                      >
                        {isSubmitting === provider.id
                          ? "Opening secure form…"
                          : `Use ${provider.name}`}
                      </Button>
                    ))}
                  </div>
                )}

                {providerList.length === 0 && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                    No authentication providers are currently configured. Reach
                    out to the Nimbus platform team to request access.
                  </div>
                )}

                <Separator className="bg-slate-200" />

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
                  Signed out unexpectedly? Session tracking is backed by secure
                  cookies. Clearing browser data or switching devices may
                  require you to authenticate again.
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 text-sm text-slate-600">
                <p className="text-slate-600">
                  Need access? Submit an onboarding request via the Nimbus
                  Service Desk. Invitations are provisioned automatically once
                  approved.
                </p>
                <p className="text-xs text-slate-500/90">
                  By continuing you agree to the Acceptable Use Policy and
                  acknowledge that activity may be monitored for compliance and
                  training purposes.
                </p>
              </CardFooter>
            </Card>
          </div>

          <aside className="mt-10 w-full max-w-xl space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-primary/10 lg:mt-0">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Everything you need to steward content with confidence.
            </h2>
            <ul className="space-y-6">
              {highlights.map(({ heading, description, accent }) => (
                <li
                  key={heading}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-inner shadow-slate-200/70 transition hover:border-slate-300 hover:bg-white"
                >
                  <span
                    className={`mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${accent}`}
                  >
                    ✓
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-slate-900">
                      {heading}
                    </h3>
                    <p className="text-sm text-slate-600">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              <p className="font-medium text-slate-900">Need help?</p>
              <p>
                Visit the Nimbus Trust Center for status updates, or contact
                support@nimbus-tech.de for immediate assistance. We typically
                reply within one business day.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
