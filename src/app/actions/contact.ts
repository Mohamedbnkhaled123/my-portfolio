'use server';

import { contactFormSchema, ContactFormInput } from '@/lib/validations/contact.schema';
import clientPromise from '@/lib/db/mongodb';

export interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitContactForm(data: ContactFormInput): Promise<ActionResult> {
  // 1. Strict Zod Input Validation on Server
  const validatedFields = contactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validation failed. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // 2. Access Cached MongoDB Client Singleton
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    await db.collection('messages').insertOne({
      ...validatedFields.data,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: 'Thank you! Your message has been received.',
    };
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return {
      success: false,
      message: 'An unexpected database error occurred. Please try again later.',
    };
  }
}
