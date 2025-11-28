import { NextResponse } from 'next/server';
import { getEnabledSocialProviders } from '@/lib/auth';

export async function GET() {
    try {
        const providers = getEnabledSocialProviders();
        return NextResponse.json({ providers });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ providers: [] }, { status: 500 });
    }
}

