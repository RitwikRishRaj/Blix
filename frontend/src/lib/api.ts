const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface CraftRequest {
  element1: string;
  element2: string;
}

export interface CraftResponse {
  result: string | null;
  emoji?: string | null;
  element1: string;
  element2: string;
  success: boolean;
  cached: boolean;
  source?: string | null;
  response_time: number;
}

export interface GameStats {
  total_elements: number;
  total_combinations: number;
  cache_size: number;
  basic_elements: string[];
}

export interface ElementsResponse {
  basic_elements: string[];
  discovered_elements: string[];
  total_combinations: number;
}

export const api = {
  // Craft two elements together
  craft: async (request: CraftRequest): Promise<CraftResponse> => {
    const response = await fetch(`${API_BASE_URL}/craft`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Crafting failed: ${response.statusText}`);
    }

    return response.json();
  },

  // Get game statistics
  getStats: async (): Promise<GameStats> => {
    const response = await fetch(`${API_BASE_URL}/stats`);
    
    if (!response.ok) {
      throw new Error(`Failed to get stats: ${response.statusText}`);
    }

    return response.json();
  },

  // Get all elements
  getElements: async (): Promise<ElementsResponse> => {
    const response = await fetch(`${API_BASE_URL}/elements`);
    
    if (!response.ok) {
      throw new Error(`Failed to get elements: ${response.statusText}`);
    }

    return response.json();
  },

  // Health check
  healthCheck: async (): Promise<{ status: string }> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }

    return response.json();
  },
};