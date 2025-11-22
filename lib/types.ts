

export type ApiResponse = {
    status: 'success' | 'error'
    message: string;
    checkout_url?: string;
    enrollmentId?: string;
}