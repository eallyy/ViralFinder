'use client'
import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Strong, Text, TextLink } from '@/components/text'
import { signInAction } from '@/app/actions'
import { FormMessage, Message } from "@/components/form-message"
import { useState } from 'react'
import Logo from '@/components/logo'

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Message | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const res: Message = await signInAction(formData);
    setAlert(res);
    setLoading(false);
  }

  return (<>
    <form onSubmit={handleSubmit} method="POST" className="grid w-full max-w-sm grid-cols-1 gap-4">
    { alert ? <FormMessage message={alert} /> : null }
      <div className="flex justify-center">
        <div className="text-center mb-8">
          <Logo />
          <p className="text-gray-600">Kazandıran kadın giyim trendlerini keşfet</p>
        </div>
      </div>
      <Field>
        <Label>Eposta Adresi</Label>
        <Input type="email" name="email" disabled={loading} />
      </Field>
      <Button type="submit" color={loading ? "light" : "violet"} className="w-full" disabled={loading}>
          { loading ?
          <svg className="my-1.5 mx-1.5 size-3 animate-spin" viewBox="0 0 24 24">
            <path d="M19.628 19.628c-2.874 2.874-6.532 4.362-9.931 4.362-2.397 0-4.664-.744-6.438-2.26.119-.861 1.174-6.318 9.039-8.776 6.907-2.157 9.26-6.463 10.053-8.881 2.925 4.339 1.881 10.951-2.723 15.554Zm-7.926-8.582c7.864-2.457 8.919-7.914 9.039-8.776-4.29-3.667-11.469-2.8-16.369 2.102-4.604 4.604-5.648 11.216-2.723 15.554.793-2.417 3.146-6.723 10.053-8.881Z" fill="#000000" opacity="1" data-original="#000000"></path>
          </svg> : <>Giriş Yap</> }
      </Button>
      <div className="flex justify-center">
          <Text>
            © 2024{' '}
            <TextLink href="#">
              <Strong>Trendella</Strong>
            </TextLink>
            . Tüm hakları saklıdır.
          </Text>
      </div>
    </form>
  </>)
}

