import Head from "next/head";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaGithub, FaExternalLinkAlt, FaShieldAlt, FaRocket, FaGlobe } from "react-icons/fa";

import { NimbusTechLogo } from "../../components/NimbusTechLogo";
import { Button } from "../../components/ui/button";
import "../../styles/globals.css";

type SignInPageProps = {
  error: string | null;
  callbackUrl: string;
};

type Feature = {
  icon: IconType;
  title: string;
  description: string;
};

type ExternalLink = {
  href: string;
  label: string;
  icon: IconType;
};

type PlatformDetail = {
  label: string;
  value: string;
};

type SignInPageConfig = {
  meta: {
    title: string;
    description: string;
  };
  branding: {
    title: string;
    subtitle: string;
    features: Feature[];
  };
  links: {
    external: ExternalLink[];
  };
  authentication: {
    provider: string;
    logoUrl: string;
    logoAlt: string;
    buttonText: {
      idle: string;
      loading: string;
    };
    dividerText: string;
  };
  content: {
    heading: string;
    subheading: string;
    errorTitle: string;
    platformDetailsTitle: string;
    platformDetails: PlatformDetail[];
    footer: {
      contactText: string;
      contactEmail: string;
      contactLinkText: string;
      termsText: string;
    };
  };
  errors: {
    messages: Record<string, string>;
    fallback: string;
  };
  defaults: {
    callbackUrl: string;
  };
};

const SIGNIN_CONFIG: SignInPageConfig = {
  meta: {
    title: "Sign In | Nimbus Tech CMS",
    description: "Sign in to Nimbus Tech CMS - Bilingual Keystone 6 CMS powering the Nimbus Tech marketing experience",
  },
  branding: {
    title: "Nimbus Tech CMS",
    subtitle: "Bilingual Keystone 6 CMS powering the Nimbus Tech marketing experience",
    features: [
      {
        icon: FaGlobe,
        title: "Multi-language Support",
        description: "Full English & German content management with seamless translation workflows",
      },
      {
        icon: FaShieldAlt,
        title: "Enterprise Security",
        description: "Amazon Cognito authentication with role-based access control",
      },
      {
        icon: FaRocket,
        title: "Modern Tech Stack",
        description: "Built with Keystone 6, Next.js, Prisma, and PostgreSQL",
      },
    ],
  },
  links: {
    external: [
      {
        href: "https://www.nimbus-tech.de",
        label: "Website",
        icon: FaExternalLinkAlt,
      },
      {
        href: "https://github.com/rohit1901/nt-keystone-cms",
        label: "GitHub",
        icon: FaGithub,
      },
    ],
  },
  authentication: {
    provider: "cognito",
    logoUrl: "https://d1ljophloyhryl.cloudfront.net/assets/amazon.cognito.svg",
    logoAlt: "Amazon Cognito",
    buttonText: {
      idle: "Sign in with Cognito",
      loading: "Signing in...",
    },
    dividerText: "Secure authentication via AWS",
  },
  content: {
    heading: "Welcome back",
    subheading: "Sign in to your account to continue",
    errorTitle: "Authentication Error",
    platformDetailsTitle: "Platform Details",
    platformDetails: [
      { label: "Database:", value: "Neon PostgreSQL" },
      { label: "Hosting:", value: "Heroku" },
      { label: "Auth Provider:", value: "Amazon Cognito" },
    ],
    footer: {
      contactText: "Need access?",
      contactEmail: "admin@nimbus-tech.de",
      contactLinkText: "Contact your administrator",
      termsText: "By signing in, you agree to our terms of service and privacy policy",
    },
  },
  errors: {
    messages: {
      AccessDenied: "Access denied. Please contact your administrator.",
      Configuration: "Authentication service unavailable. Please try again.",
      Callback: "Sign-in failed. Please try again.",
      CredentialsSignIn: "Invalid credentials. Please try again.",
      EmailCreateAccountMismatch: "Email mismatch. Contact support.",
      OAuthAccountNotLinked: "Account already exists. Use original sign-in method.",
      SessionRequired: "Session expired. Please sign in again.",
      Signin: "Sign-in failed. Please try again.",
    },
    fallback: "Something went wrong. Please try again.",
  },
  defaults: {
    callbackUrl: "/",
  },
};

export default function SignInPage({ error, callbackUrl }: SignInPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resolvedError = error
    ? SIGNIN_CONFIG.errors.messages[error] ?? SIGNIN_CONFIG.errors.fallback
    : null;

  const handleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await signIn(SIGNIN_CONFIG.authentication.provider, {
        callbackUrl: callbackUrl || SIGNIN_CONFIG.defaults.callbackUrl,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{SIGNIN_CONFIG.meta.title}</title>
        <meta
          name="description"
          content={SIGNIN_CONFIG.meta.description}
        />
      </Head>

      <main className="flex min-h-screen">
        {/* Left Panel - Dark Branding Section */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
            <div>
              <div className="mb-8">
                <NimbusTechLogo />
              </div>

              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {SIGNIN_CONFIG.branding.title}
              </h1>

              <p className="text-lg text-gray-300 mb-12 leading-relaxed">
                {SIGNIN_CONFIG.branding.subtitle}
              </p>

              <div className="space-y-6">
                {SIGNIN_CONFIG.branding.features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-orange-500/20 rounded-lg">
                        <Icon className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

              <div className="flex gap-3">
                {SIGNIN_CONFIG.links.external.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Sign In Section */}
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 flex justify-center">
              <NimbusTechLogo />
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {SIGNIN_CONFIG.content.heading}
              </h2>
              <p className="text-slate-600">
                {SIGNIN_CONFIG.content.subheading}
              </p>
            </div>

            {resolvedError && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-800">
                      {SIGNIN_CONFIG.content.errorTitle}
                    </h3>
                    <p className="mt-1 text-sm text-red-700">{resolvedError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Button
                fullWidth
                size="lg"
                disabled={isSubmitting}
                onClick={handleSignIn}
                className="bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 focus:ring-offset-2 shadow-sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={SIGNIN_CONFIG.authentication.logoUrl}
                    alt={SIGNIN_CONFIG.authentication.logoAlt}
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                  <span className="font-medium">
                    {isSubmitting
                      ? SIGNIN_CONFIG.authentication.buttonText.loading
                      : SIGNIN_CONFIG.authentication.buttonText.idle}
                  </span>
                </div>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {SIGNIN_CONFIG.authentication.dividerText}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <h4 className="text-sm font-medium text-slate-900 mb-2">
                  {SIGNIN_CONFIG.content.platformDetailsTitle}
                </h4>
                <dl className="space-y-1 text-xs text-slate-600">
                  {SIGNIN_CONFIG.content.platformDetails.map((detail, index) => (
                    <div key={index} className="flex justify-between">
                      <dt>{detail.label}</dt>
                      <dd className="font-medium text-slate-900">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="text-xs text-center text-slate-500">
                {SIGNIN_CONFIG.content.footer.contactText}{" "}
                <a
                  href={`mailto:${SIGNIN_CONFIG.content.footer.contactEmail}`}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  {SIGNIN_CONFIG.content.footer.contactLinkText}
                </a>
              </p>

              <p className="text-xs text-center text-slate-400">
                {SIGNIN_CONFIG.content.footer.termsText}
              </p>
            </div>
          </div>
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
