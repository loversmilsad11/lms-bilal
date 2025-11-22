import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";
import { admin } from "better-auth/plugins"




// eslint-disable-next-line @typescript-eslint/no-explicit-any
const socialProviders: Record<string, any> = {
    github: {
        clientId: env.AUTH_GITHUB_CLIENT_ID,
        clientSecret: env.AUTH_GITHUB_SECRET,
    },
};

if (env.AUTH_GOOGLE_CLIENT_ID && env.AUTH_GOOGLE_SECRET) {
    socialProviders.google = {
        clientId: env.AUTH_GOOGLE_CLIENT_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
    };
}

export function getEnabledSocialProviders() {
    return Object.keys(socialProviders);
}

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders,

    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
                await resend.emails.send({
                    from: 'BilalLMS <onboarding@resend.dev>',
                    to: [email],
                    subject: 'BilalLMS - Verify your email',
                    html: `<p>Your OTP is : <strong>${otp}</strong></p>`
                });
                // implement sending the email to the user
            },
        }),
        admin()
    ],
});