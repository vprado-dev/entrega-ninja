export interface TrackingProps {
  descricao: string;
  dtHrCriado: string;
  unidade: {
    endereco: { cidade: string; uf: string };
    tipo: string;
  };
  unidadeDestino?: Record<string, any>;
}

export interface TrackingPropsV2 {
  descricao: string;
  dtHrCriado: string;
  unidade: string;
  unidadeDestino?: string;
}
