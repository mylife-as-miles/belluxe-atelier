import { Category } from "@prisma/client";

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch('/api/categories', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
