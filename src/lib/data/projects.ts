export interface Project {
  name: string;
  displayName: string;
  repo: string;
  metric: string;
  description: string;
  tags: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: 'evo2_ft',
    displayName: 'Evo2 Fine-Tuning',
    repo: 'https://github.com/l1joseph/evo2_ft',
    metric: '40B-parameter genomic foundation model on long-read gut metagenomics',
    description:
      "Leading fine-tuning of Evo2, a 40B-parameter genomic foundation model, on PacBio HiFi long-read gut metagenomic data for strain-level functional prediction and HGT network reconstruction. Ported BioNeMo training to AMD ROCm on an MI300A HPC cluster. Master's thesis project.",
    tags: ['Python', 'PyTorch', 'Evo2', 'ROCm', 'Kubernetes', 'metagenomics'],
    featured: true
  },
  {
    name: 'qupid',
    displayName: 'Qupid',
    repo: 'https://github.com/gibsramen/qupid',
    metric: '11.7% IBD effect-size increase. SD reduced from 0.30% to 0.02%.',
    description:
      'Case-control matching tool for microbiome studies. Built with Scikit-Bio and QIIME 2. Demonstrated 11.7% IBD effect size increase (R² 1.38 to 1.54) in the American Gut Project and 13.5% improvement on HMP2 with dramatically reduced variance.',
    tags: ['Python', 'Scikit-Bio', 'QIIME 2', 'microbiome', 'statistics'],
    featured: true
  },
  {
    name: 'microbiome_mechinterp',
    displayName: 'q2-mechinterp',
    repo: 'https://github.com/l1joseph/microbiome_mechinterp',
    metric: '96-taxon IBD signature identified from 3,000+ input features',
    description:
      'QIIME2 plugin providing VAE-based mechanistic interpretability for metagenomic and transcriptomic data. Identified a sparse signature of 96 taxa characteristic of IBD, enabling biologically interpretable dimensionality reduction from over 3,000 input features.',
    tags: ['Python', 'QIIME2', 'VAE', 'PyTorch', 'interpretability'],
    featured: true
  },
  {
    name: 'CMPipeline',
    displayName: 'CMPipeline',
    repo: 'https://github.com/l1joseph/CMPipeline',
    metric: 'Nextflow pipeline processing 2,000+ cancer samples',
    description:
      'Nextflow workflow for microbial characterization from cancer sequencing data. Analyzed 2,000+ samples across colorectal, esophageal squamous cell carcinoma, and other cancer types. Integrated human read filtration with taxonomic profiling via KrakenUniq and MetaPhlAn4.',
    tags: ['Nextflow', 'R', 'metagenomics', 'cancer', 'KrakenUniq'],
    featured: true
  },
  {
    name: 'Multiscale_HRD_Classifier',
    displayName: 'softHRD',
    repo: 'https://github.com/l1joseph/Multiscale_HRD_Classifier',
    metric: 'AACR 2026 poster. RNA-seq ML for HRD detection.',
    description:
      'Machine learning model detecting Homologous Recombination Deficiency from RNA-seq data in breast and ovarian cancer. Uses autoencoders for mechanistic interpretability to identify genes from an RNA-seq panel associated with positive patient survival outcomes. Presented at AACR 2026 and BMES 2025.',
    tags: ['Python', 'RNA-seq', 'Cancer Biology', 'autoencoder', 'ML'],
    featured: true
  },
  {
    name: 'knightGPT',
    displayName: 'knightGPT',
    repo: 'https://github.com/l1joseph/knightGPT',
    metric: 'Knowledge graph RAG system for microbiome literature',
    description:
      'Microbiome-specific knowledge graph RAG system. Extracts entities (microbes, genes, metabolites, diseases) and relationships from research literature, enabling semantic querying and citation-grounded answers for metagenomic study design.',
    tags: ['Python', 'LLM', 'Graph-RAG', 'Ollama', 'NLP'],
    featured: false
  },
  {
    name: 'IDEA',
    displayName: 'IDEA',
    repo: 'https://github.com/l1joseph/IDEA',
    metric: 'Python equivalent to DESeq2',
    description:
      'Interactive Differential Expression Analysis. Python package for differential expression analysis on gene expression data, designed as a Python equivalent to DESeq2. Supports standard RNA-seq workflows with visualization and statistical testing.',
    tags: ['Python', 'DESeq2', 'RNA-seq', 'packaging'],
    featured: false
  },
  {
    name: 'hive_mind_optimization',
    displayName: 'Hive Mind Optimization',
    repo: 'https://github.com/l1joseph/hive_mind_optimization',
    metric: 'Particle Swarm Optimization for warehouse placement',
    description:
      'Warehouse location optimizer using Particle Swarm Optimization. Finds optimal placement for a set of warehouses given stores and residential areas, balancing minimum distance from residential zones against maximum distance to stores.',
    tags: ['Python', 'optimization', 'PSO', 'algorithms'],
    featured: false
  }
];
