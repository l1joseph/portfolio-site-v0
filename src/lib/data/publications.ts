export interface Publication {
  type: 'paper' | 'poster';
  status: 'in-prep' | 'presented';
  title: string;
  authors: string;
  venue: string;
  year: number;
  url?: string;
}

export const publications: Publication[] = [
  {
    type: 'poster',
    status: 'presented',
    title: 'Leveraging transcriptomic profiles and deep learning to detect homologous recombination deficiency in breast cancer with softHRD',
    authors: 'Joseph L, Rahman D, Madakamutil Y, Abbasi A, Alexandrov LB',
    venue: 'AACR Annual Meeting 2026 · San Diego, CA',
    year: 2026
  },
  {
    type: 'poster',
    status: 'presented',
    title: 'Gut Microbiome Dysbiosis and Metagenomic Kynurenine Pathway Enrichment in Early Autism Spectrum Disorder',
    authors: 'Carlson AL, Patel L, Joseph L, Lopez L, Andreason C, Barnes CC, Arias S, Courchesne E, Knight R, Pierce K',
    venue: 'Biological Psychiatry 97(9):S128 · Society for Biological Psychiatry · Toronto, ON',
    year: 2025,
    url: 'https://scholar.google.com/citations?user=34rn0MAAAAAJ&hl=en'
  }
];
