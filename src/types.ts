export interface ArtStyle {
  id: string;
  name: string;
  enName: string;
  category: 'traditional' | 'anime' | '3d' | 'classic' | 'scifi' | 'sketch';
  badge: string;
  description: string;
  tags: string[];
  imageUrl: string;
  promptExample: string;
  characteristics: string[];
  palette: string[];
  recommendedAspectRatios: string[];
  modelWeight?: number; // e.g. 0.85
}

export type SelectionMode = 'multiple' | 'single';

export interface GenerationSettings {
  aspectRatio: '1:1' | '4:3' | '16:9' | '9:16';
  quality: 'standard' | 'hd' | 'ultra';
  prompt: string;
  negativePrompt: string;
  styleStrength: number;
}
