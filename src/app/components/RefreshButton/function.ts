'use server'

import { revalidatePath } from 'next/cache'

export async function RefreshButtonFunction() {
  console.log('refreshed?')
  revalidatePath('/')
}
