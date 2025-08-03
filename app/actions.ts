"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const firstName = formData.get("first_name")?.toString();
  const lastName = formData.get("last_name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const legalApproved = formData.get("legal");
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !firstName || !lastName) {
    return { error: "Please fill all the fields!" };
  }

  if (!legalApproved) {
    return { error: "Please accept our terms to sign up!" };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return { error: error.message };
  }

  if (data.user?.id) {
      const userId = data.user.id;
  }

  return { success: "Thanks for signing up! Please check your email for a verification link." };
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return { error: "Email is required to reset password!" };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return { error: "Could not reset password" };
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return { success: "Check your email for a link to reset your password." };
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("password-confirm") as string;

  if (!password || !confirmPassword) {
    return {
      error: "Password and confirm password are required",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return {
      error: "Password update failed",
    };
  }

  return {success: "Password successfully updated! Redirecting..."};
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

