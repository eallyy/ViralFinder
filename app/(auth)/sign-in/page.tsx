import type { Metadata } from 'next'
import SignInForm from '@/components/sign-in-form';

export const metadata: Metadata = {
  title: "Giriş Yap | Trendella",
};

export default async function Login() {
  return (<SignInForm />)
}
