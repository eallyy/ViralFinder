import type { Metadata } from 'next'
import SignInForm from '@/components/sign-in-form';

export const metadata: Metadata = {
  title: "Giriş Yap | Trendella",
  description: "Access your SmartBrew account and discover personalized coffee recipes for every brewing method.",
};

export default async function Login() {
  return (<SignInForm />)
}
