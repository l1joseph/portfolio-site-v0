export interface Project {
  name: string;
  displayName: string;
  repo: string | null;
  metric: string;
  description: string;
  tags: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: 'evo2_ft',
    displayName: 'Evo2 Fine-Tuning',
    repo: null,
    metric: '40B-param genomic foundation model · AMD MI300A',
    description:
      "Leading fine-tuning of Evo2, a 40B-parameter genomic foundation model, on PacBio HiFi long-read gut metagenomic data for strain-level functional prediction and HGT network reconstruction. Ported BioNeMo training to AMD ROCm on an MI300A HPC cluster. Master's thesis project.",
    tags: ['Python', 'PyTorch'],
    featured: true
  },
  {
    name: 'qupid',
    displayName: 'Qupid',
    repo: 'https://github.com/gibsramen/qupid',
    metric: '11.7% IBD effect-size increase (R² 1.38→1.54) · SD 0.30%→0.02%',
    description:
      'Case-control matching tool for microbiome studies. Demonstrated 11.7% IBD effect size increase in the American Gut Project and 13.5% improvement on HMP2 with dramatically reduced variance. Built with Scikit-Bio and QIIME 2.',
    tags: ['Python', 'Scikit-Bio', 'QIIME 2', 'microbiome', 'statistics'],
    featured: true
  },
  {
    name: 'microbiome_mechinterp',
    displayName: 'q2-mechinterp',
    repo: 'https://github.com/l1joseph/microbiome_mechinterp',
    metric: '96-taxon IBD signature from 3,000+ features',
    description:
      'QIIME2 plugin providing VAE-based mechanistic interpretability for metagenomic and transcriptomic data. Identified a sparse signature of 96 taxa characteristic of IBD from over 3,000 input features. Enables biologically interpretable dimensionality reduction.',
    tags: ['Python', 'QIIME2', 'VAE', 'PyTorch', 'interpretability'],
    featured: true
  },
  {
    name: 'CMPipeline',
    displayName: 'CMPipeline',
    repo: 'https://github.com/l1joseph/CMPipeline',
    metric: '2,000+ cancer samples across CRC, ESCC, and other cancer types',
    description:
      'Nextflow workflow for microbial characterization from cancer sequencing data. Integrated human read filtration with taxonomic profiling via KrakenUniq and MetaPhlAn4. Analyzed samples across colorectal, esophageal squamous cell carcinoma, and other cancer types.',
    tags: ['Nextflow', 'R', 'metagenomics', 'cancer', 'KrakenUniq'],
    featured: true
  },
  {
    name: 'softHRD',
    displayName: 'softHRD',
    repo: 'https://github.com/l1joseph/Multiscale_HRD_Classifier',
    metric: 'AACR Annual Meeting 2026 · UCSD BMES Bioengineering Day 2025',
    description:
      'ML model detecting Homologous Recombination Deficiency from RNA-seq data in breast and ovarian cancer. Autoencoder-based interpretability identifies gene signatures from RNA-seq panels linked to positive patient survival outcomes.',
    tags: ['Python', 'RNA-seq', 'cancer', 'autoencoder', 'clinical ML'],
    featured: true
  },
  {
    name: 'knightGPT',
    displayName: 'knightGPT',
    repo: 'https://github.com/l1joseph/knightGPT',
    metric: 'Citation-grounded RAG over microbiome literature',
    description:
      'Microbiome-specific knowledge graph RAG system. Extracts entities (microbes, genes, metabolites, diseases) and relationships from research literature, enabling semantic querying and citation-grounded answers for metagenomic study design.',
    tags: ['Python', 'Graph-RAG'],
    featured: false
  },
  {
    name: 'cnv_transformer',
    displayName: 'CNV Transformer',
    repo: null,
    metric: '700+ 1000 Genomes samples · outperforms existing WES methods',
    description:
      'Deep learning transformer for copy number variant detection from whole-exome sequencing data. Transfer-learning fine-tuned for somatic CNV calling in cancer samples. Integrates Parascopy for paralog-specific copy number estimation.',
    tags: ['Python', 'transformer', 'CNV', 'WES', 'Parascopy'],
    featured: false
  },
  {
    name: 'asd_microbiome',
    displayName: 'ASD Microbiome Pipeline',
    repo: null,
    metric: 'Co-authored poster · Society for Biological Psychiatry 2025 · Toronto',
    description:
      'Cross-sectional shotgun metagenomics pipeline characterizing microbial composition, diversity, and differential abundances in Autism Spectrum Disorder fecal samples. Integrates BIRDMAn, Qiita, and QIIME2 with ML for pre-clinical diagnostic potential.',
    tags: ['Python', 'metagenomics', 'ASD', 'BIRDMAn', 'QIIME2'],
    featured: false
  }
];
