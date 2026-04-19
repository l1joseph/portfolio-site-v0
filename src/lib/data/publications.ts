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
    type: 'paper',
    status: 'in-prep',
    title: 'Qupid: Quantitative case-control matching optimization for microbiome studies',
    authors: 'Joseph L, Patel L, Rahman G, Knight R',
    venue: 'in preparation',
    year: 2025
  },
  {
    type: 'paper',
    status: 'in-prep',
    title: 'Evo2 fine-tuning for strain-level prediction and horizontal gene transfer detection',
    authors: 'Joseph L, Kirkland J, Knight R',
    venue: 'in preparation',
    year: 2025
  },
  {
    type: 'paper',
    status: 'in-prep',
    title: 'Gut Microbiome Perturbations and Metagenomic Kynurenine Pathway Enrichment in Early Autism Spectrum Disorder',
    authors: 'Carlson AL, Patel L, Joseph L, Lopez L, Andreason C, Barnes CC, Arias S, Courchesne E, Knight R, Pierce K',
    venue: 'in preparation',
    year: 2025
  },
  {
    type: 'paper',
    status: 'in-prep',
    title: 'q2-mechinterp: Mechanistically Interpretable Feature Engineering for Microbiome Analysis',
    authors: 'Joseph L, Abbasi A, Alexandrov LB, Knight R',
    venue: 'in preparation',
    year: 2025
  },
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
    venue: 'Society for Biological Psychiatry · Toronto, ON',
    year: 2025
  },
  {
    type: 'poster',
    status: 'presented',
    title: 'softHRD: A Machine Learning Approach to Diagnose Homologous Recombination Deficiency in Breast Cancer',
    authors: 'Joseph L, Rahman D, Madakamutil Y, Abbasi A, Bergstrom E, Diaz-Gay M, Alexandrov LB',
    venue: 'UCSD BMES Bioengineering Day · La Jolla, CA',
    year: 2025
  }
];
