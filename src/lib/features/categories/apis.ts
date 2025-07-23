

// You may want to define a Category type here or use 'any' if you don't have a type

export type Category = {
  id: string;
  name: string;
  slug: string;
  // add other fields as needed
};

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
