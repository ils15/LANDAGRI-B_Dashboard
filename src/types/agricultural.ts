export interface CropProduction {
  nome: string;
  codigo: string;
  quantidade_produzida_toneladas: Record<string, number>;
  area_colhida_hectares: Record<string, number>;
}

export interface IBGEData {
  metadata: {
    source: string;
    survey: string;
    period_range: string;
  };
  data: {
    producao_agricola: Record<string, CropProduction>;
  };
}

export interface ConabCropCalendar {
  state: string;
  crop: string;
  planting_start: number;
  planting_end: number;
  harvest_start: number;
  harvest_end: number;
  [key: string]: unknown;
}

export interface ConabAvailability {
  state: string;
  crop: string;
  availability: string;
  [key: string]: unknown;
}

export interface ConabSafra {
  safra: string;
  produto: string;
  estado: string;
  area_plantada?: number;
  area_colhida?: number;
  producao?: number;
  rendimento?: number;
  [key: string]: unknown;
}

export interface ConabMappingData {
  [key: string]: unknown;
}
